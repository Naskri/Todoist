import { Notification } from "./Notification";
import { Storage } from "./Storage";

type Todo = {
  todo: string;
  isCompleted: boolean;
};

export class TodoList {
  todos: Todo[] = [];
  storage = new Storage<Todo[]>();
  notification = new Notification();

  addTodo(todo: string) {
    const newTodo = {
      todo,
      isCompleted: false,
    };

    this.todos.push(newTodo);
    this.storage.setItemToStorage("todos", this.todos);
    this.notification.createNotification("Succesfully added todo!");
  }
}
