import { Router } from "express";
import {
  createProject,
  deleteProject,
  getProject,
  getProjects,
  updateProject,
} from "../controllers/project.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getProjects).post(verifyJWT, createProject);

router
  .route("/:id")
  .get(getProject)
  .put(verifyJWT, updateProject)
  .delete(verifyJWT, deleteProject);

export const projectRouter = router;
