import logo from "./logo.svg";
import "./App.css";

import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect } from "react";
// To use Html5Qrcode (more info below)
import { Html5Qrcode } from "html5-qrcode";
import { Main } from "./comp/Main";



function App() {
  return (
    <div className="App">
      <Main/>
    </div>
  );
}

export default App;
