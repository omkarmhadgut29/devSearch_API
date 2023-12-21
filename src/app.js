import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// * user router
import { userRouter } from "./routes/user.routes.js";

app.use("/api/v1/user", userRouter);

export { app };
