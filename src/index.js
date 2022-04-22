import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import APIAxios from './components/api/APIAxios';

ReactDOM.render(
  <React.StrictMode>

    {/* for API services on Songs as well as Sections */}
    <APIAxios>


      <App />


    </APIAxios>

  </React.StrictMode>,
  document.getElementById('root')
);


