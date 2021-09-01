import 'virtual:windi.css';
import 'virtual:windi-devtools';
import './todo-list.element';

const todoList = document.createElement('todo-list');
todoList.title = 'Todo List';
todoList.items = [
  { text: 'Learn Typescript', checked: false },
  { text: 'Learn LitElement', checked: false },
  { text: 'Learn WindiCSS', checked: false },
];

const main = document.createElement('main');
main.className = `
  w-full h-full py-24px bg-light-600 select-none
`;

main.append(todoList);
document.body.append(main);
