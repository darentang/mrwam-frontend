import './App.css';
import React, { useEffect, useState, useContext } from "react";

import 'bootswatch/dist/darkly/bootstrap.min.css';

import Connect from './components/Connect'
import Main from './components/Main'

import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'

function App() {
  const [address, setAddress] = useState(null);
  return(
    <div>
    <Navbar bg="primary" variant="dark" sticky="top">
      <Navbar.Brand>MrWAM Mission Console</Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
          {(sessionStorage.getItem('api-host') == null) &&
            <Navbar.Text>
            Not Connected
            </Navbar.Text>
          }
          {(sessionStorage.getItem('api-host') != null) &&
            <div>
              <Navbar.Text style={{'marginRight': '2vh'}}>
                Connected to {sessionStorage.getItem('api-host')}
              </Navbar.Text>
            </div>
          }
      </Navbar.Collapse>
    </Navbar>
    <div className="main">

    {(sessionStorage.getItem('api-host') == null) &&
        <Connect setAddress={setAddress} />
    }
    {(sessionStorage.getItem('api-host') != null) &&
      
        <Main/>
        
      }

    </div>
    </div>
  );
}

export default App;
