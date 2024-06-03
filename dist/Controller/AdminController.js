"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../Model/userModel"));
const AdminController = {
    fetch_User_Admin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            // console.log(req.query)
            const { search } = req.query;
            let query = { role: { $ne: "Admin" } };
            if (search) {
                query.name = { $regex: new RegExp(search, "i") };
            }
            const data = yield userModel_1.default.find(query);
            res.json({ data: data });
        }
        catch (err) {
            console.log(err);
        }
    }),
    EditUserName: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { username, email } = req.body;
            const userIs = yield userModel_1.default.findOne({ email: email });
            if (userIs) {
                yield userModel_1.default.updateOne({ email: email }, { $set: { name: username } });
                res.json({ success: true });
            }
            else {
                res.json({ ErrorEdit: true });
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    Add_New_User: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { name, email, password } = req.body;
            const CheckUserIn = yield userModel_1.default.findOne({ email: email });
            if (CheckUserIn) {
                res.json({ CheckError: true });
            }
            else {
                const userData = new userModel_1.default({
                    name: name,
                    email,
                    role: "User",
                    password: password
                });
                const user = yield userData.save();
                res.json({ success: true });
            }
        }
        catch (err) {
            console.log(err);
        }
    })
};
exports.default = AdminController;
