import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createStore } from 'redux';
import notesReducer from './reducers/notesReducers';
import { Provider } from 'react-redux';
import combinedReducer from './reducers/combinedReducer';

const myStore = createStore(combinedReducer);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Provider store={myStore}>
      <App/>
    </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
