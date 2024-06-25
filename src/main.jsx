import React from 'react';
import ReactDOM from 'react-dom/client';
import '../public/customConsole.js';
import { Provider } from 'react-redux';
import { store } from './redux/store';
import './index.css';
import AppWrapper from './App.jsx';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <Provider store={store}>
            <AppWrapper />
        </Provider>
);