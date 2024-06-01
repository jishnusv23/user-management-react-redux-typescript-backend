"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const UserController_1 = __importDefault(require("../Controller/UserController"));
router.post("/Postsignup", UserController_1.default.postSignUp);
router.get("/fetch-user-data", UserController_1.default.Fetch_User_Data);
router.post("/login", UserController_1.default.PostLogin);
exports.default = router;
