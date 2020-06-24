import { createStore, combineReducers } from 'redux';
import { data } from './data';

const CREATE_USERS = "CREATE_USERS";

const createUsersAction = (content) => ({
    type: CREATE_USERS,
    payload: {
        id,
        name,
        result,
        status
    }
})

const defaultState = {
    data,
}

const dataReducer = (state = defaultState.data, action) => {
    const { type, payload } = action;
    return state;
}
const rootReducer = combineReducers({
    data: dataReducer,
})

const tableElement = document.getElementById('results');
const render = () => {
    let counter = 1;
    const { data } = store.getState();
    console.log(data.players);
    tableElement.innerHTML = data.players.map(data =>
        `
    <tr>
                <td>${counter++}</td>
                <td>${data.name}</td>
                <td>${data.result}</td>
                <td>${data.status}</td>
              </tr>
    `)
}

const store = createStore(rootReducer);

window.store = store
// console.log(store.getState());
store.subscribe(render);
render();