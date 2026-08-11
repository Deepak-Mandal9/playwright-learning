import { test } from '@playwright/test';
import { TodoPage } from '../../pages/TodoPage';

test.describe('Todo App - Core Features', () => {

  let todoPage: TodoPage;

  // Initialize POM before each test
  test.beforeEach(async ({ page }) => {
    todoPage = new TodoPage(page);
    await todoPage.goto();
  });

  test('TC001 - Should add a new todo item', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.assertTodoVisible('Learn Playwright');
  });

  test('TC002 - Should mark a todo as completed', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.completeTodo();
    await todoPage.assertTodoCompleted();
  });

  test('TC003 - Should delete a todo item', async () => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.deleteTodo();
    await todoPage.assertTodoDeleted();
  });

});