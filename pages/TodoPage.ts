import { Page, Locator, expect } from '@playwright/test';

export class TodoPage {

  // 1. Store the page instance
  private page: Page;

  // 2. Define all locators in one place
  private inputBox: Locator;
  private todoItems: Locator;
  private deleteButton: Locator;

  // 3. Constructor — receives page and initializes locators
  constructor(page: Page) {
    this.page = page;
    this.inputBox = page.getByPlaceholder("What needs to be done?");
    this.todoItems = page.getByTestId('todo-title');
    this.deleteButton = page.locator('.destroy');
  }

  // 4. Navigation method
  async goto() {
    await this.page.goto('/todomvc/#/');
  }

  // 5. Action — Add a todo item
  async addTodo(text: string) {
    await this.inputBox.fill(text);
    await this.page.keyboard.press('Enter');
  }

  // 6. Action — Complete a todo item
  async completeTodo() {
    await this.page.getByRole('checkbox', { name: 'Toggle Todo' }).click();
  }

  // 7. Action — Delete a todo item
  async deleteTodo() {
    await this.todoItems.hover();
    await this.deleteButton.click();
  }

  // 8. Assertion — Todo should be visible
  async assertTodoVisible(text: string) {
    await expect(this.todoItems).toHaveText(text);
  }

  // 9. Assertion — Todo should not exist
  async assertTodoDeleted() {
    await expect(this.todoItems).not.toBeVisible();
  }

  // 10. Assertion — Todo should be completed
  async assertTodoCompleted() {
    await expect(this.page.locator('li.completed')).toBeVisible();
  }

  // 11. Assertion -- Todo list should be empty (nothing was added)
  async assertTodoNotAdded() {
    await expect(this.todoItems).toHaveCount(0);
  }

}

export default TodoPage;