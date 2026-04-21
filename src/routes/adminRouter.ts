import { Router } from "express";
import allUsers from "./admin/all-users.js";



const adminRouter: Router = Router();

adminRouter.use("/all-users", allUsers);

export default adminRouter;