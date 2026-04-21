import express, { type Request, type Response, Router } from "express";
import { prisma } from "../../db.js";
import { decodeToken } from "../../helpers/jwt.js";


const allUsers: Router = Router()

allUsers.use(express.json());

allUsers.get("/", async (req: Request, res: Response) => {
    const authToken = req.cookies?.authToken;
    console.log(authToken);

    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const adminUser = decodeToken(authToken);
    if (!adminUser || adminUser.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
    }
    // 1. Verify connection and user existence first
    const users = await prisma.user.findMany()

    console.log(users);

    return res.status(200).json(users);
});


export default allUsers;
