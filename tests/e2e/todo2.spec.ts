// Notice: we import from fixtures now, NOT from @playwright/test
import {test, expect} from '../../fixtures/index';

test.describe('Todo App- core Features', () => {

  // No more beforeEach neede!
  // todoPage is atumatically injected by fixture

  test('TC001 - Should add anew todo item',
    { tag: ['@smoke', '@regression']}, 
    async({todoPage}) => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.assertTodoVisible('Learn Playwright');
  })

  test('TC002 - Should mark a todo as completed',
    { tag: ['@regression']},
    async({ todoPage}) => {
    await todoPage.addTodo('Learn Playwright');
    await todoPage.completeTodo();
    await todoPage.assertTodoCompleted();
  })

  test('TC003 - Should delete a todo item',
    { tag: ['@regression']},
    async ({ todoPage}) => {
    await todoPage.addTodo('Learn Playwright1');
    await todoPage.deleteTodo();
    await todoPage.assertTodoDeleted();
  })
})