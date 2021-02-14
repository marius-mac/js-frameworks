import React from 'react';
import ReactDOM from 'react-dom';
import uuidv4 from 'uuid/v4';

import App from './app';
import { unregister } from './registerServiceWorker';

import './index.css';

if (!localStorage.getItem('userId')) {
  localStorage.setItem('userId', uuidv4());
}

ReactDOM.hydrate(<App />, document.getElementById('root'));
unregister();
