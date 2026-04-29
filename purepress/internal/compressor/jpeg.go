package compressor

import (
	"image/jpeg"
	"os"
)

func CompressJPEG(inputPath, outputPath string, quality int) error {
	in, err := os.Open(inputPath)
	if err != nil {
		return err
	}
	defer in.Close()

	img, err := jpeg.Decode(in)
	if err != nil {
		return err
	}

	out, err := os.Create(outputPath)
	if err != nil {
		return err
	}
	defer out.Close()

	opts := &jpeg.Options{Quality: quality}
	return jpeg.Encode(out, img, opts)
}