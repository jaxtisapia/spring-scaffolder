import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import createStore from "./utils/database/store";

const { persistor, store } = createStore;

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
    <App />
        </PersistGate>
    </Provider>

            , document.getElementById('root'));
registerServiceWorker();
