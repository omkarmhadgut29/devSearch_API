import { Router } from "express";
import {
  getAllProjects,
  loginUser,
  refreshAccessToken,
  registerUser,
} from "../controllers/user.controllers.js";

const router = Router();

router.route("/login").post(loginUser);
router.route("/projects").get(getAllProjects);

router.route("/register").post(registerUser);

router.route("/refresh-tokens").post(refreshAccessToken);

export const userRouter = router;
