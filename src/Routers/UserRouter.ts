import express from "express";
const router = express.Router();
import userController from '../Controller/UserController'
import upload from "../multer/multerconfig";



router.post("/Postsignup", userController.postSignUp);
router.get("/fetch-user-data", userController.Fetch_User_Data);
router.post("/login", userController.PostLogin);

//*Handiling Profile Router
router.post("/edit-profile-form", userController.PostEditProfile)


//*change prolie
router.post("/upload-profile-photo",upload.single('profile'),userController.uploadProfilePhoto)


//*logout 
router.get('/logout',userController.LogOut)
export default router 