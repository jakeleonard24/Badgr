import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {Provider} from 'react-redux';
import { HashRouter } from 'react-router-dom';
<<<<<<< HEAD
import { Provider } from "react-redux";
import store from './store';

ReactDOM.render(
<Provider store={store}>
<HashRouter>
<App />
</HashRouter>
</Provider>,
=======
import store from './store'

ReactDOM.render(
    <Provider store = {store}>
        <HashRouter>
        <App />
        </HashRouter>
    </Provider>  ,
>>>>>>> 1a4f85fcb361f04223804d220d7dd6c2b327af55
    document.getElementById('root'));
