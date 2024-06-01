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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const userController = {
    postSignUp: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("this is for singup", req.body);
            const { name, email, password } = req.body;
            const IsUser = yield userModel_1.default.findOne({ email: email });
            console.log("🚀 ~ file: UserController.ts:14 ~ postSignUp:async ~ IsUser:", IsUser);
            if (IsUser) {
                res.json({ Error: true });
            }
            else {
                console.log("user waiting for your logic");
                const userData = new userModel_1.default({
                    name: name,
                    email,
                    role: "User",
                    password: password,
                });
                //*create user
                const user = yield userData.save();
                //*jwt token
                const token = jsonwebtoken_1.default.sign({ user: user._id }, process.env.ACCESS_TOKEN_SECRET);
                res
                    .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 100 * 60 * 60 * 24,
                })
                    .json({ success: true });
            }
        }
        catch (err) {
            console.error("Error showing in sing-up", err);
            return res.status(500).json({ error: "Internal server" });
        }
    }),
    Fetch_User_Data: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("fetch user is working ");
            let token = null;
            if (req.cookies && req.cookies.token) {
                token = req.cookies.token;
            }
            else if (req.headers && req.headers.authorization) {
                const authHeader = req.headers.authorization;
                if (authHeader.startsWith("Bearer ")) {
                    token = authHeader.split(" ")[1];
                }
            }
            // console.log("token first side working ");
            console.log(token, "token is here");
            if (!token) {
                console.log("null token");
                return res.status(401).json({ msg: "Unauthorized:Token no provided " });
            }
            console.log("token second side is working ");
            //*verify the token
            const verifydecoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            //*check the verifyed or not
            if (!verifydecoded) {
                res.status(401).json({ error: "Token is not valid" });
            }
            console.log(verifydecoded, "this is veryfied decode");
            let userData;
            try {
                userData = yield userModel_1.default.findById(verifydecoded.user);
            }
            catch (err) {
                console.error('Thhe decode user is not geting ');
            }
            //*find the user
            // const userData=await Users.findById(verifydecoded.user)
            let data = "this is data using fetch";
            res.json(userData);
        }
        catch (err) {
            console.log(err);
        }
    }),
    PostLogin: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("hey", req.body);
        }
        catch (err) {
            console.log("mistake in serverside login ", err);
        }
    }),
};
exports.default = userController;
