"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
require("./config/config");
const app = (0, express_1.default)();
dotenv_1.default.config();
const PORT = process.env.PORT || 4000;
app.listen(PORT, (error) => {
    if (error) {
        console.log("Error starting the server", error);
    }
    else {
        console.log(`Server runing  at http://${PORT}`);
    }
});
