import { Router } from "express";
import {
  getAllprojectsController,
  indexController,
  loginController,
} from "../controllers/index.controllers.js";

const router = Router();

router.route("/").get(indexController);

router.route("/login").get(loginController);

router.route("/projects").get(getAllprojectsController);

export const indexRouter = router;
