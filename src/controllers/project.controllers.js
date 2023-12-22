import { Project } from "../models/project.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*
 * GET all projects.
 * path: /projects
 * method: GET
 */

const getProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find();

  return res.status(200).json({ message: "Success...", projects });
});

/*
 * GET perticular project with id.
 * path: /projects/:id
 * method: GET
 * authorization not requird
 */

const getProject = asyncHandler(async (req, res) => {
  // * get id from param
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "ID is required..." });
  }

  //* find project by id
  const project = await Project.findById(id);

  if (!project) {
    return res.status(401).json({ message: "ID is invalid..." });
  }

  //* send project to res
  return res.status(200).json({ message: "Success...", project });
});

/*
 * Create new project
 * path: /projects
 * method: POST
 ! authorized
 */

const createProject = asyncHandler(async (req, res) => {
  //* get all data from req body
  const { title, description, likes, codeURL, hostedURL } = req.body;

  //* validate required data
  if ([title, description].some((field) => field?.trim() === "")) {
    return res
      .status(401)
      .json({ message: "Required Data field must be enterd..." });
  }

  //* check if title exists from same user :: like github repo
  const user = req.user;
  const isTitle = await Project.findOne({
    $and: [{ title }, { owner: user._id.toString() }],
  });
  if (isTitle) {
    return res.status(400).json({ message: "Title exists!!!" });
  }

  const project = await Project.create({
    title,
    description,
    likes,
    codeURL,
    hostedURL,
    owner: user,
  });

  if (!project) {
    return res.status(500).json({ message: "Something went wrong..." });
  }

  return res
    .status(200)
    .json({ message: "Project created successfully...", project });
});

/*
 * Update project details
 * path: /projects/:id
 * method: POST
 ! authorized
 */

const updateProject = asyncHandler(async (req, res) => {
  //* get project id from req param
  const { id } = req.params;
  if (!id) {
    res.send(401).json({ message: "Somthing went wrong" });
  }

  //* get project using id
  const project = await Project.findById(id);
  if (!project) {
    return res
      .status(400)
      .json({ message: "Project with this id not exists..." });
  }

  //* get project updates from req body
  const { title, ...dataToUpdate } = req.body;
  const user = req.user;

  if (title?.trim() !== "") {
    return res.status(400).json({ message: "Title can not be changed..." });
  }

  //* check project owner is same user
  if (project.owner.toString() !== user._id.toString()) {
    return res
      .status(401)
      .json({ message: "Unauthorized to access this project..." });
  }

  //* update project details

  const keys = Object.keys(dataToUpdate);

  keys.map((key) => {
    project[key] = dataToUpdate[key];
  });

  //   console.log();

  await project.save();

  return res
    .status(200)
    .json({ message: "Project updated successfully.", project });
});

/*
 * DELETE project 
 * path: /projects/:id
 * method: POST
 ! authorized
 */

const deleteProject = asyncHandler(async (req, res) => {
  //* get project id from req param
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: "Project id is requird..." });
  }

  //* get project from id
  const project = await Project.findById(id);
  if (!project) {
    return res.status(401).json({ message: "Project id is not valid..." });
  }

  //* get user from req body
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "Unauthorized request..." });
  }

  //* check project owner and user are same
  if (project.owner.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Unauthorized request..." });
  }

  //* delete project data
  await Project.deleteOne({ _id: id });

  return res
    .status(200)
    .json({ message: "Project data deleted successfully..." });
});

export { getProjects, getProject, createProject, updateProject, deleteProject };
