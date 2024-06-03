import express, { Request, Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cros from "cors";
import path from "path";
import { connectDb } from "./config/config";
import UserRouter from "./Routers/UserRouter";
import AdminRouter from "./Routers/AdminRouter";

dotenv.config();
connectDb();

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
// app.use(express.static(path.join(__dirname, "src", "public")));

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
  console.log(err);

  res.status(500).send("Something error");
});

app.listen(PORT, (error?: any) => {
  if (error) {
    console.log("Error starting the server", error);
  } else {
    console.log(`Server runing  at http://${PORT}`);
  }
});
