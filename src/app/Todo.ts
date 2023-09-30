export type Todo = {
  id: number;
  todo: string;
  isCompleted: boolean;
};

export class TodoItem {
  renderTodo({ id, todo, isCompleted }: Todo) {
    return `
      <div class="todos-item ${isCompleted && "todos-item--completed"}">
                  <div class="button__container">
                    <button
                      class="button button--edit ${
                        isCompleted && "button--completed"
                      }"
                      aria-label="Change todo complete state"
                      data-id="${id}"
                    >
                      &nbsp;
                    </button>
                  </div>
                  <h2 class="heading__secondary">${todo}</h2>
                  <div class="button__container todos-item__delete">
                    <button
                      class="button button--delete"
                      aria-label="Delete todo"
                      data-id="${id}"
                    >
                      <img
                        src="./images/icon-cross.svg"
                        alt=""
                        class="button__image"
                      />
                    </button>
                  </div>
                </div>
    `;
  }
}
