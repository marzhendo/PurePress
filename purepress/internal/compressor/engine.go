package compressor

import (
	"errors"
	"path/filepath"
)

func Compress(inputPath string, quality int) (string, error) {
	ext := filepath.Ext(inputPath)

	output := filepath.Join(filepath.Dir(inputPath), "compressed.jpg")

	switch ext {
	case ".jpg", ".jpeg":
		err := CompressJPEG(inputPath, output, quality)
		return output, err

	default:
		return "", errors.New("unsupported format")
	}
}