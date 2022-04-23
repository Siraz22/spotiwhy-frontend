import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import APIAxios from './components/api/APIAxios';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.render(
  <React.StrictMode>

    {/* for API services on Songs as well as Sections */}
    <APIAxios>

      <BrowserRouter>
        <App />
      </BrowserRouter>

    </APIAxios>

  </React.StrictMode>,
  document.getElementById('root')
);


