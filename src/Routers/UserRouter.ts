import express from "express";
const router = express.Router();
import userController from '../Controller/UserController'



router.post("/Postsignup", userController.postSignUp);
router.get("/fetch-user-data", userController.Fetch_User_Data);
router.post("/login", userController.PostLogin);


export default router 