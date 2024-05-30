"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const config_1 = require("./config/config");
(0, config_1.connectDb)();
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app.use((0, cors_1.default)({
    origin: process.env.CLIENT_ORIGIN,
    credentials: true,
}));
//* error handling
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Something error');
});
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server", error);
    }
    else {
        console.log(`Server runing  at http://${PORT}`);
    }
});
