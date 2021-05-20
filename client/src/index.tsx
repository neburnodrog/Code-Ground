import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter, Route } from 'react-router-dom';
import axios from 'axios';

import { UserDocument } from '../../src/models/User';

axios
  .get('/api/auth/logged-in')
  .then((resp) => {
    const user: UserDocument = resp.data;

    ReactDOM.render(
      <BrowserRouter>
        <React.StrictMode>
          <Route path="/" render={(props) => <App {...props} user={user} />} />
        </React.StrictMode>
      </BrowserRouter>,
      document.getElementById('root'),
    );
  })
  .catch((err) => console.log(err));
