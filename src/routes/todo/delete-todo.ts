import express, { Router, type Request, type Response } from "express";
import { prisma } from "../../db.js";


const deleteTodo: Router = Router();
deleteTodo.use(express.json());


deleteTodo.delete("/", async (req: Request, res: Response) => {
    const {todoId} = req.body
    const user = req.user
    
    if (!todoId) {
        return res.status(400).json({ error: "Todo ID is required" });
    }
    try {
        const todoExists = await prisma.todo.findUnique({
            where: {
                id: parseInt(todoId),
                authorId: parseInt(user.userId)
            }
        })
        if (!todoExists) {
            return res.status(404).json({ error: "Todo not found" });
        }
        await prisma.todo.delete({
            where: {
                id: parseInt(todoId)
            }
        })
        console.log("Todo DELETED");
        return res.status(201).json({ status: "success" });
    } catch (err) {
        console.log("Error:", err);
        return res.status(500).send(err);
    }
})

export default deleteTodo;