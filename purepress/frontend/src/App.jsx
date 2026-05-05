import { useState } from "react";
import { CompressImage, SelectMultipleFiles, SelectOutputFolder, OpenFile, OpenFolder } from "../wailsjs/go/main/App";
import logo from "./assets/logo.png";
import "./App.css";

function App() {
  const [files, setFiles] = useState([]);
  const [outputDir, setOutputDir] = useState("");
  const [result, setResult] = useState("");
  const [outPath, setOutPath] = useState("");
  const [isError, setIsError] = useState(false);
  const [quality, setQuality] = useState(70);
  const [selectedQuality, setSelectedQuality] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState(null);
  const [progressMsg, setProgressMsg] = useState("");
  const [fileResults, setFileResults] = useState([]);
  const [progress, setProgress] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [totalFiles, setTotalFiles] = useState(0);

  const formatSize = (bytes) => {
    if (!bytes || bytes === 0) return "0 Byte";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const handleDrop = (e) => {
    e.preventDefault();

    const droppedFiles = Array.from(e.dataTransfer.files);
    if (!droppedFiles || droppedFiles.length === 0) return;

    const allowed = ["jpg", "jpeg", "png", "webp", "pdf"];
    const validFiles = droppedFiles.filter(file => {
      const ext = file.name.split(".").pop().toLowerCase();
      return allowed.includes(ext);
    }).map(f => ({ name: f.name, path: f.path }));

    if (validFiles.length === 0) {
      setIsError(true);
      setResult("Unsupported file type(s)");
      return;
    }

    setFiles(prev => [...prev, ...validFiles]);
    setIsError(false);
    setResult("");
    setOutPath("");
    setStats(null);
    setProgressMsg("");
    setFileResults([]);
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
    setIsError(false);
    setResult("");
    setStats(null);
    setFileResults([]);
  };

  const handleCompress = async () => {
    if (files.length === 0) {
      setResult("No files selected");
      return;
    }

    setLoading(true);
    setResult("");
    setOutPath("");
    setStats(null);
    setIsError(false);
    setFileResults([]);
    setProgress(0);
    setCurrentIndex(0);
    setTotalFiles(files.length);

    let totalBefore = 0;
    let totalAfter = 0;
    let successCount = 0;
    let lastOutPath = "";
    let errors = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      setCurrentIndex(i + 1);
      setProgressMsg(`Compressing ${i + 1}/${files.length}...`);
      
      try {
        const res = await CompressImage(file.path, quality, outputDir);
        
        if (res.Error) {
          errors.push(`${file.name}: ${res.Error}`);
          setFileResults(prev => [...prev, {
            name: file.name,
            status: "error",
            message: res.Error
          }]);
          continue;
        }

        if (res.OutputPath) {
          successCount++;
          totalBefore += res.BeforeSize;
          totalAfter += res.AfterSize;
          lastOutPath = res.OutputPath;
          
          const savedPerc = res.BeforeSize > 0 
            ? ((res.BeforeSize - res.AfterSize) / res.BeforeSize * 100).toFixed(1) 
            : 0;

          setFileResults(prev => [...prev, {
            name: file.name,
            before: res.BeforeSize,
            after: res.AfterSize,
            saved: savedPerc,
            status: "success"
          }]);
        } else {
          errors.push(`${file.name}: Unknown error`);
          setFileResults(prev => [...prev, {
            name: file.name,
            status: "error",
            message: "Unknown error"
          }]);
        }
      } catch (e) {
        errors.push(`${file.name}: ${String(e)}`);
        setFileResults(prev => [...prev, {
          name: file.name,
          status: "error",
          message: String(e)
        }]);
      }
      setProgress(((i + 1) / files.length) * 100);
    }

    if (successCount > 0) {
      setOutPath(lastOutPath);
      setStats({
        before: totalBefore,
        after: totalAfter,
      });
    }

    if (errors.length > 0) {
      setIsError(true);
      setResult(`Processed ${successCount}/${files.length}. Errors:\n${errors.join("\n")}`);
    } else {
      setIsError(false);
      setResult(`Compression complete (${successCount} ${successCount === 1 ? 'file' : 'files'})`);
    }

    setLoading(false);
    setProgressMsg("");
    setProgress(0);
    setCurrentIndex(0);
    setTotalFiles(0);
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
          className={`dropzone ${files.length > 0 ? "has-files" : ""}`}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
        >
          {files.length > 0 ? (
            <div className="file-list">
              {files.map((file, i) => (
                <div key={i} className="file-item">
                  <span className="file-name-text">{file.name}</span>
                  <button className="remove-btn" onClick={(e) => {
                    e.stopPropagation();
                    removeFile(i);
                  }}>×</button>
                </div>
              ))}
            </div>
          ) : (
            <p>Drag & drop files here or choose manually</p>
          )}
          <button className="choose-btn" onClick={async () => {
            const paths = await SelectMultipleFiles();

            if (paths && paths.length > 0) {
              const allowed = ["jpg", "jpeg", "png", "webp", "pdf"];
              const newFiles = [];
              let hasInvalid = false;

              for (const path of paths) {
                const name = path.split("\\").pop();
                const ext = name.split(".").pop().toLowerCase();

                if (allowed.includes(ext)) {
                  newFiles.push({ name, path });
                } else {
                  hasInvalid = true;
                }
              }

              if (hasInvalid && newFiles.length === 0) {
                setIsError(true);
                setResult("Unsupported file type(s)");
                return;
              }

              setFiles(prev => [...prev, ...newFiles]);
              setIsError(false);
              if (hasInvalid) {
                setResult("Some files were skipped (unsupported type)");
              } else {
                setResult("");
              }
              setOutPath("");
              setStats(null);
            }
          }}>
            Choose Files
          </button>
        </div>

        <div className="quality">
          <button 
            className={selectedQuality === "low" ? "active" : ""} 
            onClick={() => handleQuality("low")}
          >
            Low (Best Quality)
          </button>
          <button 
            className={selectedQuality === "normal" ? "active" : ""} 
            onClick={() => handleQuality("normal")}
          >
            Normal (Balanced)
          </button>
          <button 
            className={selectedQuality === "high" ? "active" : ""} 
            onClick={() => handleQuality("high")}
          >
            High (Smallest Size)
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

        <button className="compress-btn" onClick={handleCompress} disabled={loading || files.length === 0}>
          {loading ? (
            <>
              <span className="spinner"></span> {progressMsg || "Compressing..."}
            </>
          ) : (
            `Compress ${files.length > 0 ? `(${files.length})` : ''}`
          )}
        </button>

        {loading && totalFiles > 0 && (
          <div className="progress-container">
            <p>
              Compressing {currentIndex}/{totalFiles}
            </p>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p>{progress.toFixed(0)}%</p>
          </div>
        )}

        {stats && (
          <div className="stats animate-fade-in result-card">
            <p>Total Before: {formatSize(stats.before)}</p>
            <p>Total After: {formatSize(stats.after)}</p>
            <p className="saved">Total Saved: {stats.before > 0 ? ((stats.before - stats.after) / stats.before * 100).toFixed(1) : 0}%</p>
            
            {fileResults.length > 0 && (
              <details className="file-details">
                <summary>Details per file</summary>
                <div className="file-details-list">
                  {fileResults.map((res, i) => (
                    <div key={i} className="file-details-item">
                      <span className="file-details-name" title={res.name}>{res.name}</span>
                      {res.status === "success" ? (
                        <span className="file-details-status success">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"></path></svg>
                          Saved {res.saved}%
                        </span>
                      ) : (
                        <span className="file-details-status error">
                          <svg width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>
                          Failed
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            )}
          </div>
        )}
        
        {outPath && !isError && (
          <div className="action-buttons animate-fade-in">
            <button className="action-btn" onClick={() => OpenFile(outPath)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>
              Open File
            </button>
            <button className="action-btn" onClick={() => OpenFolder(outPath)}>
              <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
              Open Folder
            </button>
          </div>
        )}

        {result && <p className={`result ${isError ? "error" : "success"} animate-fade-in`}>{result}</p>}
      </div>

      <p className="info">
        Supported: JPG, PNG, WebP, PDF (optimized)
        <br />
        PDF compression powered by Ghostscript
      </p>

      <div className="footer">
        &copy; 2026 Marzhendo. All rights reserved.
      </div>
    </div>
  );
}

export default App;