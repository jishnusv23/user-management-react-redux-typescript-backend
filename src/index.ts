import express, {Request,Response, NextFunction } from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cros from "cors";
import { connectDb } from "./config/config";

connectDb();

const app = express();
dotenv.config();

const PORT = process.env.PORT || 4000;

app.use(
  cros({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
  })
);

//* error handling
app.use((err:any, req:Request, res:Response, next:NextFunction) => {
  console.log(err);
  
  res.status(500).send('Something error');
});

app.listen(PORT, (error?: any) => {
  if (error) {
    console.log("Error starting the server", error);
  } else {
    console.log(`Server runing  at http://${PORT}`);
  }
});
