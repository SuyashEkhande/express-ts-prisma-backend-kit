import { Router } from "express";
import TodoController from "../controllers/todo.controller";
import {authMiddleware} from "../middlewares/auth.middleware"; 

const router: Router = Router();

router.use(authMiddleware);

router.post("/", TodoController.createTodo);
router.get("/", TodoController.getUserTodos);
router.put("/:id", TodoController.updateTodo);
router.delete("/:id", TodoController.deleteTodo);

export default router;