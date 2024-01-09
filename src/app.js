import express from "express";
import cookieParser from "cookie-parser";

const app = express();

app.set("view engine", "ejs");
app.set("views", "src/views");

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));
// app.use(express.static("src/views"));
// app.use(express.static("src/views", "js"));
app.use(cookieParser());

// Routers
import { userRouter } from "./routes/user.routes.js";
import { projectRouter } from "./routes/project.routes.js";
import { commentRouter } from "./routes/comment.routes.js";
import { replyRouter } from "./routes/reply.routes.js";
import { reviewRouter } from "./routes/review.routes.js";
import { indexRouter } from "./routes/index.routes.js";

// app.get("/", (req, res) => {
//   const loginUserFromEJS = () => {
//     // const loginButton = document.getElementById("login");
//     // loginButton.addEventListener("click", () => {
//     //   console.log("Hi");
//     // });
//     console.log("Hi");
//     console.log(email);
//   };

//   const context = {
//     path: "user/login",
//     loginUserFromEJS,
//   };

//   return res.render("index", { context });
// });

// app.post("/login", async (req, res) => {
//   const data = await loginUser(req, res, true);

//   // const context = {
//   //   path: "user/login",
//   // };

//   // res.render("index", { context });
//   return res.status(200).json({ message: "This is from login", data });
// });

// app.post("/", (req, res) => {
//   const { email, password } = req.body;
//   console.log(email);
//   console.log(password);
//   const context = {
//     path: "user/login",
//   };
//   if (email === "fermionlearning@gmail.com") {
//     context["message"] = "Email matched";
//     res.render("index", { context });
//   }
//   res.send("Error");
// });

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

// index router
app.use("/", indexRouter);

export { app };
