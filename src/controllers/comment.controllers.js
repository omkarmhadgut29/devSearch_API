import { Comment } from "../models/comment.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

/*
 * GET project comments
 * path: /comments
 * method: GET
 ! authorized
 */

const getProjectComments = asyncHandler(async (req, res) => {
  //* get project id from req body
  const { projectId } = req.body;
  if (!projectId) {
    return res.status(401).json({ message: "Project id is required..." });
  }

  //* get all comments of projects
  const comments = await Comment.find({ project: projectId });

  if (!comments) {
    return res.status(404).json({ message: "Comments not found..." });
  }

  return res.status(200).json({ message: "Successs.", comments });
});

/*
 * Create comment for project
 * path: /comments
 * method: POST
 ! authorized
 */

const createProjectComment = asyncHandler(async (req, res) => {
  //* get projectId, message from req body
  const { projectId, message } = req.body;

  if (!projectId || !message) {
    return res
      .status(401)
      .json({ message: "Project ID and comment message is required." });
  }

  const user = req.user;

  //* create comment for the project
  const comment = await Comment.create({
    message,
    project: projectId,
    byUser: user._id.toString(),
  });

  return res.status(200).json({ message: "Comment created.", comment });
});

export { getProjectComments, createProjectComment };
