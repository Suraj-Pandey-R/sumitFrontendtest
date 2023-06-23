import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const redirect_url = window.location.href;
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href={`https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=IAE3E4C164&redirect_uri=${redirect_url}/callback&state=abcd1234`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
