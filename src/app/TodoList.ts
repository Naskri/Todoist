import { FilterChanger } from "./FilterChanger";
import { Notification } from "./Notification";
import { Storage } from "./Storage";
import { Todo, TodoItem } from "./Todo";

export class TodoList {
  todos: Todo[] = [];
  storage = new Storage<Todo[]>();
  notification = new Notification();
  filterChanger = new FilterChanger();
  todoListContainer = document.querySelector("[data-todosListContainer]");
  todoListElement = document.querySelector("[data-todosList]");
  todoEmptyListElement = document.querySelector("[data-todosEmpty]");
  todoItemsElement = document.querySelector("[data-todosItems]");

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
    window.addEventListener("popstate", () => {
      this.renderList();
    });

    this.todoListContainer?.addEventListener("click", (ev) => {
      if (!(ev.target instanceof HTMLButtonElement)) return;
      const id = ev.target.dataset.id;

      if (ev.target.classList.contains("button--delete")) {
        this.deleteTodo(Number(id));
      }
      if (ev.target.classList.contains("button--edit")) {
        this.editTodo(Number(id));
      }

      if (ev.target.classList.contains("button--clear")) {
        console.log("clear");
        this.clearTodos();
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

  clearTodos() {
    this.todos = [];
    this.storage.setItemToStorage("todos", this.todos);
    this.notification.createNotification("Succesfully cleared todos!");
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

  showTodosItems(filteredTodos: Todo[]) {
    if (!this.todoItemsElement) return;
    this.todoItemsElement.textContent = String(filteredTodos.length);
  }

  filteredTodos() {
    const filter = this.filterChanger.getFilter();

    console.log(filter, this.todos);

    if (!filter) return this.todos;

    if (filter === "active") {
      return this.todos.filter((todo) => !todo.isCompleted);
    }
    if (filter === "completed") {
      return this.todos.filter((todo) => todo.isCompleted);
    }

    return this.todos;
  }

  renderList() {
    this.clearElementBeforeRendering();

    if (!this.todos.length) {
      this.showEmptyElement();
    }

    const filteredTodos = this.filteredTodos();

    this.showTodosItems(filteredTodos);

    filteredTodos.forEach((todo) => {
      const newTodo = new TodoItem();

      this.todoListElement?.insertAdjacentHTML(
        "beforeend",
        newTodo.renderTodo(todo)
      );
    });
  }
}
