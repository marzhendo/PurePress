package main

import (
	"context"
	"fmt"
	"os"
	"os/exec"
	"purepress/internal/compressor"

	"github.com/wailsapp/wails/v2/pkg/runtime"
)

// Result struct
type Result struct {
	OutputPath string `json:"OutputPath"`
	BeforeSize int64  `json:"BeforeSize"`
	AfterSize  int64  `json:"AfterSize"`
	Error      string `json:"Error,omitempty"`
}

// App struct
type App struct {
	ctx context.Context
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// Greet returns a greeting for the given name
func (a *App) Greet(name string) string {
	return fmt.Sprintf("Hello %s, It's show time!", name)
}

func (a *App) CompressImage(path string, quality int, outputDir string) Result {
	var res Result
	beforeInfo, err := os.Stat(path)
	if err != nil {
		res.Error = "ERROR: " + err.Error()
		return res
	}
	res.BeforeSize = beforeInfo.Size()

	result, err := compressor.Compress(path, quality, outputDir)
	if err != nil {
		res.Error = "ERROR: " + err.Error()
		return res
	}

	afterInfo, err := os.Stat(result)
	if err != nil {
		res.Error = "ERROR: " + err.Error()
		return res
	}

	res.OutputPath = result
	res.AfterSize = afterInfo.Size()
	return res
}

func (a *App) SelectOutputFolder() string {
	folder, err := runtime.OpenDirectoryDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Output Folder",
	})

	if err != nil {
		return ""
	}

	return folder
}

func (a *App) SelectFile() string {
	file, err := runtime.OpenFileDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select File",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Supported Files",
				Pattern:     "*.jpg;*.jpeg;*.png;*.webp;*.pdf",
			},
		},
	})

	if err != nil {
		return ""
	}

	return file
}

func (a *App) SelectMultipleFiles() []string {
	files, err := runtime.OpenMultipleFilesDialog(a.ctx, runtime.OpenDialogOptions{
		Title: "Select Files",
		Filters: []runtime.FileFilter{
			{
				DisplayName: "Supported Files",
				Pattern:     "*.jpg;*.jpeg;*.png;*.webp;*.pdf",
			},
		},
	})

	if err != nil {
		return nil
	}

	return files
}

func (a *App) OpenFile(path string) error {
	return exec.Command("cmd", "/C", "start", "", path).Start()
}

func (a *App) OpenFolder(path string) error {
	return exec.Command("explorer", "/select,", path).Start()
}
