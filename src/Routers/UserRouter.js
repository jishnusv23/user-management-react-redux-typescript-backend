"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var router = express_1.default.Router();
var UserController_1 = require("../Controller/UserController");
var multerconfig_1 = require("../multer/multerconfig");
router.post("/Postsignup", UserController_1.default.postSignUp);
router.get("/fetch-user-data", UserController_1.default.Fetch_User_Data);
router.post("/login", UserController_1.default.PostLogin);
//*Handiling Profile Router
router.post("/edit-profile-form", UserController_1.default.PostEditProfile);
//*change prolie
router.post("/upload-profile-photo", multerconfig_1.default.single('profile'), UserController_1.default.uploadProfilePhoto);
//*logout 
router.get('/logout', UserController_1.default.LogOut);
exports.default = router;
