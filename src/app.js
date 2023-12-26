import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Routers
import { userRouter } from "./routes/user.routes.js";
import { projectRouter } from "./routes/project.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { replyRouter } from "./routes/reply.routes.js";
import { reviewRouter } from "./routes/review.routes.js";

// * user router
app.use("/api/v1/user", userRouter);

//* product router
app.use("/api/v1/projects", projectRouter);

//* comment router
app.use("/api/v1/comments", commentRouter);

// Replies router
app.use("/api/v1/replies", replyRouter);

//Review Router
app.use("/api/v1/reviews", reviewRouter);

export { app };
