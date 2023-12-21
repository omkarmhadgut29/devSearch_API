import mongoose, { Schema } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
    refreshToken: {
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

userSchma.methods.isPasswordCorrect = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchma.methods.generateAccessToken = async function () {
  const tokenData = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  return jwt.sign(tokenData, process.env.ACCESS_TOKEN_SECRETE_KEY, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRY_TIME,
  });
};

userSchma.methods.generateRefreshToken = async function () {
  const tokenData = {
    _id: this._id,
    username: this.username,
    email: this.email,
  };

  return jwt.sign(tokenData, process.env.REFRESH_TOKEN_SECRETE_KEY, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRY_TIME,
  });
};

export const User = mongoose.model("User", userSchma);
