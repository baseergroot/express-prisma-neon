import type { NextFunction, Request, Response } from "express";
import { decodeToken } from "../helpers/jwt.js";


export default async function middleware(req: Request, res: Response, next: NextFunction) {
    // console.log(req.cookies.authToken);

    const authToken = req.cookies["auth-token"];
    console.log(authToken);

    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const user = decodeToken(authToken);
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}