export const mockTodoService = {
    createTodo: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      userId: 1,
      status: false,
    }),
    getUserTodos: jest.fn().mockResolvedValue([
      {
        id: 1,
        title: 'Test Todo',
        description: 'This is a test todo',
        userId: 1,
        status: false,
      },
    ]),
    updateTodos: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Updated Todo Title',
      description: 'Updated description',
      status: true,
      userId: 1,
    }),
    deleteTodo: jest.fn().mockResolvedValue({
      id: 1,
      title: 'Test Todo',
      description: 'This is a test todo',
      userId: 1,
      status: false,
    }),
  };
  