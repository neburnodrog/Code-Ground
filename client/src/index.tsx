import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import axios from 'axios';

import { UserDocument } from '../../src/models/User';

axios
  .get('/api/auth/logged-in')
  .then((resp) => {
    const user: UserDocument = resp.data;

    ReactDOM.render(
      <Router>
        <React.StrictMode>
          <App user={user} />
        </React.StrictMode>
      </Router>,
      document.getElementById('root'),
    );
  })
  .catch((err) => console.log(err));
