import { User } from "../models/user.models.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

/*
 * Generating Access and ref token
 */
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findOne({ _id: userId });

    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return {
      accessToken,
      refreshToken,
    };
  } catch (error) {
    throw new Error("Something went wrong...");
  }
};

/*
 * endPoint: /register/
 * method: POST
 * data: username, email, password
 * Register the user
 */
const registerUser = asyncHandler(async (req, res) => {
  // * Get all details from req.body
  const { username, email, password, fullname, gitProfile, likedinProfile } =
    req.body;

  // * check required fields are empty or not
  if ([username, email, password].some((field) => field?.trim() === "")) {
    return res.status(400).json({ message: "All Fields are required." });
  }

  // * Check is user exist or not
  const isUserExist = await User.findOne({
    $or: [{ username }, { password }],
  });

  // * if user exists then send error
  if (isUserExist) {
    return res.status(401).json({ message: "User already exists...." });
  }

  // * if user not exist then create new user
  const user = await User.create({
    username,
    email,
    password,
    fullname,
    gitProfile,
    likedinProfile,
  });

  // * Send res as successfull
  res.status(200).json({ message: "User created successfully.", user });
});

/*
 * endPoint: /login/
 * method: POST
 * data: username, email, password
 * Login the user
 */

const loginUser = asyncHandler(async (req, res) => {
  // * get email and password from req.body
  const { email, password } = req.body;

  // * check email and password are empty or not
  if (email.trim() === "" || password.trim() === "") {
    return res
      .status(401)
      .json({ message: "All data fields are mandatory..." });
  }

  // * find user matches with email
  const user = await User.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: "User not found...." });
  }

  // * get password of user and pass it to isPasswordCorrect method to check password
  const isValidUser = await user.isPasswordCorrect(password);
  if (!isValidUser) {
    return res.status(404).json({ message: "Password dose not matched...." });
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  return res.status(200).json({
    message: "User Loged In Successfully...",
    user: loggedInUser,
    accessToken,
    refreshToken,
  });
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const refreshToken = req.body.refreshToken;

  if (!refreshToken) {
    rea.status(401).json({ message: "Unauthorised access..." });
  }

  const decodedToken = jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRETE_KEY
  );

  const user = await User.findOne({ _id: decodedToken._id });

  if (!user) {
    return res.status(401).json({ message: "Invalid refresh token." });
  }

  if (refreshToken !== user?.refreshToken) {
    return res.status(401).json({ message: "Refresh token expries or used" });
  }

  const { accessToken, newRefreshToken } = generateAccessAndRefreshToken(
    user._id
  );

  return res.status(200).json({
    accessToken,
    refreshToken: newRefreshToken,
  });
});

const getAllProjects = asyncHandler(async (req, res) => {
  const id = req.body.id;

  // const user = User.findById(id);

  const projects = await User.aggregate([
    {
      $match: {
        username: id,
      },
    },
    {
      $lookup: {
        from: "projects",
        localField: "_id",
        foreignField: "owner",
        as: "userProjects",
      },
    },
    {
      $addFields: {
        projectCount: {
          $size: "$userProjects",
        },
        // projectDetails: ["$userProjects.title", "$userProjects.description"],
        projectDetails: {
          title: "$userProjects.title",
          desc: "$userProjects.description",
        },
      },
    },
    {
      $project: {
        username: 1,
        projectCount: 1,
        userProjects: 1,
        projectDetails: 1,
      },
    },
  ]);

  if (!projects) {
    return res.json({ message: "Error" });
  }

  console.log(projects);

  return res.json({ projects });
});

export { registerUser, loginUser, refreshAccessToken, getAllProjects };
