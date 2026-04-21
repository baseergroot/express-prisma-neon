import express, { Router, type Request, type Response } from "express";
import { prisma } from "../../db.js";
import { generateToken } from "../../helpers/jwt.js";
import { comparePassword } from "../../helpers/bcrypt.js";


const login: Router = Router();
login.use(express.json());

login.post('/', async (req: Request, res: Response) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ message: "username and password are required" });
    }

    const user = await prisma.user.findUnique({
        where: {
            username,
        },
    });

    if (!user) {
        return res.status(404).json({ message: "user not found" });
    }

    const isPasswordValid = await comparePassword(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: "invalid credentials" });
    }

    const authToken = generateToken({
        username: user.username,
        userId: user.id.toString(),
        role: user.role
    });
    
    return res.cookie("auth-token", authToken, {
        httpOnly: true,
        secure: true,
        maxAge: 7 * 24 * 60 * 60 * 1000,
    }).status(200).json({ message: "user logged in", token: authToken });
})


export default login;
