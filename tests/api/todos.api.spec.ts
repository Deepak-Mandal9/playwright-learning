import {test, expect} from '@playwright/test';

test.describe('Todos API', () => {

  // Test 1: GET single todo
  test('GET /todos/1 - should return correct todo',
    { tag: ['@smoke', '@api'] },
     async ({ request}) => {
    // Step 1: Make te GET request
    const response = await request.get('/todos/1');

    // Step 2: Assert status code 
    expect(response.status()).toBe(200);

    // Step 3: Prase the response body
    const body = await response.json();

    // Step 4: Assert response fields
    expect(body.id).toBe(1);
    expect(body.userId).toBe(1);
    expect(body.title).toBe('delectus aut autem');
    expect(body.completed).toBe(false);

  });

  // Test 2: GET all todos
  test('GET /todos -should return list of todos',
    { tag: ['@api'] },
    async({request}) => {
    const response = await request.get('/todos');

    expect(response.status()).toBe(200);

    const body = await response.json();

    // Assert it return an array
    expect(Array.isArray(body)).toBe(true);

    // Assert it has items
    expect(body.length).toBeGreaterThan(0);

    // Assert first item has correct structure
    expect(body[0]).toHaveProperty('id');
    expect(body[0]).toHaveProperty('userId');
    expect(body[0]).toHaveProperty('title');
    expect(body[0]).toHaveProperty('completed');
  })

  // Test 3: POST - create a new todo
  test('POST /todos - should create a new todo',
    { tag: ['@api'] },
    async ({request}) => {
    // Step 1: Make POST request with body
    const response = await request.post('/todos', {
      data: {
        userId: 1,
        title: 'Learn Playwright API Testing',
        completed: false,
      }
    });

    // Step 1: Console log the response first
    console.log(await response.json());

    // Step 2: Then write assertions based on actual output

    // Step 2: Assert status code is 201 Created
    expect(response.status()).toBe(201);

    // Step 3: Assert response body
    const body = await response.json();
    expect(body.userId).toBe(1);
    expect(body.title).toBe('Learn Playwright API Testing');
    expect(body.completed).toBe(false);

    // Step 4: Assert new ID was generaated
    expect(body.id).toBeDefined();
  });

  // Test 4: PUT - update a todo
  test('PUT /todos/1 -should update a todo',
    { tag: ['@api'] },
    async ({ request }) => {
    const response = await request.put('/todos/1', {
      data: {
        userId: 1,
        id: 1,
        title: 'Updated Todo Title',
        completed: true,
      }
    })

    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.title).toBe('Updated Todo Title');
    expect(body.completed).toBe(true);
  })

  // ✅ TEST 5: DELETE - delete a todo
  test('DELETE /todos/1 - should delete a todo',
    { tag: ['@api'] },
    async ({ request }) => {
    const response = await request.delete('/todos/1');

    // DELETE returns 200 with empty object
    expect(response.status()).toBe(200);

    const body = await response.json();

    // Response should be empty object {}
    expect(body).toEqual({});
  });
})