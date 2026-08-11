import {test, expect} from "../../fixtures/index";
import todoData from "../../test-data/todo.json";

test.describe('Todo App - Data Driven Tests', () => {

  // ✅ Valid todos - should all be added successfuully
  for (const todo of todoData.validTodos) {
    test(`Should add todo with ${todo.description}`, async({ todoPage}) => {
      await todoPage.addTodo(todo.input);
      await todoPage.assertTodoVisible(todo.input);
    })
  }

  // ❌ Invalid todos - should Notbe added
  for (const todo of todoData.invalidTodos) {
    test(`Should not add tood with ${todo.description}`, async({ todoPage}) => {
      await todoPage.addTodo(todo.input);
      await todoPage.assertTodoNotAdded();
    })
  }
})