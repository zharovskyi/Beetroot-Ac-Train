import { generate as id } from "shortid";
import { Dispatcher, ReduceStore } from "./flux";
import { tasks } from "./data";

const tasksEl = document.getElementById("tasks");
const newTaskForm = document.forms.newTask;
const showCompletedEl = document.getElementById("showCompleted");
const undoEl = document.getElementById("undo");
const historyLengthEl = document.getElementById("history-length");

const CREATE_TODO_ACTION = "CREATE_TODO_ACTION";
const SHOW_TODO_ACTION = "SHOW_TODO_ACTION";
const COMPLETE_TODO_ACTION = "COMPLETE_TODO_ACTION";

const createTodoAction = (task) => ({
  type: CREATE_TODO_ACTION,
  payload: { task },
});

const completeTodoAction = (id, completed) => ({
  type: COMPLETE_TODO_ACTION,
  payload: { id, completed },
});

const showTodoAction = (show) => ({
  type: SHOW_TODO_ACTION,
  payload: { show },
});

class TodoStore extends ReduceStore {
  getInitialState() {
    return {
      tasks,
      showCompleted: true,
    };
  }
  reduce(state, action) {
    const { type, payload } = action;
    let newState;
    switch (type) {
      case CREATE_TODO_ACTION:
        newState = { ...state, tasks: [...state.tasks] };
        newState.tasks.push({
          id: id(),
          content: payload.task,
          completed: false,
        });
        return newState;
      case COMPLETE_TODO_ACTION:
        newState = { ...state, tasks: [...state.tasks] };

        const idx = newState.tasks.findIndex((t) => t.id === payload.id);
        newState.tasks[idx] = {
          ...newState.tasks[idx],
          completed: payload.completed,
        };
        return newState;
      case SHOW_TODO_ACTION:
        return { ...state, showCompleted: payload.show };
    }
    return state;
  }
}
const todoDispatcher = new Dispatcher();
const todoStore = new TodoStore(todoDispatcher);

function TaskComponent({ id, content, completed }) {
  return `<section>
            <label for="todo-${id}">${content}</label>
            <input name="todoCheck"  data-id="${id}"
            ${completed ? "checked" : ""} id="todo-${id}" type="checkbox"
           />
    </section>`;
}

function redner() {
  const { tasks, showCompleted } = todoStore.getState();
  tasksEl.innerHTML = tasks
    .filter((t) => (showCompleted ? true : !t.completed))
    .map(TaskComponent)
    .join("");
}
function renderHistoryButton() {
  historyLengthEl.textContent = todoStore.hasHistory
    ? ` - ${todoStore.history.length}`
    : "";
  historyLengthEl.parentNode.disabled = !todoStore.hasHistory;
}

renderHistoryButton();
undoEl.addEventListener("click", (e) => {
  if (todoStore.hasHistory) {
    todoStore.revertLastHistory();
  }
});

newTaskForm.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
  e.preventDefault();

  const input = e.target.newTaskName;
  const val = input.value.trim();
  if (!val) {
    alert("Enter todo");
    return;
  }

  todoDispatcher.dispath(createTodoAction(val));
  input.value = "";
}

document.addEventListener("change", handleTodoComplete);
function handleTodoComplete(e) {
  const target = e.target;
  if (target.name !== "todoCheck") {
    return;
  }
  todoDispatcher.dispath(completeTodoAction(target.dataset.id, target.checked));
}
showCompletedEl.addEventListener("change", ({ target }) => {
  todoDispatcher.dispath(showTodoAction(target.checked));
});

redner();
todoStore.addListener(redner);
todoStore.addListener(renderHistoryButton);
