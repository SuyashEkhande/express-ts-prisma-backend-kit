import  prisma  from '../../config/prisma.client';
import { CreateTodoRequestDTO, UpdateTodoRequestDTO } from "../../types/todo.types";


const TodoService = {

    createTodo: async (
        userId: number, 
        todoData: CreateTodoRequestDTO
    ) => {
        return prisma.todo.create({
            data: {
               userId,
               title: todoData.title,
               description:todoData.description,
               status: false 
            }
        });
    },

    getUserTodos: async (
        userId: number
    ) => {
        return prisma.todo.findMany({
            where: {
                userId
            }
        })
        
    },

    updateTodo: async(
        userId: number, 
        todoId: number, 
        todoData: UpdateTodoRequestDTO
    ) => {
        return prisma.todo.update({
            where:{
                id: todoId,
                userId 
            },
            data: {
                title: todoData.title,
                description: todoData.description,
                status: todoData.status
            }
        });
        
    },

    deleteTodo: async(
        userId: number, 
        todoId: number
    ) => {
        return prisma.todo.delete({
            where: {
                id: todoId,
                userId
            }
        })
        
    }


};

export default TodoService;

