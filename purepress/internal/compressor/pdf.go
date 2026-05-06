package compressor

import (
	"errors"
	"fmt"
	"os"
	"os/exec"
	"runtime"
)

func getGhostscriptCmd() string {
	if runtime.GOOS == "windows" {
		if _, err := exec.LookPath("gswin64c"); err == nil {
			return "gswin64c"
		}
		if _, err := exec.LookPath("gswin32c"); err == nil {
			return "gswin32c"
		}
		// Default fallback for Windows (incase it's not in PATH we still try it, it will fail naturally)
		return "gswin64c"
	}
	return "gs"
}

func CompressPDF(inputPath, outputPath string) error {
	// Simple validation: check if file is empty
	info, err := os.Stat(inputPath)
	if err != nil {
		return fmt.Errorf("failed to read input file: %v", err)
	}
	if info.Size() == 0 {
		return errors.New("input PDF file is empty or invalid")
	}

	gsCmd := getGhostscriptCmd()
	cmd := exec.Command(gsCmd,
		"-sDEVICE=pdfwrite",
		"-dCompatibilityLevel=1.4",
		"-dPDFSETTINGS=/ebook",
		"-dNOPAUSE",
		"-dQUIET",
		"-dBATCH",
		"-sOutputFile="+outputPath,
		inputPath,
	)

	hideWindowContext(cmd)

	if err := cmd.Run(); err != nil {
		return fmt.Errorf("PDF compression failed (%v). Ensure Ghostscript is installed and added to PATH", err)
	}

	return nil
}
