import express, { type Request, type Response, Router } from "express";
import { prisma } from "../../db.js";


const addTodo: Router = Router()

addTodo.use(express.json());

addTodo.post("/", async (req: Request, res: Response) => {
    const user = req.user
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }

    
    // 1. Verify connection and user existence first
    const userExists = await prisma.user.findUnique({
        where: {
            id: parseInt(user.userId)
        }
    });

    console.log(userExists);

    if (!userExists) {
        console.log("❌ User not found in the database!");
        return res.status(404).json({ error: "User does not exist in Neon" });
    }

    // 2. Proceed with creation
    try {
        const todo = await prisma.todo.create({
            data: {
                title: title,
                author: { connect: { id: parseInt(user.userId) } }
            }
        });
        return res.json({ status: "success" });
    } catch (err) {
        console.log("Full Error:", err);
        return res.status(500).send(err);
    }
});


export default addTodo;
