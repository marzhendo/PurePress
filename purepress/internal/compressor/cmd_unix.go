//go:build !windows

package compressor

import "os/exec"

func hideWindowContext(cmd *exec.Cmd) {
	// Do nothing on non-Windows
}
