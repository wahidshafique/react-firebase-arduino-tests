import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as firebase from 'firebase';
import registerServiceWorker from './registerServiceWorker';

const firebaseKey = require('./firebasekey.js');

firebase.initializeApp(firebaseKey.key);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
