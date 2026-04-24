import express, { Router, type Request, type Response } from "express";


const userRouter: Router = Router();
userRouter.use(express.json());

userRouter.get('/', async (req: Request, res: Response) => {
    console.log(req.user);
    return res.status(200).json({ message: "user", user: req.user });
})

export default userRouter;
