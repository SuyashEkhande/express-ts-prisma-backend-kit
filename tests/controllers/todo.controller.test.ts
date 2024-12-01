import request from 'supertest';
import {app} from '../../src/index';  // Import your Express app
import { mockTodoService } from './__mocks/mockTodoService';

// Mocking TodoService methods used in the controller
jest.mock('../src/app/services/todo.service', () => mockTodoService);

describe('TodoController Tests', () => {
  describe('POST /todos', () => {
    it('should create a new todo successfully', async () => {
      mockTodoService.createTodo.mockResolvedValue({
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: false,
      });

      const response = await request(app)
        .post('/todos')
        .set('Authorization', 'Bearer mocked-token') // Assuming auth is required
        .send({
          title: 'Test Todo',
          description: 'Test Description',
        });

      expect(response.status).toBe(201);
      expect(response.body.message).toBe('Todo created successfully');
      expect(response.body.todo.title).toBe('Test Todo');
    });

    it('should return an error if user is not authorized', async () => {
      const response = await request(app)
        .post('/todos')
        .send({
          title: 'Test Todo',
          description: 'Test Description',
        });

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('GET /todos', () => {
    it('should fetch all todos for an authenticated user', async () => {
      mockTodoService.getUserTodos.mockResolvedValue([
        { id: 1, title: 'Test Todo', description: 'Test Description', status: false, userId: 1 },
      ]);

      const response = await request(app)
        .get('/todos')
        .set('Authorization', 'Bearer mocked-token');  // Assuming auth is required

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Todo fetched successfully');
      expect(response.body.todos.length).toBe(1);
    });

    it('should return an error if user is not authorized', async () => {
      const response = await request(app)
        .get('/todos');

      expect(response.status).toBe(401);
      expect(response.body.message).toBe('Unauthorized');
    });
  });

  describe('PUT /todos/:id', () => {
    it('should update a todo successfully', async () => {
      mockTodoService.updateTodos.mockResolvedValue({
        id: 1,
        title: 'Updated Todo',
        description: 'Updated Description',
        status: true,
      });

      const response = await request(app)
        .put('/todos/1')
        .set('Authorization', 'Bearer mocked-token')
        .send({
          title: 'Updated Todo',
          description: 'Updated Description',
          status: true,
        });

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Todo updated successfully');
      expect(response.body.todo.title).toBe('Updated Todo');
    });
  });

  describe('DELETE /todos/:id', () => {
    it('should delete a todo successfully', async () => {
      mockTodoService.deleteTodo.mockResolvedValue({
        id: 1,
        title: 'Test Todo',
        description: 'Test Description',
        status: false,
      });

      const response = await request(app)
        .delete('/todos/1')
        .set('Authorization', 'Bearer mocked-token');

      expect(response.status).toBe(200);
      expect(response.body.message).toBe('Todo deleted successfully');
    });
  });
});