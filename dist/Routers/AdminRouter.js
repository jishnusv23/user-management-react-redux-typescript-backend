"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const AdminController_1 = __importDefault(require("../Controller/AdminController"));
router.get("/fetch-user-admin", AdminController_1.default.fetch_User_Admin);
router.post("/edit-user", AdminController_1.default.EditUserName);
exports.default = router;
