import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [data, setData] = useState(window.location.href);
  const [url, setUrl] = useState("http://13.200.34.167:5001/api/v1");
  const [code_challenge, setCode_Challenge] = useState('fATlfGDnUcIJC7poHD_UOU_yxZgicUj6rhk3WhFB1Ow')
  const [verifier, setVerifier] = useState("3da3d2e35557537d9b5104acab842204cb6b0242ec0a1b121a60b58c")

  const fetchData = async (code: string) => {
    try {
      const response = await fetch(`${url}?code_challenge=${verifier}&code=${code}`); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error('Request failed');
      }
      const responseData = await response.json();
      setData(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  function extractCodeValue(url: string): string {
    if (!url || url === "/") {
      // If URL is empty or only "/"
      console.log("Invalid URL: Missing 'code' parameter", url);
    }
  
    let codeValue = null;
    try {
      const urlObj = new URL(url);
      const searchParams = new URLSearchParams(urlObj.search);
      codeValue = searchParams.get("code");
    } catch (error) {
      // If URL is invalid
      console.log("Invalid URL: Failed to parse", url);
    }
  
    // Validate and handle corner cases
    if (!codeValue) {
      // If "code" parameter is not present
      console.log("Invalid URL: Missing 'code' parameter", url);
    }
  
    // Optionally, you can further validate the codeValue format if needed
    // For example, check if it matches a specific pattern or length
  
    return codeValue ?? "";
  }


  useEffect(() => {
  
    const code = extractCodeValue(data);
    code && fetchData(code);
    
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
      `https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=IAE3E4C164&state=
      ${stateid}&redirect_uri=https://first.d1ds8gytdtrzs9.amplifyapp.com/call&code_challenge=${code_challenge}&code_challenge_method=S256`;

    // }
  }

  return (
    <div className="App">
      <header className="App-header">
        <label>URL</label>
        <input onChange={(e) => setUrl(e.target.value)} value={url}/>
        <label>Challenger</label>
        <input value={code_challenge} onChange={(e) => setCode_Challenge(e.target.value)}/>
        <label>Verifier</label>
        <input value={verifier} onChange={(e) => setVerifier(e.target.value)}/>
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
