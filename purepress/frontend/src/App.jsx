import { useState } from "react";
import { CompressImage } from "../wailsjs/go/main/App";
import logo from "./assets/logo.png";
import "./App.css";
import { SelectFile } from "../wailsjs/go/main/App";

function App() {
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [result, setResult] = useState("");
  const [quality, setQuality] = useState(70);
  const [selectedQuality, setSelectedQuality] = useState("normal");
  const [loading, setLoading] = useState(false);

  const handleDrop = (e) => {
  e.preventDefault();

  const file = e.dataTransfer.files[0];

  console.log("FILE:", file);

  if (file) {
    console.log("PATH:", file.path); // 🔥 ini penting

    setFileName(file.name);
    setFilePath(file.path);
  }
};

  const handleCompress = async () => {
    console.log("CLICKED");

    if (!filePath) {
      setResult("No file selected");
      return;
    }

    setLoading(true);
    setResult("");

    try {
      const res = await CompressImage(filePath, quality);

      console.log("RESULT:", res);

      // kalau error
      if (typeof res === "string" && res.includes("ERROR")) {
        setResult(res);
        return;
      }

      // kalau pakai object (step preview nanti)
      if (res.OutputPath) {
        setResult("Success: " + res.OutputPath);
      } else {
        setResult(JSON.stringify(res));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleQuality = (level) => {
    setSelectedQuality(level);
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

      <div className="card">
        <div
          className="dropzone"
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {fileName ? (
            <p className="file-name">{fileName}</p>
          ) : (
            <p>Drag & Drop image here</p>
          )}
          <button className="choose-btn" onClick={async () => {
            const path = await SelectFile();

            if (path) {
              setFilePath(path);
              setFileName(path.split("\\").pop());
            }
          }}>
            Choose File
          </button>
        </div>

        <div className="quality">
          <button 
            className={selectedQuality === "low" ? "active" : ""} 
            onClick={() => handleQuality("low")}
          >
            Low
          </button>
          <button 
            className={selectedQuality === "normal" ? "active" : ""} 
            onClick={() => handleQuality("normal")}
          >
            Normal
          </button>
          <button 
            className={selectedQuality === "high" ? "active" : ""} 
            onClick={() => handleQuality("high")}
          >
            High
          </button>
        </div>

        <button className="compress-btn" onClick={handleCompress} disabled={loading}>
          {loading ? (
            <>
              <span className="spinner"></span> Compressing...
            </>
          ) : (
            "Compress"
          )}
        </button>

        {result && <p className="result">{result}</p>}
      </div>

      <p className="info">
        Supported: JPG, PNG, WebP (converted to JPG)
        <br />
        Output format: JPG (optimized)
      </p>
    </div>
  );
}

export default App;