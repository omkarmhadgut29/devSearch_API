import { Router } from "express";
import {
  createReply,
  deleteReply,
  getReplies,
  updateReply,
} from "../controllers/reply.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/").get(verifyJWT, getReplies).post(verifyJWT, createReply);

router.route("/:id").put(verifyJWT, updateReply).delete(verifyJWT, deleteReply);

export const replyRouter = router;
