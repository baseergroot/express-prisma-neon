import { Router } from "express";
import addTodo from "./todo/add-todo.js";
import deleteTodo from "./todo/delete-todo.js";
import updateTodo from "./todo/update-todo.js";
import allTodos from "./todo/all-todos.js";
import middleware from "./middleware.js";
import createUser from "./user/create-user.js";
import login from "./user/login.js";
import user from "./user/user.js";
import rateLimiter from "../helpers/rate-limit.js";


const apiRouter: Router = Router();

apiRouter.use("/all-todos", middleware, allTodos);
apiRouter.use("/add-todo", middleware, addTodo);
apiRouter.use("/delete-todo", middleware, deleteTodo)
apiRouter.use("/update-todo", middleware, updateTodo)
apiRouter.use("/create-user", rateLimiter, createUser);
apiRouter.use("/login", rateLimiter, login);
apiRouter.use("/user", middleware, user);

export default apiRouter;
