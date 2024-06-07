"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = __importDefault(require("../Controller/UserController"));
const multerconfig_1 = __importDefault(require("../multer/multerconfig"));
// import { googleAuthController } from "../Controller/GoogleAuth";
router.post("/Postsignup", UserController_1.default.postSignUp);
router.get("/fetch-user-data", UserController_1.default.Fetch_User_Data);
router.post("/login", UserController_1.default.PostLogin);
//*Handiling Profile Router
router.post("/edit-profile-form", UserController_1.default.PostEditProfile);
//* google authentication 
router.post("/google-auth", UserController_1.default.GoogleChecking);
//*change prolie
router.post("/upload-profile-photo", multerconfig_1.default.single('profile'), UserController_1.default.uploadProfilePhoto);
router.post("/delete-img", UserController_1.default.Delete_Img);
//*Change password
router.post("/change-password", UserController_1.default.ResetPassword);
//*logout 
router.get('/logout', UserController_1.default.LogOut);
exports.default = router;
