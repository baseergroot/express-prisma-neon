import express, { Router, type Request, type Response } from "express";
import { prisma } from "../../db.js";
import { generateToken } from "../../helpers/jwt.js";
import { hashPassword } from "../../helpers/bcrypt.js";


const createUser: Router = Router();
createUser.use(express.json());

createUser.post("/", async (req: Request, res: Response) => {
    const { username, password } = req.body;
    console.log(username, password);
    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    const userExist = await prisma.user.findFirst({
        where: {
            username
        }
    })

    if (userExist) {
        return res.status(400).json({ message: "user already exist" });
    }

    const hashedPassword = await hashPassword(password);

    const user = await prisma.user.create({
        data: {
            username,
            password: hashedPassword
        },
    });

    if (user) {
        const authToken = generateToken({
            username: user.username,
            userId: user.id.toString(),
            role: user.role
        });
        return res.cookie("auth-token", authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        }).status(201).json({ message: "user created", token: authToken });
    }
    else {
        return res.status(500).json({ message: "internal error" });
    }
});

export default createUser;
