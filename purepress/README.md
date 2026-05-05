# 🌿 PurePress

> **High-performance, offline desktop application for image and PDF compression.**

![PurePress Preview](/purepress/docs/PurePress.png)

PurePress is a lightweight and blazing-fast desktop utility built to optimize images and PDF documents locally. Powered by a Go backend and a React frontend, it provides a seamless, privacy-first alternative to cloud-based compression tools. 

## ✨ Features

- **Batch Processing**: Drag, drop, and compress multiple files simultaneously with unblocked background processing.
- **Broad Format Support**: Efficiently handles **JPG, PNG, WebP**, and **PDF** files in a single unified pipeline.
- **Smart Compression Profiles**: 
  - *Low (Best Quality)* — Maximum visual retention for minimal artifacting.
  - *Normal (Balanced)* — Optimal standard for general use and web delivery.
  - *High (Smallest Size)* — Maximum disk space savings.
- **Detailed Analytics**: Real-time progress tracking, granular per-file statistics, and total percentage-saved metrics.
- **Filesystem Integration**: Select custom output directories and instantly open processed files or folders via native OS shortcuts.
- **Privacy-First Architecture**: 100% local processing. No data is ever transmitted over the network.

## 🛠 Tech Stack

- **Backend**: Go (Golang) for fast, concurrent filesystem operations.
- **Frontend**: React.js & Vite with a modern, responsive Glassmorphism UI.
- **Framework**: [Wails v2](https://wails.io/) for native cross-platform desktop integration.
- **Processing Engine**: Native Go image libraries & Ghostscript (`os/exec`) for advanced PDF reduction.

## 💡 Why I Built This

I needed a reliable, fast, and completely offline way to bulk-compress assets for development and document sharing. Existing web tools often impose file size limits, require waiting in queues, or compromise privacy by uploading sensitive documents to remote servers. PurePress solves this by bringing server-level compression capabilities directly to the local desktop wrapped in a clean, intuitive interface.

## 🚀 Getting Started

### Prerequisites

- [Go 1.25+](https://go.dev/dl/)
- [Node.js 18+](https://nodejs.org/en/)
- **Ghostscript** (Required for PDF compression):
  - **Windows**: Install [Ghostscript](https://ghostscript.com/) and ensure `gswin64c` or `gswin32c` is added to your system `PATH`.
  - **macOS / Linux**: Install via package manager (`brew install ghostscript` or `sudo apt install ghostscript`).

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/marzhendo/PurePress.git
   cd PurePress
   ```

2. **Install the Wails CLI**
   ```bash
   go install github.com/wailsapp/wails/v2/cmd/wails@latest
   ```

3. **Start Development Server**
   ```bash
   wails dev
   ```

### Building for Production

Compile a standalone, optimized executable for your operating system:
```bash
wails build
```
*The compiled binary will be generated inside the `build/bin/` directory.*

## 📖 Usage Guide

1. **Import Files**: Drag and drop your files into the main dashboard pipeline or use the "Choose Files" native system dialog.
2. **Configure Settings**: Select your preferred compression quality (Low, Normal, High).
3. **Set Destination** *(Optional)*: Specify a custom output folder. If left unchanged, PurePress defaults to the original file's location.
4. **Compress**: Click the "Compress" button to initiate the batch process. 
5. **Review**: Monitor real-time progress and review your saved disk space on the results card. Use the quick-action buttons to instantly open the compressed assets immediately.

---

&copy; 2026 Marzhendo. All rights reserved.

