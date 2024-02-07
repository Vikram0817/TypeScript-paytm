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
        res.json("Unable to create account. Try again!")
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
            return res.json({msg: "Logged in successfully!", token})
        }else{
            return res.json({msg: `HTTP error! status: ${res.status}`})
        }  
    } catch (error) {
        res.json("Unable to create account. Try again!")
    }
})

user.put("/", middleware, async (req, res) => {
    try {
        const { username, firstName, lastName, password } = req.body;
        
        // Ensure id is properly set in the request body by middleware
        const { userId: id } = req.body;
        if (!id) {
            return res.status(400).json({ error: "User id is missing in the request." });
        }

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

        res.status(200).json(result); // Send the updated user data in response
    } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).json({ error: "An error occurred while updating the user." });
    }
});

user.get("/", async (req, res) => {
    try {
        const { filter } = req.query;
        const filterString = filter as string;
        const [firstName, lastName] = filterString.split(" ");

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