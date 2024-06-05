import express from "express";
const router = express.Router();
import AdminController from "../Controller/AdminController";

router.get("/fetch-user-admin", AdminController.fetch_User_Admin);
router.post("/edit-user",AdminController.EditUserName);
router.post("/add-user-admin",AdminController.Add_New_User);
router.post("/delete-user-admin", AdminController.Delete_User);

export default router;
