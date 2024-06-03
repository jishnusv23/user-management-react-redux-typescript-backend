import express from "express";
const router = express.Router();
import AdminController from "../Controller/AdminController";

router.get("/fetch-user-admin", AdminController.fetch_User_Admin);
router.post("/edit-user",AdminController.EditUserName);

export default router;
