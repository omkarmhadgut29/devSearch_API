import mongoose, { Schema } from "mongoose";

const reviewSchema = new Schema(
  {
    value: {
      type: Number,
      enum: [1, 2, 3, 4, 5],
    },
    project: {
      type: Schema.Types.ObjectId,
      ref: "Project",
    },
    byUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export const Review = mongoose.model("Review", reviewSchema);
