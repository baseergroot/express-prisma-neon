import type { NextFunction, Request, Response } from "express";
import { decodeToken } from "../helpers/jwt.js";


export default async function middleware(req: Request, res: Response, next: NextFunction) {

    const authToken = req.headers["auth-token"] as string;
    console.log(authToken);

    if (!authToken) {
        return res.status(401).json({ message: "Unauthorized at middlware" });
    }
    const user = decodeToken(authToken);
    console.log("User from middleware: ", user)
    req.user = user;
    if (!user) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    next();
}