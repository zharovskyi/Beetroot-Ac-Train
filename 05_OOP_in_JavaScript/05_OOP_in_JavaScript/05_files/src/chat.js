import { createStore, combineReducers } from "redux";
import { messages } from "./data";

const ONLINE = "ONLINE";
const AWAY = "AWAY";
const BUSY = "BUSY";
const OFFLINE = "OFFLINE";
const CREATE_MESSAGE = "CREATE_MESSAGE";
const UPDATE_STATUS = "UPDATE_STATUS";

const createMessageAction = (content, postedBy) => ({
  type: CREATE_MESSAGE,
  payload: {
    date: new Date(),
    content,
    postedBy,
  },
});
const statusUpdateAction = (value) => ({
  type: UPDATE_STATUS,
  payload: { value },
});

const defaultState = {
  messages,
  userStatus: ONLINE,
};

const messageReducer = (state = defaultState.messages, action) => {
  const { type, payload } = action;
  switch (type) {
    case CREATE_MESSAGE:
      const { date, content, postedBy } = payload;
      return [{ date, content, postedBy }, ...state];
  }
  return state;
};
const statusReducer = (state = defaultState.userStatus, action) => {
  const { type, payload } = action;
  switch (type) {
    case UPDATE_STATUS:
      return payload.value;
  }
  return state;
};

const rootReducer = combineReducers({
  messages: messageReducer,
  userStatus: statusReducer,
});

const messagesEl = document.getElementById("messages");

const render = () => {
  const { messages, userStatus } = store.getState();
  console.log(userStatus);
  messagesEl.innerHTML = messages
    .sort((a, b) => a.date - b.date)
    .map((message) => `<div>${message.content}: ${message.postedBy}</div>`)
    .join("");

  document.forms.newMessage.fields.disabled = userStatus === OFFLINE;
};

const store = createStore(rootReducer);
window.store = store;
store.subscribe(render);
store.subscribe(() => console.log(store.getState()));
render();

document.addEventListener("submit", handle);
document.addEventListener("change", handle);

function handle(e) {
  const { target, type } = e;
  switch (type) {
    case "submit":
      e.preventDefault();
      if (target.name === "newMessage") {
        const value = target.message.value.trim();
        const userName = localStorage["preference"]
          ? JSON.parse(localStorage["preference"]).userName
          : "Jim";
        store.dispatch(createMessageAction(value, userName));
        target.message.value = "";
      }
      break;
    case "change":
      if (target.name === "status") {
        store.dispatch(statusUpdateAction(target.value));
      }
      break;
  }
}
