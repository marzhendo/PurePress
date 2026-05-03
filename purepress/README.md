# 🌿 PurePress

![PurePress UI](/docs/PurePress.png)

PurePress is a modern, lightweight, and blazing-fast desktop application for file compression. Built with **[Wails](https://wails.io/)** (Go + React), PurePress provides a seamless local file optimization experience without requiring an internet connection.

---

## ✨ Features

- **Batch Compression:** Select multiple files or drag & drop multiple files at once. Compress them all in a single click!
- **Multiple Input Formats:** Supports image formats (**JPG**, **PNG**, **WebP**) and document format (**PDF**).
- **Smart Compression Levels:** 
  - **Low** (Best visual quality, 90%)
  - **Normal** (Balanced size and quality, 70%)
  - **High** (Smallest file size, 40%)
- **Custom Output Folder:** Choose where to save your compressed files. If unchanged, it defaults to the original file's location.
- **Detailed Statistics:** Instantly see your "Before" and "After" sizes, as well as what percentage of space you just saved.
- **Quick OS Actions:** One-click shortcuts to **Open File** or **Open Folder** immediately after a successful compression.
- **Privacy First & Offline:** 100% offline processing. Your files never leave your local machine.
- **Modern UI:** Sleek, responsive Glassmorphism design with clear loading states and progress indicators.

---

## 🚀 Getting Started

### Prerequisites

To build and run this application from source, you will need:
- [Go 1.25+](https://go.dev/dl/)
- [Node.js 18+](https://nodejs.org/en/)
- [Wails CLI](https://wails.io/docs/gettingstarted/installation)
- **Ghostscript**: Required for PDF compression.
  - *Windows*: Install Ghostscript (`gswin64c` / `gswin32c`) and ensure it's in your system `PATH`.
  - *Mac/Linux*: Install `ghostscript` via brew or apt (`gs`).

### 🛠️ Installation & Development

1. Clone the repository and navigate to the project folder (`cd purepress`).
2. Install the Wails CLI if you haven't already:
   ```bash
   go install github.com/wailsapp/wails/v2/cmd/wails@latest
   ```
3. Run the application in live development mode:
   ```bash
   wails dev
   ```

### 📦 Building for Production

To build a standalone executable for your operating system:
```bash
wails build
```
The compiled binary will be available in the `build/bin/` directory.

---

## 📖 How to Use

1. **Launch PurePress.**
2. **Select Files:** Click the **"Choose Files"** button to open the native OS file explorer, or **Drag & Drop** multiple files (JPG, PNG, WebP, PDF) straight into the app. Supported files will be listed in the app. If you accidentally added a file, click the `x` next to its name to remove it.
3. **Select Quality:** Choose your desired compression level.
4. **Choose Output Folder:** (Optional) Click **"Change"** in the output section to pick a specific directory for the compressed files. If skipped, files are saved in the same directory as the originals.
5. **Compress:** Click the **"Compress"** button. The application will process your queue and show you live progress!
6. **Review & Open:** View your disk savings stats right below the button. Click **Open File** to open the last compressed file, or **Open Folder** to reveal the output location in your file manager.

---

## 🛠️ Technology Stack

- **Backend:** Go (Golang), `os/exec` (Ghostscript)
- **Frontend:** React.js, Vite
- **Framework:** Wails v2
- **Styling:** Vanilla CSS (Modern Glassmorphism)
