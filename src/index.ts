import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
// import cookieSession from "cookie-session";
import dotenv from "dotenv";
import cros from "cors";
import path from "path";
// import passport from "passport";
import { connectDb } from "./config/config";
import UserRouter from "./Routers/UserRouter";
import AdminRouter from "./Routers/AdminRouter";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 4000;

// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "src", "public")));
// app.use(express.static(path.join(__dirname, "dist")));
// const PUBLIC_DIR = path.join(__dirname, "public");

// app.use(express.static(PUBLIC_DIR));
// app.use(
//   cookieSession({
//     name: "session",
//     keys: ["cyberwolve"],
//     maxAge: 24 * 60 * 60 * 100,
//   })
// );

// app.use(passport.initialize());
// app.use(passport.session());
app.use(express.json());
app.use(cookieParser());

app.use(
  cros({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);
app.use("/", UserRouter);
app.use("/admin", AdminRouter);

//* error handling
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});
app.listen(PORT, (error?: any) => {
  if (error) {
    console.log("Error starting the server", error);
  } else {
    console.log(`Server runing  at http://${PORT}`);
  }
});
