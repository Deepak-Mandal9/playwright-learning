import {test as base} from '@playwright/test';
import {TodoPage } from '../pages/TodoPage';

// Define custom fixture types
type CustomFixtures = {
  todoPage: TodoPage;
}

//Extend base test with our custom fixtures
export const test = base.extend<CustomFixtures>({

  //This automatically creates TodoPage and navigate before each test
  todoPage: async ({ page }, use) => {
    const todoPage = new TodoPage(page);
    await todoPage.goto();

    //Hand the fixture to the test
    await use(todoPage);

    //Anythin after use() runs as TEARDOWN after the test
    // We don't need cleanup here but this is wher you'd do it.
  }
})

//Always export expect from here too
export { expect } from '@playwright/test';