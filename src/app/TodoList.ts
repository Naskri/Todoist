import { Notification } from "./Notification";

type Todo = {
  todo: string;
  isCompleted: boolean;
};

export class TodoList {
  todos: Todo[] = [];
  notification = new Notification();

  addTodo(todo: string) {
    const newTodo = {
      todo,
      isCompleted: false,
    };

    this.todos.push(newTodo);
    this.notification.createNotification("Succesfully added todo!");
  }
}
