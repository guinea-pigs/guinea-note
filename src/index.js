import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import noteReducer from './reducers/noteReducer';
import errorReducer from './reducers/errorReducer';
import loadingReducer from './reducers/loadingReducer';
import authReducer from './reducers/authReducer';

import { createStore, combineReducers, applyMiddleware } from 'redux'
import ReduxThunk from 'redux-thunk'
import { Provider } from 'react-redux';



const reducer = combineReducers({
    notes: noteReducer,
    errors: errorReducer,
    loading: loadingReducer,
    authed: authReducer,
})

const store = createStore(reducer, applyMiddleware(ReduxThunk));




ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>, document.getElementById('root'));