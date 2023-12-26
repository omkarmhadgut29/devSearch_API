import { Router } from "express";
import {
  createReview,
  deleteReview,
  getReview,
  updateReview,
} from "../controllers/review.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(getReview).post(verifyJWT, createReview);

router
  .route("/:id")
  .put(verifyJWT, updateReview)
  .delete(verifyJWT, deleteReview);

export const reviewRouter = router;
