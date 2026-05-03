# 🌿 PurePress

![PurePress UI](docs/PurePress.png)

PurePress is a modern, lightweight, and blazing-fast desktop application for image compression. Built with **[Wails](https://wails.io/)** (Go + React), PurePress provides a seamless local image optimization experience without requiring an internet connection.

---

## ✨ Features

- **Drag & Drop Interface:** Easily drag and drop images directly into the application.
- **Multiple Input Formats:** Supports **JPG**, **PNG**, and **WebP** formats.
- **Optimized Output:** Converts and optimizes all inputs into high-quality **JPG** files.
- **Smart Compression Levels:** 
  - **Low** (High file size, 90% quality)
  - **Normal** (Balanced size and quality, 70% quality)
  - **High** (Smallest file size, 40% quality)
- **Modern UI:** Features a sleek, responsive Glassmorphism design.
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
2. **Select an Image:** Click the **"Choose File"** button or simply **Drag & Drop** an image (JPG, PNG, or WebP) into the designated dashed area.
3. **Select Quality:** Choose your desired compression level:
   - Low: Best graphical quality.
   - Normal: Recommended for general use.
   - High: Best for saving disk space.
4. **Compress:** Click the **"Compress"** button. The application will process the image.
5. **Done!** The compressed file will be saved in the exact same folder as your original file, named compressed.jpg.

---

## 🛠️ Technology Stack

- **Backend:** Go (Golang)
- **Frontend:** React.js, Vite
- **Framework:** Wails v2
- **Styling:** Vanilla CSS (Modern Glassmorphism)
