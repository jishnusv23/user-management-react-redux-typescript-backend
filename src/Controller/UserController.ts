import { Request, Response } from "express";
import Users from "../Model/userModel";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "dotenv/config";

interface decode{
  user:string
  iat:number
}

const userController = {
  postSignUp: async (req: Request, res: Response) => {
    try {
      console.log("this is for singup", req.body);
      const { name, email, password } = req.body;
      const IsUser = await Users.findOne({ email: email });

      console.log(
        "🚀 ~ file: UserController.ts:14 ~ postSignUp:async ~ IsUser:",
        IsUser
      );

      if (IsUser) {
        res.json({ Error: true });
      } else {
        console.log("user waiting for your logic");
        const userData = new Users({
          name: name,
          email,
          role: "User",
          password: password,
        });

        //*create user
        const user = await userData.save();

        //*jwt token

        const token = jwt.sign(
          { user: user._id },
          process.env.ACCESS_TOKEN_SECRET as string
        );

        res
          .cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            maxAge: 100 * 60 * 60 * 24,
          })
          .json({ success: true });
      }
    } catch (err) {
      console.error("Error showing in sing-up", err);
      return res.status(500).json({ error: "Internal server" });
    }
  },
  Fetch_User_Data: async (req: Request, res: Response) => {
    try {
      console.log("fetch user is working ");

      let token: string | null = null;
      if (req.cookies && req.cookies.token) {
        token = req.cookies.token;
      } else if (req.headers && req.headers.authorization) {
        const authHeader = req.headers.authorization;
        if (authHeader.startsWith("Bearer ")) {
          token = authHeader.split(" ")[1];
        }
      }
      // console.log("token first side working ");
      console.log(token, "token is here");

      if (!token) {
        console.log("null token");

        return res.status(401).json({ msg: "Unauthorized:Token no provided " })
      }
      console.log("token second side is working ");
      //*verify the token

      const verifydecoded = jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET as string
      ) as decode
       
      //*check the verifyed or not
      if (!verifydecoded) {
        res.status(401).json({ error: "Token is not valid" });
      }
      console.log(verifydecoded, "this is veryfied decode");
      let userData

        try{
          userData=await Users.findById(verifydecoded.user)

        }catch(err){
          console.error('Thhe decode user is not geting ');
          
        }
      //*find the user
      // const userData=await Users.findById(verifydecoded.user)
      let data = "this is data using fetch";
      res.json(userData);
    } catch (err) {
      console.log(err);
    }
  },
  PostLogin: async (req: Request, res: Response) => {
    try {
      console.log("hey", req.body);
    } catch (err) {
      console.log("mistake in serverside login ", err);
    }
  },
};
export default userController;
