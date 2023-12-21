import mongoose, { Schema } from "mongoose";

const replySchema = new Schema(
  {
    message: {
      type: String,
      requird: true,
    },
    byUser: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    toComment: {
      type: Schema.Types.ObjectId,
      ref: "Comment",
    },
  },
  { timestamps: true }
);

export const Reply = mongoose.model("Reply", replySchema);
