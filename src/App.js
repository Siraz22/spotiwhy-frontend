import React from 'react'
import Home from './components/Home';
import Sidebar from './components/Sidebar';
import Youtube from './hardcodedTesting/Youtube';
import background from "./img/gif3.gif";

function App() {

  return (
    <React.Fragment>

      <div>
        <Sidebar />
        <div
          className="contentDivision"
        >
          <Home />
        </div>
      </div>

    </React.Fragment >
  )
}

export default App;
