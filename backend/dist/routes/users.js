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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const user = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
user.post("/signup", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName } = req.body;
    try {
        const result = yield prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        });
        const balance = Math.floor(Math.random() * 10000);
        yield prisma.account.create({
            data: {
                userId: result.id,
                balance: balance
            }
        });
        if (result) {
            const token = jsonwebtoken_1.default.sign({ userId: result.id }, config_1.JWT_SECRET);
            return res.json({ msg: "User Created Successfully", token: token, balance: balance });
        }
        else {
            return res.json({ msg: `HTTP error! status: ${res.status}` });
        }
    }
    catch (error) {
        res.json({ msg: "User already exists Or some erroe occured!" });
    }
}));
user.post("/signin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    try {
        const result = yield prisma.user.findFirst({
            where: {
                username,
                password
            }
        });
        if (result) {
            const token = jsonwebtoken_1.default.sign({ userId: result.id }, config_1.JWT_SECRET);
            return res.json({ msg: "Logged in successfully!", token });
        }
        else {
            return res.json({ msg: `HTTP error! status: ${res.status}` });
        }
    }
    catch (error) {
        res.json({ msg: "Unable to login. Try again!" });
    }
}));
user.put("/", middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, firstName, lastName, password } = req.body;
        // Ensure id is properly set in the request body by middleware
        const { userId: id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "User id is missing in the request." });
        }
        const result = yield prisma.user.update({
            where: {
                id: Number(id) // Assuming id is a number
            },
            data: {
                username,
                password,
                firstName,
                lastName
            }
        });
        res.status(200).json(result); // Send the updated user data in response
    }
    catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
}));
user.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter } = req.query;
        const filterString = filter;
        const [firstName, lastName] = filterString.split(" ");
        const result = yield prisma.user.findMany({
            where: {
                OR: [
                    {
                        username: {
                            contains: filterString
                        }
                    },
                    {
                        firstName: {
                            contains: filterString
                        }
                    },
                    {
                        lastName: {
                            contains: filterString
                        }
                    },
                    {
                        AND: [
                            {
                                firstName: {
                                    contains: firstName
                                }
                            },
                            {
                                lastName: {
                                    contains: lastName
                                }
                            }
                        ]
                    }
                ]
            }
        });
        if (result.length > 0) {
            return res.json(result);
        }
        else {
            return res.status(404).json({ message: "No users found matching the filter criteria." });
        }
    }
    catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Unable to execute query. Please try again later." });
    }
}));
exports.default = user;
