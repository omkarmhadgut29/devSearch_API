import { Comment } from "../models/comment.models.js";
import { Reply } from "../models/reply.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getReplies = asyncHandler(async (req, res) => {
  const user = req.user;
  const { commentId } = req.body;

  if (!commentId || !user) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const replies = await Reply.find({ toComment: commentId });

  if (!replies) {
    return res.status(404).json({ message: "Replies not found" });
  }

  return res.status(200).json({ replies });
});

const createReply = asyncHandler(async (req, res) => {
  const { commentId, message } = req.body;

  if (!commentId || !message) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  if (message === "") {
    return res.status(401).json({ message: "Write reply message..." });
  }

  const user = req.user;

  const comment = await Comment.findById(commentId);

  if (!comment) {
    return res.status(401).json({ message: "Invalid Comment..." });
  }

  const reply = await Reply.create({
    message,
    byUser: user,
    toComment: comment,
  });

  return res.status(200).json({ message: "Reply created...", reply });
});

const updateReply = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const { commentId, message } = req.body;

  if (!commentId || !message) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  if (message === "") {
    return res.status(401).json({ message: "Write reply message..." });
  }
  const user = req.user;

  const reply = await Reply.findById(id);

  if (!reply) {
    return res.status(401).json({ message: "Invalid Comment..." });
  }
  if (reply.byUser.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Unauthorised Access..." });
  }

  reply.message = message;

  await reply.save();

  return res
    .status(200)
    .json({ message: "Comment reply updated successfully...", reply });
});

const deleteReply = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const user = req.user;

  const reply = await Reply.findById(id);

  if (!reply) {
    return res.status(401).json({ message: "Invalid reply..." });
  }

  if (reply.byUser.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Unauthorised Access..." });
  }

  await Reply.deleteOne({ _id: id });

  return res.status(200).json({ message: "reply deleted successfully..." });
});

export { getReplies, createReply, updateReply, deleteReply };
