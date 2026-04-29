import { useState } from "react";
import { CompressImage } from "../wailsjs/go/main/App";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [quality, setQuality] = useState(70);

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];

    if (file) {
      setFileName(file.name);
      setFilePath(file.path); // Wails support ini
    }
  };

  const handleCompress = async () => {
    if (!filePath) return;
    const res = await CompressImage(filePath, quality);
    setResult(res);
  };

  const handleQuality = (level) => {
    if (level === "low") setQuality(90);
    if (level === "normal") setQuality(70);
    if (level === "high") setQuality(40);
  };

  return (
    <div className="container">

      <div className="header">
        <img src={logo} alt="logo" className="logo" />
        <h1>PurePress</h1>
      </div>

      <div
        className="dropzone"
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
      >
        {fileName ? (
          <p>{fileName}</p>
        ) : (
          <p>Drag & Drop image here</p>
        )}
      </div>

      <div className="quality">
        <button onClick={() => handleQuality("low")}>Low</button>
        <button onClick={() => handleQuality("normal")}>Normal</button>
        <button onClick={() => handleQuality("high")}>High</button>
      </div>

      <button className="compress-btn" onClick={handleCompress}>
        Compress
      </button>

      <p className="result">{result}</p>

      <p className="info">
        Supported: JPG (PNG & WebP coming soon)
      </p>
    </div>
  );
}

export default App;