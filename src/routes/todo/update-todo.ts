import express, { Router, type Request, type Response } from "express";
import { prisma } from "../../db.js";
import { decodeToken } from "../../helpers/jwt.js";



const updateTodo: Router = Router();

updateTodo.use(express.json());

updateTodo.put("/", async (req: Request, res: Response) => {
    const { todoId, title, done } = req.body;
    const authToken = req.cookies.get("auth-token");
    const user = decodeToken(authToken);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
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
        const updatedTodo = await prisma.todo.update({
            where: {
                id: parseInt(todoId)
            },
            data: {
                title: title,
                done: done
            }
        })
        console.log("Todo updated: ", updatedTodo)
        return res.status(201).json({ status: "success", updatedTodo });

    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})

export default updateTodo;
