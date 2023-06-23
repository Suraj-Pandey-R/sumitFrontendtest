import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const redirect_url = window.location.pathname;
  const [data, setData] = useState(window.location.pathname);

  


  const fetchData = async () => {
    try {
      const response = await fetch('https://api.example.com/data'); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  
useEffect(() => {
  console.log("===", data)
}, [data])
  const handleUrlChange = () => {
    // fetchData();
    if (window.location.pathname === `/call`) {
      alert("callback")
    }
    else alert(window.location.pathname)
    // Your code logic here
    console.log('URL has changed:', window.location);
  };

  useEffect(() => {


    window.addEventListener('locationchange', handleUrlChange);

    // Clean up the event listener
    return () => {
      window.removeEventListener('locationchange', handleUrlChange);
    };
  }, []);
  const handleRedirect = () => {
    var stateid = 'rmsign' + Math.random().toString(36).substring(7);
    sessionStorage.setItem('state', stateid);
    window.location.href =
      'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=IAE3E4C164&state=' +
      stateid +'&redirect_uri=https://first.d1ds8gytdtrzs9.amplifyapp.com/call&code_challange=t07mY2BqQEv91nWiLzI9ij79idL8cQjxywyIe-PW4WI&code_challenge_method=S256';

    // }
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button
          className="App-link"
          onClick={handleRedirect}
          rel="noopener noreferrer"
        >
          Learn React
        </button>
      </header>
    </div>
  );
}

export default App;
