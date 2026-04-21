import express, { type Request, type Response, Router } from "express";
import { prisma } from "../../db.js";
import { decodeToken } from "../../helpers/jwt.js";


const addTodo: Router = Router()

addTodo.use(express.json());

addTodo.post("/", async (req: Request, res: Response) => {
    const authToken = req.cookies["auth-token"];

    const user = decodeToken(authToken);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    if (!req.body.title) {
        return res.status(400).json({ error: "Title is required" });
    }
    // if(!req.body.authorId){
    //     return res.status(400).json({ error: "Author is required" });
    // }
    const { title } = req.body;
    // 1. Verify connection and user existence first
    const userExists = await prisma.user.findUnique({
        where: {
            id: parseInt(user.userId)
        }
    });

    console.log(userExists);

    if (!userExists) {
        console.log("❌ User 1 not found in the database!");
        return res.status(404).json({ error: "User 1 does not exist in Neon" });
    }

    // 2. Proceed with creation
    try {
        const todo = await prisma.todo.create({
            data: {
                title: req.body.title,
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
