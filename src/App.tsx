import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const redirect_url = window.location.pathname;
  const [data, setData] = useState(window.location.pathname);




  const fetchData = async (code: string) => {
    try {
      const response = await fetch(`http://kyc.ryz.market:5001/api/v1?code_challenge=3da3d2e35557537d9b5104acab842204cb6b0242ec0a1b121a60b58c&code=${code}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  function extractCodeValue(url: string) {
    const urlObj = new URL(url);
    const searchParams = new URLSearchParams(urlObj.search);
    return searchParams.get("code");
  }



  useEffect(() => {
    const code = extractCodeValue(data);
    if(code)
      fetchData(code);
    console.log("===", extractCodeValue(data))
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
      stateid + '&redirect_uri=https://first.d1ds8gytdtrzs9.amplifyapp.com/call&code_challenge=fATlfGDnUcIJC7poHD_UOU_yxZgicUj6rhk3WhFB1Ow&code_challenge_method=S256';

    // }
  }

  return (
    <div className="App">
      <p>version 1.0.0</p>
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
