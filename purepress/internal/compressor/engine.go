package compressor

import (
	"errors"
	"path/filepath"
	"strings"
)

func Compress(inputPath string, quality int) (string, error) {
	ext := strings.ToLower(filepath.Ext(inputPath))

	output := filepath.Join(filepath.Dir(inputPath), "compressed.jpg")

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

	default:
		return "", errors.New("unsupported format")
	}
}
