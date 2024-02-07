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
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const prisma = new client_1.PrismaClient();
const account = (0, express_1.Router)();
account.get("/balance", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId } = req.body;
        const result = yield prisma.account.findFirst({
            where: {
                userId: userId
            }
        });
        if (result) {
            return res.json({ msg: result });
        }
        else {
            return res.status(404).json({});
        }
    }
    catch (error) {
        return res.status(500).json({ msg: "Unable to process balance" });
    }
}));
exports.default = account;
