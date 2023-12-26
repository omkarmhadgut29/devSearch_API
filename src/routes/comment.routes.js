import { Router } from "express";
import {
  createProjectComment,
  deleteProjectComment,
  getProjectComments,
  updateProjectComment,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyJWT, getProjectComments)
  .post(verifyJWT, createProjectComment);

router
  .route("/:id")
  .put(verifyJWT, updateProjectComment)
  .delete(verifyJWT, deleteProjectComment);

export const commentRouter = router;
