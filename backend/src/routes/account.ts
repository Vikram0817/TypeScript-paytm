import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import middleware from "../middleware/middleware";

const prisma = new PrismaClient();

const account = Router();

account.get("/balance", async (req, res) => {
    try {
        const { userId } = req.body;
        const result = await prisma.account.findFirst({
            where: {
                userId: userId
            }
        })
        if (result) {
            return res.json({msg: result});
        }else {
            return res.status(404).json({});
        }   
    } catch (error) {
        return res.status(500).json({msg: "Unable to process balance"})
    }
})

export default account;