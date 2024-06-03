import { Request, Response } from "express";
import Users from "../Model/userModel";
import { log } from "console";

const AdminController = {
  fetch_User_Admin: async (req: Request, res: Response) => {
    try {
      // console.log(req.query)
      const { search } = req.query;
      let query: any = { role: { $ne: "Admin" } };
      if (search) {
        query.name = { $regex: new RegExp(search as string, "i") };
      }
      const data = await Users.find(query);
      res.json({ data: data });
    } catch (err) {
      console.log(err);
    }
  },
  EditUserName: async (req: Request, res: Response) => {
    try {
      console.log(req.body);
      const { username, email } = req.body;
      const userIs = await Users.findOne({ email: email });
      if (userIs) {
        await Users.updateOne({ email: email }, { $set: { name: username } });
        res.json({ success: true });
      } else {
        res.json({ ErrorEdit: true });
      }
    } catch (err) {
      console.log(err);
    }
  },
};

export default AdminController;
