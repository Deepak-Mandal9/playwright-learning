import { test, expect } from '@playwright/test';

test.describe('Todo App - Core Features', () => {

  // This runs before EACH test — fresh page every time
  test.beforeEach(async ({ page }) => {
  await page.goto('/todomvc/#/');
});

  test('TC001 - Should add a new todo item', async ({ page }) => {
    // Step 1: Type in the input box
    await page.getByPlaceholder("What needs to be done?").fill('Learn Playwright');

    // Step 2: Press Enter to create the todo
    await page.keyboard.press('Enter');

    // Step 3: Assert the todo appears in the list
    await expect(page.getByTestId('todo-title')).toHaveText('Learn Playwright');
  });

  test('TC002 - Should mark a todo as completed', async ({ page }) => {
    // Step 1: Add a todo first
    await page.getByPlaceholder("What needs to be done?").fill('Learn Playwright');
    await page.keyboard.press('Enter');

    // Step 2: Click the checkbox to complete it
    await page.getByRole('checkbox', { name: 'Toggle Todo' }).click();

    // Step 3: Assert the todo has completed class
    await expect(page.getByTestId('todo-title')).toHaveText('Learn Playwright');
    await expect(page.locator('li.completed')).toBeVisible();
  });

  test('TC003 - Should delete a todo item', async ({ page }) => {
    // Step 1: Add a todo first
    await page.getByPlaceholder("What needs to be done?").fill('Learn Playwright');
    await page.keyboard.press('Enter');

    // Step 2: Hover over the todo to reveal delete button
    await page.getByTestId('todo-title').hover();

    // Step 3: Click the delete (x) button
    await page.locator('.destroy').click();

    // Step 4: Assert the todo no longer exists
    await expect(page.getByTestId('todo-title')).not.toBeVisible();
  });

});