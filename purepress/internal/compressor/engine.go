package compressor

import (
	"errors"
	"path/filepath"
	"strings"
)

func Compress(inputPath string, quality int, outputDir string) (string, error) {
	ext := strings.ToLower(filepath.Ext(inputPath))

	if outputDir == "" {
		outputDir = filepath.Dir(inputPath)
	}

	baseName := strings.TrimSuffix(filepath.Base(inputPath), filepath.Ext(inputPath))

	var output string
	if ext == ".pdf" {
		output = filepath.Join(outputDir, baseName+"_compressed.pdf")
	} else {
		output = filepath.Join(outputDir, baseName+"_compressed.jpg")
	}

	switch ext {
	case ".jpg", ".jpeg":
		err := CompressJPEG(inputPath, output, quality)
		return output, err

	case ".png":
		err := CompressPNG(inputPath, output, quality)
		return output, err

	case ".webp":
		err := CompressWebP(inputPath, output, quality)
		return output, err

	case ".pdf":
		err := CompressPDF(inputPath, output)
		return output, err

	default:
		return "", errors.New("unsupported format")
	}
}
