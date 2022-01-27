import Axios from 'axios';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

Axios.interceptors.request.use(
  request => {
    request.headers['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
    return request;
  }, error => {
    return Promise.reject(error);
  }
)

ReactDOM.render(
  <React.StrictMode> 
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
