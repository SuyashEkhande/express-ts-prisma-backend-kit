import { Request, Response } from "express";
import TodoService from "../services/todo.service";
import { todoSchema, updateTodoSchema } from "../validators/todo.schema";
import { CreateTodoRequestDTO, UpdateTodoRequestDTO, CreateTodoResponseDTO, UpdateTodoResponseDTO, TodoResponseDTO } from "../../types/todo.types";
import PrismaErrorService  from "../services/prismaError.service";

const TodoController = {

    createTodo: async (
        req: Request<{}, {}, CreateTodoRequestDTO>,
        res: Response
    ): Promise<void> => {
        try {

            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }


            const { title, description } = todoSchema.parse(req.body);

            const userId = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser

            const newtodo = await TodoService.createTodo(userId, { title, description });

            const response: CreateTodoResponseDTO = {
                message: "Todo created successfully",
                todo: newtodo
            }

            res.status(201).json(response);
            return;

        } catch (error) {

            PrismaErrorService.HandlePrismaError(error, res);
            return;
        }
    },

    getUserTodos: async (
        req: Request,
        res: Response
    ): Promise<void> => {
        try {
            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const userId: number = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser

            const todos = await TodoService.getUserTodos(userId);

            const response: TodoResponseDTO = {
                message: 'Todo fetched successfully',
                todos: todos.map(todo => ({
                    id: todo.id,
                    title: todo.title,
                    description: todo.description,
                    status: todo.status,
                    userId: todo.userId
                })),
            };

            res.status(200).json(response);
            return;

        } catch (error) {

            PrismaErrorService.HandlePrismaError(error, res);
            return;
        }
    },

    updateTodo: async (
        req: Request<{ id: string }, {}, UpdateTodoRequestDTO>,
        res: Response
    ): Promise<void> => {
        try {
            //Check if user is authenticated / has valid token
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const { title, description, status } = updateTodoSchema.parse(req.body);
            const userId: number = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            
            const updatedTodo = await TodoService.updateTodo(userId, parseInt(req.params.id), { title, description, status });

            if (!updatedTodo) {
                res.status(404).json({ message: 'Todo not found', todo: null });
                return;
            }

            const response: UpdateTodoResponseDTO = {
                message: 'Todo updated successfully',
                todo: updatedTodo
            };

            res.status(200).json(response);
            return;

        } catch (error) {

            PrismaErrorService.HandlePrismaError(error, res);
            return;
        }
    },

    deleteTodo: async (
        req: Request<{ id: string }>,
        res: Response
    ): Promise<void> =>{
        try {
            if (!req.authUser) {
                res.status(401).json({ message: "Unauthorized" });
                return;
            }

            const userId: number = req.authUser.userId; //userId which is parsed from auth middleware and stored in req.authUser
            const deletedTodo = await TodoService.deleteTodo(userId,parseInt(req.params.id));

            if (!deletedTodo) {
                res.status(404).json({ message: 'Todo not found', todo: null });
                return;
            }

            res.status(200).json({ message: 'Todo deleted successfully'});
            return;
            
        } catch (error) {

            PrismaErrorService.HandlePrismaError(error, res);
            return;
        }
    }

};

export default TodoController;