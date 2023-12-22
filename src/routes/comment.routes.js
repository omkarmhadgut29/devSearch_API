import { Router } from "express";
import {
  createProjectComment,
  getProjectComments,
} from "../controllers/comment.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router
  .route("/")
  .get(verifyJWT, getProjectComments)
  .post(verifyJWT, createProjectComment);

export const commentRouter = router;
