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
        const { userId: fromUserId, toUsername, amount } = req.body;

        if(amount <= 0){
            return res.json({msg: "Amount can not be less then or equal to 0"})
        }

        const toUser = await prisma.user.findFirst({
            where: {
                username: toUsername
            }
        })

        if (!toUser) {
            return res.status(404).json({ msg: "Recipient user not found." });
        }

        const toAcc = await prisma.account.findFirst({
            where: {
                userId: toUser?.id
            }
        })

        const fromAcc = await prisma.account.findFirst({
            where: {
                userId: fromUserId
            }
        })
        
        if (fromAcc && fromAcc.balance < amount) {
            return res.json({ msg: "Insufficient balance for the transfer." });
        }
        
        if (fromAcc?.id === toAcc?.id){
            return res.json({msg: "Can not transfer to yourself!"})
        }

        const result = await prisma.$transaction([
            prisma.account.update({
                where: {
                    id: fromAcc?.id
                },
                data: {
                    balance: {
                        decrement: amount
                    }
                }
            }),
            prisma.account.update({
                where: {
                    id: toAcc?.id
                },
                data: {
                    balance: {
                        increment: amount
                    }
                }
            })
        ])
        
        return res.json({ msg: `₹${amount} transferred successfully.` });
    } catch (error) {
        res.status(500).json({msg: "Transaction failed! Try again after sometime."})
    }
})

export default account;