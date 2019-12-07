import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import rootReducer from "./reducers/rootReducer";

const loadFromLocalStorage = () => {
    const serializedState = localStorage.getItem('state');
    if(serializedState == null) {
        return {
            isDeveloper: null,
            isManager: null,
            projectID: null,
            id: null,
        }
    } else {
        return JSON.parse(serializedState);
    }
}

const persistedState = loadFromLocalStorage();

const saveToLocalStorage = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
}

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
    console.log('store updation',store.getState());
    saveToLocalStorage(store.getState());
});


ReactDOM.render(<Provider store={store}><App /></Provider>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
