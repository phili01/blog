import 'react-app-polyfill/ie9';
import 'react-app-polyfill/stable';
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { createStore, combineReducers, applyMiddleware }  from 'redux'; 
import { Provider } from 'react-redux';
import reduxThunk from 'redux-thunk';
import  createSagaMiddleware from 'redux-saga';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import * as serviceWorker from './serviceWorker';
import './index.css';
import App from './App';
import post from './store/reducers/post';
import form from './store/reducers/form';

import { 
        watchForm,
        watchPt
    } from './store/sagas/index';

const sagaMiddleware = createSagaMiddleware();


const rootReducers = combineReducers({
    pt: post,
    form
})

const store = createStore(rootReducers, applyMiddleware(reduxThunk, sagaMiddleware));

sagaMiddleware.run(watchForm);
sagaMiddleware.run(watchPt);

library.add(fas,far,fab)

const app = (
    <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

serviceWorker.register();