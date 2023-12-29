import { asyncHandler } from "../utils/asyncHandler.js";

const indexController = (req, res) => {
  //   const user = localStorage?.getItem("user") || "";

  //   if (user === "" || user === null || user === undefined) {
  //     return res.redirect("/login");
  //   }

  //   return res.redirect("/projects");
  const context = {};
  return res.render("index", { context });
};

const loginController = (req, res) => {
  const context = {
    path: "login",
  };

  return res.render("login", { context });
};

const getAllprojectsController = asyncHandler(async (req, res) => {
  const response = await fetch("http://localhost:3000/api/v1/projects");
  if (!response.ok) {
    return res.redirect("/login");
  }

  const data = await response.json();
  const projects = await data.projects;

  const context = {
    path: "login",
    projects,
  };

  res.render("projects", { context });
});

const getProjectController = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const project = await fetch(`http://localhost:3000/api/v1/projects/${id}`);
});

export { indexController, loginController, getAllprojectsController };
