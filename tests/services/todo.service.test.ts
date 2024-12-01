import TodoService from '../../src/app/services/todo.service';
import prisma from '../../src/config/prisma.client';
jest.mock('../src/config/prisma.client', () => ({
  todo: {
    create: jest.fn(),
    findMany: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('TodoService Tests', () => {
  describe('createTodo', () => {
    it('should create a todo successfully', async () => {
      prisma.todo.create.mockResolvedValue({
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: false,
        userId: 1,
      });

      const result = await TodoService.createTodo(1, { title: 'Test Todo', description: 'Test Description' });
      
      expect(result).toBeDefined();
      expect(result.title).toBe('Test Todo');
    });
  });

  describe('getUserTodos', () => {
    it('should fetch todos for a user', async () => {
      prisma.todo.findMany.mockResolvedValue([
        { id: 1, title: 'Test Todo', description: 'Test Description', status: false, userId: 1 },
      ]);

      const result = await TodoService.getUserTodos(1);
      
      expect(result).toBeDefined();
      expect(result.length).toBe(1);
    });
  });

  describe('updateTodo', () => {
    it('should update a todo successfully', async () => {
      prisma.todo.update.mockResolvedValue({
        id: 1,
        title: 'Updated Todo',
        description: 'Updated Description',
        status: true,
      });

      const result = await TodoService.updateTodo(1, { title: 'Updated Todo', description: 'Updated Description', status: true });
      
      expect(result).toBeDefined();
      expect(result.title).toBe('Updated Todo');
    });
  });

  describe('deleteTodo', () => {
    it('should delete a todo successfully', async () => {
      prisma.todo.delete.mockResolvedValue({
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: false,
      });

      const result = await TodoService.deleteTodo(1);
      
      expect(result).toBeDefined();
      expect(result.title).toBe('Test Todo');
    });
  });
});
