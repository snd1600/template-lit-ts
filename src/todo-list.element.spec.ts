import { test, expect } from '@playwright/test';
import type { TodoListElement } from './todo-list.element';

test.describe('TodoListElement', () => {
  test.beforeEach(async ({ page, baseURL }) => {
    await page.goto(baseURL ?? '');
  });

  test('should be able to add a todo item', async ({ page }) => {
    const todoList = page.locator('todo-list');
    const input = todoList.locator('input[aria-label="Add todo item"]');
    const button = todoList.locator('button[aria-label="Add todo item"]');
    const items = todoList.locator('[aria-label="Todo item"]');

    const todos = ['Press enter key', 'Click add button'];

    await input.focus();
    await input.type(todos[0]);
    await input.press('Enter');
    await input.type(todos[1]);
    await button.click();

    const texts = (await items.allTextContents()).map((x) => x.trim());

    expect(texts.length).toBeGreaterThanOrEqual(2);
    expect(texts[texts.length - 2]).toBe(todos[0]);
    expect(texts[texts.length - 1]).toBe(todos[1]);
  });

  test('should not add a empty todo item', async ({ page }) => {
    const todoList = page.locator('todo-list');
    const input = todoList.locator('input[aria-label="Add todo item"]');
    const items = todoList.locator('[aria-label="Todo item"]');

    const oldLength = (await items.allTextContents()).length;
    const todos = ['', '\t \n'];

    await input.focus();
    for (const todo of todos) {
      await input.type(todo);
      await input.press('Enter');
    }

    const newLength = (await items.allTextContents()).length;

    expect(todos.map((x) => x.trim()).some((x) => x)).toBeFalsy();
    expect(newLength).toBe(oldLength);
  });

  test('should be able to remove a todo item', async ({ page }) => {
    const todoList = page.locator('todo-list');
    const input = todoList.locator('input[aria-label="Add todo item"]');
    const items = todoList.locator('[aria-label="Todo item"]');

    const oldLength = (await items.allTextContents()).length;
    const todo = 'Remove this';

    await input.focus();
    await input.type(todo);
    await input.press('Enter');
    await todoList
      .locator('button[aria-label="Remove todo item"]')
      .last()
      .click();

    const newLength = (await items.allTextContents()).length;
    expect(newLength).toBe(oldLength);
  });

  test('should be able to check todo items', async ({ page }) => {
    const todoList = page.locator('todo-list');
    const items = todoList.locator('[aria-label="Todo item"]');

    const oldCheckList = await todoList.evaluate((x) => {
      const elem = x as TodoListElement;
      elem.items = [
        { text: 'Todo 1', checked: false },
        { text: 'Todo 2', checked: true },
      ];
      elem.requestUpdate();
      return elem.items.map((y) => y.checked);
    });

    for (const item of await items.elementHandles()) {
      await item.click();
    }

    const newCheckList = await todoList.evaluate((x) => {
      const elem = x as TodoListElement;
      return elem.items.map((y) => y.checked);
    });

    expect(newCheckList.length).toBe(oldCheckList.length);

    for await (const [n, checked] of newCheckList.entries()) {
      expect(checked).toBe(!oldCheckList[n]);
      const lineThrough = await items.nth(n).evaluate((elem) => {
        return elem.classList.contains('line-through');
      });
      expect(checked).toBe(lineThrough);
    }
  });
});
