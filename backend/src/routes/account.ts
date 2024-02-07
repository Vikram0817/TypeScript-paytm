import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import middleware from "../middleware/middleware";

const prisma = new PrismaClient();

const account = Router();

account.get("/balance", middleware, async (req, res) => {
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

account.post("/transfer", middleware, async (req, res) => {
    try {
        const { userId: fromUserId, toUserId, amount } = req.body;

        const [fromAcc, toAcc] = await prisma.$transaction([
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
        ])

        if (!fromAcc || !toAcc) {
            return res.status(404).json({ msg: "One or both accounts not found." });
        }

        // Check if the source account has sufficient balance
        if (fromAcc.balance < amount) {
            return res.status(400).json({ msg: "Insufficient balance for transfer." });
        }

        // Perform the transfer: subtract amount from the source account and add to the destination account
        await prisma.$transaction([
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
    } catch (error) {
        res.status(500).json({msg: "Transaction failed! Try again after sometime."})
    }
})

export default account;