import { OAuth2Client } from "google-auth-library";
import { Request, Response } from "express";

const client = new OAuth2Client(process.env.CLIENT_ID);

export const googleAuthController = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "hey this working or not ");
  } catch (err) {
    console.log(err);
  }
};
