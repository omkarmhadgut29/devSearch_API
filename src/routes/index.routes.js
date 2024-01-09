import { Router } from "express";
import {
  getAllprojectsController,
  getProjectController,
  indexController,
  loginController,
} from "../controllers/index.controllers.js";

const router = Router();

router.route("/").get(indexController);

router.route("/login").get(loginController);

router.route("/projects").get(getAllprojectsController);
router.route("/projects/:id").get(getProjectController);

export const indexRouter = router;
