import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [data, setData] = useState(window.location.href);
  const [url, setUrl] = useState(
    "https://kyc.algonly.com:5001/server-0.0.1-SNAPSHOT/api/v1/start"
  );
  const [code_challenge, setCode_Challenge] = useState(
    "fATlfGDnUcIJC7poHD_UOU_yxZgicUj6rhk3WhFB1Ow"
  );
  const [verifier, setVerifier] = useState(
    "3da3d2e35557537d9b5104acab842204cb6b0242ec0a1b121a60b58c"
  );
  const [tokenData, setTokenData] = useState<any>({});

  const fetchData = async (code: string) => {
    try {
      const response = await fetch(
        `${url}?code_challenge=${verifier}&code=${code}`
      ); // Replace with your API endpoint
      if (!response.ok) {
        throw new Error("Request failed");
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

  const handleRedirect = () => {
    var stateid = "rmsign" + Math.random().toString(36).substring(7);
    sessionStorage.setItem("state", stateid);
    window.location.href = `https://digilocker.meripehchaan.gov.in/public/oauth2/1/authorize?response_type=code&client_id=IAE3E4C164&state=
      ${stateid}&redirect_uri=https://first.d1ds8gytdtrzs9.amplifyapp.com/call&code_challenge=${code_challenge}&code_challenge_method=S256`;

    // }
  };
  const handleApiClick = () => {
    const code = extractCodeValue(data);
    code && fetchData(code);
  };
  const handleFetchToken = async () => {
    try {
      const response = await fetch(
        `https://kyc.algonly.com:5001/server-0.0.1-SNAPSHOT/api/v1/takedata`
      );
      if (!response.ok) {
        throw new Error("Request failed");
      }
      const responseData = await response.json();
      setTokenData(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  console.log(tokenData);

  const handleDownloadPdf = async () => {
    try {
      const token = "YOUR_AUTH_BEARER_TOKEN"; // Replace with your actual bearer token

      const response = await fetch(
        `https://digilocker.meripehchaan.gov.in/public/oauth2/1/file/${
          tokenData?.uri ?? ""
        }`,
        {
          headers: {
            Authorization: `Bearer ${tokenData?.bearer ?? ""}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const responseData = await response.json();
      setTokenData(responseData);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <label>URL:</label>
        <input onChange={(e) => setUrl(e.target.value)} value={url} />
        <label>Challenger</label>
        <input
          value={code_challenge}
          onChange={(e) => setCode_Challenge(e.target.value)}
        />
        <label>Verifier</label>
        <input value={verifier} onChange={(e) => setVerifier(e.target.value)} />
        <button onClick={handleApiClick}>hit api</button>
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
        <br />
        <button onClick={handleFetchToken}>Fetch Token</button>
        <br />
        <button onClick={handleDownloadPdf}>Download PDF</button>
      </header>
    </div>
  );
}

export default App;
