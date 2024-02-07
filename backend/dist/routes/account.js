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
        const { userId: fromUserId, toUserId, amount } = req.body;
        const [fromAcc, toAcc] = yield prisma.$transaction([
            prisma.account.findFirst({
                where: {
                    userId: fromUserId
                }
            }),
            prisma.account.findFirst({
                where: {
                    userId: toUserId
                }
            })
        ]);
        if (!fromAcc || !toAcc) {
            return res.status(404).json({ msg: "One or both accounts not found." });
        }
        // Check if the source account has sufficient balance
        if (fromAcc.balance < amount) {
            return res.status(400).json({ msg: "Insufficient balance for transfer." });
        }
        // Perform the transfer: subtract amount from the source account and add to the destination account
        yield prisma.$transaction([
            prisma.account.update({
                where: {
                    id: fromAcc.id
                },
                data: {
                    balance: {
                        decrement: amount // Subtract amount from balance
                    }
                }
            }),
            prisma.account.update({
                where: {
                    id: toAcc.id
                },
                data: {
                    balance: {
                        increment: amount // Add amount to balance
                    }
                }
            })
        ]);
        return res.json({ msg: `${amount} transferred successfully.` });
    }
    catch (error) {
        res.status(500).json({ msg: "Transaction failed! Try again after sometime." });
    }
}));
exports.default = account;
