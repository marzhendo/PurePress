# 🌿 PurePress

![PurePress UI](docs/PurePress.png)

PurePress is a modern, lightweight, and blazing-fast desktop application for image compression. Built with **[Wails](https://wails.io/)** (Go + React), PurePress provides a seamless local image optimization experience without requiring an internet connection.

---

## ✨ Features

- **Drag & Drop Interface:** Easily drag and drop images directly into the application.
- **Native File Picker:** Added "Choose File" button to browse locally using the native OS dialog.
- **Multiple Input Formats:** Supports **JPG**, **PNG**, **WebP**, and now **PDF** documents!
- **Optimized Output:** Converts and optimizes images into high-quality **JPG** files, and compresses **PDF** files directly.
- **Smart Compression Levels:** 
  - **Low** (High file size, 90% quality)
  - **Normal** (Balanced size and quality, 70% quality)
  - **High** (Smallest file size, 40% quality)
- **Modern UI:** Features a sleek, responsive Glassmorphism design with loading indicators during processing.
- **Privacy First:** 100% offline processing. Your images never leave your local machine.

---

## 🚀 Getting Started

### Prerequisites

To build and run this application from source, you will need:
- [Go 1.25+](https://go.dev/dl/)
- [Node.js 18+](https://nodejs.org/en/)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)

### 🛠️ Installation & Development

1. Clone the repository and navigate to the project folder.
2. Install the Wails CLI if you haven't already:
   `ash
   go install github.com/wailsapp/wails/v2/cmd/wails@latest
   `
3. Run the application in live development mode:
   `ash
   wails dev
   `

### 📦 Building for Production

To build a standalone executable for your operating system:
`ash
wails build
`
The compiled binary will be available in the uild/bin/ directory.

---

## 📖 How to Use

1. **Launch PurePress.**
2. **Select an Image or PDF:** Click the **"Choose File"** button to open the file explorer, or simply **Drag & Drop** a file (JPG, PNG, WebP, or PDF) into the designated dashed area.
3. **Select Quality:** Choose your desired compression level (applies to images):
   - Low: Best graphical quality.
   - Normal: Recommended for general use.
   - High: Best for saving disk space.
4. **Compress:** Click the **"Compress"** button. The application will show a spinner while processing your file.
5. **Done!** The compressed file will be saved in the exact same folder as your original file, named `compressed.jpg` (or `compressed.pdf` for documents).

---

## 🛠️ Technology Stack

- **Backend:** Go (Golang)
- **Frontend:** React.js, Vite
- **Framework:** Wails v2
- **Styling:** Vanilla CSS (Modern Glassmorphism)
