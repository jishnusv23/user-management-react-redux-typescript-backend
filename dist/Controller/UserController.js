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
const google_auth_library_1 = require("google-auth-library");
const RandomGenerate_1 = require("../utils/RandomGenerate");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const PUBLIC_DIR = path_1.default.join(__dirname, "public");
const client = new google_auth_library_1.OAuth2Client(process.env.CLIENT_ID);
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
    GoogleChecking: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body, "this googel ath");
            const { token } = req.body;
            const ticket = (yield client.verifyIdToken({
                idToken: token,
                audience: process.env.CLIENT_ID,
            }));
            // console.log(
            //   "🚀 ~ file: UserController.ts:75 ~ GoogleChecking: ~ ticket:",
            //   ticket
            // );
            let userDetails;
            const Payload = ticket.getPayload();
            if (Payload) {
                userDetails = {
                    email: Payload === null || Payload === void 0 ? void 0 : Payload.email,
                    name: Payload === null || Payload === void 0 ? void 0 : Payload.name,
                    password: (0, RandomGenerate_1.makePassword)()
                };
            }
            const userIn = yield userModel_1.default.findOne({ email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email });
            // console.log("🚀 ~ file: UserController.ts:89 ~ GoogleChecking: ~ userIn:", userIn)
            if (!userIn) {
                const saveUser = new userModel_1.default({
                    name: userDetails === null || userDetails === void 0 ? void 0 : userDetails.name,
                    email: userDetails === null || userDetails === void 0 ? void 0 : userDetails.email,
                    password: userDetails === null || userDetails === void 0 ? void 0 : userDetails.password,
                    role: 'User'
                });
                const user = yield saveUser.save();
                const token = jsonwebtoken_1.default.sign({ user: user.id }, process.env.ACCESS_TOKEN_SECRET);
                res
                    .cookie("token", token, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "strict",
                    maxAge: 100 * 60 * 60 * 24,
                })
                    .json({ success: true });
            }
            else {
                if (userIn.status == 'Block') {
                    return res.json({ statusBlock: true });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ user: userIn.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
                    // console.log("🚀 ~ file: UserController.ts:130 ~ PostLogin: ~ token:", token)
                    res
                        .cookie("token", token, {
                        httpOnly: true,
                        maxAge: 100 * 60 * 60 * 24,
                    })
                        .json({ success: true });
                }
            }
            console.log("🚀 ~ file: UserController.ts:92 ~ GoogleChecking: ~ userDetails:", userDetails);
        }
        catch (err) {
            console.log(err);
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
            // console.log(token, "token is here");
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
            // console.log(verifydecoded, "this is veryfied decode");
            let userData;
            try {
                userData = yield userModel_1.default.findById(verifydecoded.user);
            }
            catch (err) {
                console.error("Thhe decode user is not geting ");
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
            // console.log("hey", req.body);
            const { email, password } = req.body;
            const userExists = yield userModel_1.default.findOne({ email: email });
            if (!userExists) {
                return res.json({ Emailerror: true });
            }
            else {
                //*check the password
                const passwordDNA = yield bcrypt_1.default.compare(password, userExists.password);
                if (!passwordDNA) {
                    return res.json({ PasswordError: true });
                }
                else if (userExists.status == "Block") {
                    return res.json({ statusBlock: true });
                }
                else {
                    const token = jsonwebtoken_1.default.sign({ user: userExists.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: "30d" });
                    // console.log("🚀 ~ file: UserController.ts:130 ~ PostLogin: ~ token:", token)
                    res
                        .cookie("token", token, {
                        httpOnly: true,
                        maxAge: 100 * 60 * 60 * 24,
                    })
                        .json({ success: true });
                }
            }
        }
        catch (err) {
            console.log("mistake in serverside login ", err);
        }
    }),
    //*Profile data handiling
    PostEditProfile: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { username, email, bio, images } = req.body;
            const userIn = yield userModel_1.default.findOne({ email: email });
            if (userIn) {
                yield userModel_1.default.updateOne({ email: email }, { $set: { name: username, bio: bio, profile: images } });
                res.json({ success: true });
            }
            else {
                console.error("Mistake in profile update");
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    uploadProfilePhoto: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: "No token provided" });
            }
            const verifydecoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!verifydecoded) {
                return res.status(401).json({ error: "Token is not valid" });
            }
            const userfind = yield userModel_1.default.findOne({ _id: verifydecoded.user });
            if (userfind && userfind.profile !== "monkey.jpg") {
                const imageFileName = userfind.profile;
                const imagePath = path_1.default.join(PUBLIC_DIR, imageFileName);
                if (fs_1.default.existsSync(imagePath)) {
                    fs_1.default.unlinkSync(imagePath);
                }
            }
            const path_name = (_a = req.file) === null || _a === void 0 ? void 0 : _a.filename;
            if (!path_name) {
                return res.status(400).json({ error: "File not uploaded" });
            }
            yield userModel_1.default.updateOne({ _id: verifydecoded.user }, { $set: { profile: path_name } });
            res.json({ success: true });
        }
        catch (err) {
            console.log("Error in updating photo:", err);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }),
    Delete_Img: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const token = req.cookies.token;
            if (!token) {
                return res.status(401).json({ error: "No token provided" });
            }
            const verifydecoded = jsonwebtoken_1.default.verify(token, process.env.ACCESS_TOKEN_SECRET);
            if (!verifydecoded) {
                return res.status(401).json({ error: "Token is not valid" });
            }
            console.log(req.body);
            const { id } = req.body;
            const userIn = yield userModel_1.default.findById(verifydecoded.user);
            if (userIn) {
                yield userModel_1.default.updateOne({ _id: verifydecoded.user }, { $set: { profile: null } });
                res.json({ success: true });
            }
            else {
                // console.log();
                res.json({ ErrorDelete: true });
                console.error("The is not valide");
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    ResetPassword: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log(req.body);
            const { oldpasswordd, password, email } = req.body;
            const User = yield userModel_1.default.findOne({ email: email });
            // console.log(
            //   "🚀 ~ file: UserController.ts:246 ~ ResetPassword: ~ UsermatchPas:",
            //   UsermatchPas
            // );
            if (!User) {
                res.json({ Usernotget: true });
            }
            else {
                const passMatch = yield bcrypt_1.default.compare(oldpasswordd, User.password);
                if (!passMatch) {
                    res.json({ NotMach: true });
                }
                else {
                    const salt = yield bcrypt_1.default.genSalt(10);
                    const hassed = yield bcrypt_1.default.hash(password, salt);
                    yield userModel_1.default.updateOne({ email: email }, { $set: { password: hassed } });
                    res.json({ success: true });
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }),
    LogOut: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            console.log("logout the user");
            res.clearCookie("token").send({ something: "logout" });
        }
        catch (err) {
            console.log(err);
        }
    }),
};
exports.default = userController;
