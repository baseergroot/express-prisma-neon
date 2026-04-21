import express, { Router, type Request, type Response } from "express";
import { prisma } from "../../db.js";
import { decodeToken } from "../../helpers/jwt.js";


const allTodos: Router = Router();
allTodos.use(express.json());

allTodos.get("/", async (req: Request, res: Response) => {
    const authToken = req.cookies.get("auth-token");
    const user = decodeToken(authToken);

    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const todos = await prisma.todo.findMany({
            where: {
                authorId: parseInt(user.userId)
            },

            // include: {
            //     author: true
            // }
        });
        console.log("All todos: ", todos)
        return res.status(200).json({ status: "success", todos })
    } catch (error) {
        console.log("Error: ", error)
        res.status(500).send(error)
    }
})

export default allTodos;