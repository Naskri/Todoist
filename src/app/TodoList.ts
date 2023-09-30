import { Notification } from "./Notification";
import { Storage } from "./Storage";
import { Todo, TodoItem } from "./Todo";

export class TodoList {
  todos: Todo[] = [];
  storage = new Storage<Todo[]>();
  notification = new Notification();
  todoListElement = document.querySelector("[data-todosList]");
  todoEmptyListElement = document.querySelector("[data-todosEmpty]");

  constructor() {
    this.todos = this.getInitialTodos();
    this.renderList();
    this.addEventListeners();
  }

  getInitialTodos() {
    const storagedTodos = this.storage.getItems("todos");
    if (!storagedTodos) return [];
    return JSON.parse(storagedTodos);
  }

  addEventListeners() {
    this.todoListElement?.addEventListener("click", (ev) => {
      if (!(ev.target instanceof HTMLButtonElement)) return;
      const id = ev.target.dataset.id;

      if (ev.target.classList.contains("button--delete")) {
        this.deleteTodo(Number(id));
      }
      if (ev.target.classList.contains("button--edit")) {
        this.editTodo(Number(id));
      }
    });
  }

  addTodo(todo: string) {
    const newTodo = {
      id: Math.random(),
      todo,
      isCompleted: false,
    };

    this.todos.push(newTodo);
    this.storage.setItemToStorage("todos", this.todos);
    this.notification.createNotification("Succesfully added todo!");
    this.renderList();
  }

  deleteTodo(id: number) {
    if (!id) return;

    this.todos = this.todos.filter((todo) => todo.id !== id);
    this.storage.setItemToStorage("todos", this.todos);
    this.notification.createNotification("Succesfully deleted todo!");
    this.renderList();
  }

  editTodo(id: number) {
    if (!id) return;

    this.todos = this.todos.map((todo) =>
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : { ...todo }
    );
    this.storage.setItemToStorage("todos", this.todos);
    this.notification.createNotification("Succesfully edited todo!");
    this.renderList();
  }

  clearElementBeforeRendering() {
    if (!this.todoListElement) return;
    this.todoListElement.innerHTML = "";
  }

  showEmptyElement() {
    if (!this.todoListElement) return;

    const html = `
      <div class="todos-list__empty" data-todosEmpty>
                  <h2 class="heading__secondary">Not found todos.</h2>
                </div>
    `;

    this.todoListElement.insertAdjacentHTML("beforeend", html);
  }

  renderList() {
    this.clearElementBeforeRendering();

    if (!this.todos.length) {
      this.showEmptyElement();
    }

    this.todos.forEach((todo) => {
      const newTodo = new TodoItem();

      this.todoListElement?.insertAdjacentHTML(
        "beforeend",
        newTodo.renderTodo(todo)
      );
    });
  }
}
