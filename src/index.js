import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css'
import APIAxios from './components/api/APIAxios';
import { BrowserRouter } from 'react-router-dom';
import CustomGlobalInstances from './components/context/CustomGlobalInstances';

ReactDOM.render(
  <React.StrictMode>

    {/* for API services on Songs as well as Sections */}
    <APIAxios>
      <CustomGlobalInstances>

        <BrowserRouter>
          <App />
        </BrowserRouter>

      </CustomGlobalInstances>
    </APIAxios>

  </React.StrictMode>,
  document.getElementById('root')
);


