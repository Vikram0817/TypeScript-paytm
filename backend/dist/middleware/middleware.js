"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
function middleware(req, res, next) {
    const { authorization: token } = req.headers;
    const myToken = token.split(" ")[1];
    try {
        const decode = jsonwebtoken_1.default.verify(myToken, config_1.JWT_SECRET);
        req.body.userId = decode.userId;
        next();
    }
    catch (error) {
        return res.status(403).json({ msg: "Auth failed!" });
    }
}
exports.default = middleware;
