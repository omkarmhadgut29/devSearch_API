import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";

const userSchma = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    fullname: {
      type: String,
    },
    gitProfile: {
      type: String,
    },
    likedinProfile: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchma.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(
    this.password,
    parseInt(process.env.SALT_ROUNDS)
  );
  next();
});
// rocess.env.SALT_ROUNDS

userSchma.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const User = mongoose.model("User", userSchma);
