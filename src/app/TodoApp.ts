import { ThemeChanger } from "./ThemeChanger";
import { TodoList } from "./TodoList";

export class TodoApp {
  themeChanger = new ThemeChanger();
  todoList = new TodoList();

  formElement = document.querySelector("[data-form]");
  todoInput = document.querySelector("[data-newTodo]");
  formError = document.querySelector("[data-formError]");

  constructor() {
    this.addEventListeners();
  }

  addEventListeners() {
    this.formElement?.addEventListener("submit", (ev) => {
      ev.preventDefault();

      if (!this.validInput()) return;

      const validValue = this.validInput();

      this.todoList.addTodo(validValue);
      this.clearInput();
    });
  }

  validInput() {
    if (!(this.todoInput instanceof HTMLInputElement)) return "";
    const value = this.todoInput.value;

    if (!value) {
      this.showError("Input can't be empty!");
      return "";
    }

    this.hideError();

    return value;
  }

  showError(message: string) {
    if (!this.formError) return;
    this.formError.classList.remove("hidden");
    this.formError.textContent = message;
  }

  hideError() {
    if (!this.formError) return;
    this.formError.classList.add("hidden");
    this.formError.textContent = "";
  }

  clearInput() {
    if (!(this.todoInput instanceof HTMLInputElement)) return;

    this.todoInput.value = "";
  }
}
