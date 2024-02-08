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
const client_1 = require("@prisma/client");
const express_1 = require("express");
const middleware_1 = __importDefault(require("../middleware/middleware"));
const prisma = new client_1.PrismaClient();
const account = (0, express_1.Router)();
account.get("/balance", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
account.post("/transfer", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { userId: fromUserId, toUsername, amount } = req.body;
        if (amount >= 0) {
            return res.json({ msg: "Amount can not be less then or equal to 0" });
        }
        const toUser = yield prisma.user.findFirst({
            where: {
                username: toUsername
            }
        });
        if (!toUser) {
            return res.status(404).json({ msg: "Recipient user not found." });
        }
        const toAcc = yield prisma.account.findFirst({
            where: {
                userId: toUser === null || toUser === void 0 ? void 0 : toUser.id
            }
        });
        const fromAcc = yield prisma.account.findFirst({
            where: {
                userId: fromUserId
            }
        });
        if (fromAcc && fromAcc.balance < amount) {
            return res.json({ msg: "Insufficient balance for the transfer." });
        }
        if ((fromAcc === null || fromAcc === void 0 ? void 0 : fromAcc.id) === (toAcc === null || toAcc === void 0 ? void 0 : toAcc.id)) {
            return res.json({ msg: "Can not transfer to yourself!" });
        }
        const result = yield prisma.$transaction([
            prisma.account.update({
                where: {
                    id: fromAcc === null || fromAcc === void 0 ? void 0 : fromAcc.id
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            }),
            prisma.account.update({
                where: {
                    id: toAcc === null || toAcc === void 0 ? void 0 : toAcc.id
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            })
        ]);
        return res.json({ msg: `₹${amount} transferred successfully.` });
    }
    catch (error) {
        res.status(500).json({ msg: "Transaction failed! Try again after sometime." });
    }
}));
exports.default = account;
