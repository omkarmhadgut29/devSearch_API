import mongoose, { Schema } from "mongoose";

const projectSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
      unique: true,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    likes: {
      type: Number,
    },
    codeURL: {
      type: Number,
    },
    hostedURL: {
      type: Number,
    },
  },
  { timestamps: true }
);

export const Project = mongoose.model("Project", projectSchema);
