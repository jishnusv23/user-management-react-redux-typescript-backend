"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const config_1 = require("./config/config");
const UserRouter_1 = __importDefault(require("./Routers/UserRouter"));
const AdminRouter_1 = __importDefault(require("./Routers/AdminRouter"));
dotenv_1.default.config();
(0, config_1.connectDb)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
// app.use(express.static("public"));
// app.use(express.static(path.join(__dirname, "public")));
app.use(express_1.default.static(path_1.default.join(__dirname, "src", "public")));
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
app.use("/", UserRouter_1.default);
app.use("/admin", AdminRouter_1.default);
//* error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send("Something error");
});
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server", error);
    }
    else {
        console.log(`Server runing  at http://${PORT}`);
    }
});
