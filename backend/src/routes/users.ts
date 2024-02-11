import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import middleware from "../middleware/middleware";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config";

const user = Router();

const prisma = new PrismaClient();

user.post("/signup", async (req, res) => {
    const {username, password, firstName, lastName} = req.body;
    try {
        const result = await prisma.user.create({
            data: {
                username,
                password,
                firstName,
                lastName
            }
        })

        const balance = Math.floor(Math.random() * 10000);
        await prisma.account.create({
          data: {
            userId: result.id,
            balance: balance
          }  
        })

        if(result){
            const token = jwt.sign({ userId: result.id }, JWT_SECRET);
            return res.json({msg: "User Created Successfully", token: token, balance: balance});
        }else{
            return res.json({msg: `HTTP error! status: ${res.status}`})
        }   
    } catch (error) {
        res.json({msg: "User already exists Or some erroe occured!"})
    }
})

user.post("/signin", async (req, res) => {
    const {username, password} = req.body;
    try {
        const result = await prisma.user.findFirst({
            where: {
                username,
                password
            }
        })
        if(result){
            const token = jwt.sign({ userId: result.id }, JWT_SECRET);
            return res.json({msg: "Logged in successfully!", token, firstName: result.firstName, lastName: result.lastName})
        }else{
            return res.json({msg: `User not found!`})
        }  
    } catch (error) {
        res.json({msg: "Unable to login. Try again!"})
    }
})

user.put("/", middleware, async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;
        
        const { userId: id } = req.body;

        const result = await prisma.user.update({
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

        res.status(200).json({result, msg: "User info updated successfully!"}); // Send the updated user data in response
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ msg: "An error occurred while updating the user." });
    }
});

user.get("/", middleware, async (req, res) => {
    try {
        const { filter } = req.query;
        const filterString = filter as string;
        const [firstName, lastName] = filterString.trim().split(" ");

        const result = await prisma.user.findMany({
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
            },
            select: {
                username: true,
                firstName: true,
                lastName: true
            }
        });

        if (result.length > 0) {
            return res.json(result);
        } else {
            return res.status(404).json({ message: "No users found matching the filter criteria." });
        }
    } catch (error) {
        console.error("Error executing query:", error);
        return res.status(500).json({ message: "Unable to execute query. Please try again later." });
    }
});


export default user;