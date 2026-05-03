import { useState } from "react";
import { CompressImage, SelectFile, SelectOutputFolder } from "../wailsjs/go/main/App";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [filePath, setFilePath] = useState("");
  const [fileName, setFileName] = useState("");
  const [outputDir, setOutputDir] = useState("");
  const [result, setResult] = useState("");
  const [isError, setIsError] = useState(false);
  const [quality, setQuality] = useState(70);
  const [selectedQuality, setSelectedQuality] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Byte";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];

    if (file) {
      const ext = file.name.split(".").pop().toLowerCase();
      const allowed = ["jpg", "jpeg", "png", "webp", "pdf"];

      if (!allowed.includes(ext)) {
        setIsError(true);
        setResult("Unsupported file type");
        return;
      }

      setFileName(file.name);
      setFilePath(file.path);
      setIsError(false);
      setResult("");
      setStats(null);
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
    setStats(null);
    setIsError(false);

    try {
      const res = await CompressImage(filePath, quality, outputDir);

      console.log("RESULT:", res);

      if (res.Error) {
        setIsError(true);
        setResult(res.Error);
        return;
      }

      if (res.OutputPath) {
        setIsError(false);
        setResult("Compression complete");
        setStats({
          before: res.BeforeSize,
          after: res.AfterSize,
        });
      } else {
        setIsError(true);
        setResult(JSON.stringify(res));
      }
    } catch (e) {
      setIsError(true);
      setResult(String(e));
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
              const name = path.split("\\").pop();
              const ext = name.split(".").pop().toLowerCase();
              const allowed = ["jpg", "jpeg", "png", "webp", "pdf"];

              if (!allowed.includes(ext)) {
                setIsError(true);
                setResult("Unsupported file type");
                return;
              }

              setFilePath(path);
              setFileName(name);
              setIsError(false);
              setResult("");
              setStats(null);
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

        <div className="output-section">
          <div className="output-info">
            <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <div className="output-text">
              <span className="output-label">Output Folder</span>
              <span className="output-path" title={outputDir}>
                {outputDir ? (outputDir.length > 28 ? outputDir.substring(0, 25) + "..." : outputDir) : "Same as original file"}
              </span>
            </div>
          </div>
          <button className="change-btn" onClick={async () => {
            const folder = await SelectOutputFolder();
            if (folder) {
              setOutputDir(folder);
            }
          }}>
            Change
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

        {stats && (
          <div className="stats animate-fade-in">
            <p>Before: {formatSize(stats.before)}</p>
            <p>After: {formatSize(stats.after)}</p>
            <p className="saved">Saved: {stats.before > 0 ? ((stats.before - stats.after) / stats.before * 100).toFixed(1) : 0}%</p>
          </div>
        )}
        
        {result && <p className={`result ${isError ? "error" : "success"} animate-fade-in`}>{result}</p>}
      </div>

      <p className="info">
        Supported: JPG, PNG, WebP, PDF (optimized)
        <br />
        PDF compression powered by Ghostscript
      </p>
    </div>
  );
}

export default App;