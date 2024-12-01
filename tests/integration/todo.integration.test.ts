import request from 'supertest';
import {app} from '../../src/index'; // Assuming you have an Express app initialized in src/app.ts
import { mockTodoService } from '../__mocks__/mockTodoService';

jest.mock('../../src/services/todo.service', () => mockTodoService);

describe('TodoController', () => {
  let token: string;
  let todoId: number;

  beforeAll(async () => {
    const res = await request(app)
      .post('/auth/register')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword123',
      });

    token = res.body.token;
  });

  it('should create a new todo', async () => {
    const res = await request(app)
      .post('/todos')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Test Todo',
        description: 'This is a test todo',
      });

    expect(res.status).toBe(201);
    expect(res.body.message).toBe('Todo created successfully');
    expect(res.body.todo).toHaveProperty('id');
    todoId = res.body.todo.id;
  });

  it('should get all todos for the user', async () => {
    const res = await request(app)
      .get('/todos')
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo fetched successfully');
    expect(res.body.todos).toBeInstanceOf(Array);
  });

  it('should update a todo', async () => {
    const res = await request(app)
      .put(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Todo Title',
        description: 'Updated description',
        status: true,
      });

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo updated successfully');
    expect(res.body.todo).toHaveProperty('id', todoId);
  });

  it('should delete a todo', async () => {
    const res = await request(app)
      .delete(`/todos/${todoId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.status).toBe(200);
    expect(res.body.message).toBe('Todo deleted successfully');
  });
});
