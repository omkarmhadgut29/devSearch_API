import { Project } from "../models/project.models.js";
import { Review } from "../models/review.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";

const getReview = asyncHandler(async (req, res) => {
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const reviews = await Review.find({ project: projectId });

  if (!reviews) {
    return res.status(404).json({ message: "reviews not found" });
  }

  return res.status(200).json({ reviews });
});

const createReview = asyncHandler(async (req, res) => {
  const { projectId, value } = req.body;
  const user = req.user;

  if (!projectId || !value || !user) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  if (value > 5 || value < 1) {
    return res.status(401).json({ message: "Invalid review..." });
  }

  const isReview = await Review.findOne({
    $and: [{ byUser: user }, { project: projectId }],
  });

  if (isReview) {
    req.params.id = isReview._id;
    return updateReview(req, res);
  }

  const project = await Project.findById(projectId);

  if (!project) {
    return res.status(401).json({ message: "Invalid project..." });
  }

  const review = await Review.create({
    value,
    byUser: user,
    project: project,
  });

  return res.status(200).json({ message: "review created...", review });
});

const updateReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const { projectId, value } = req.body;

  if (!projectId || !value) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  if (value > 5 || value < 1) {
    return res.status(401).json({ message: "Invalid review..." });
  }
  const user = req.user;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(401).json({ message: "Invalid project..." });
  }
  if (review.byUser.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Unauthorised Access..." });
  }

  review.value = value;

  await review.save();

  return res.status(200).json({
    message: "project review updated successfully...",
    review: {
      value: review.value,
      _id: review._id,
    },
  });
});

const deleteReview = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(401).json({ message: "Invalid request..." });
  }

  const user = req.user;

  const review = await Review.findById(id);

  if (!review) {
    return res.status(401).json({ message: "Invalid review..." });
  }

  if (review.byUser.toString() !== user._id.toString()) {
    return res.status(401).json({ message: "Unauthorised Access..." });
  }

  await review.deleteOne({ _id: id });

  return res.status(200).json({ message: "Review deleted successfully..." });
});

export { getReview, createReview, updateReview, deleteReview };
