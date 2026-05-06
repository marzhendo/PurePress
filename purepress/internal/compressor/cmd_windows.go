//go:build windows

package compressor

import (
	"os/exec"
	"syscall"
)

func hideWindowContext(cmd *exec.Cmd) {
	cmd.SysProcAttr = &syscall.SysProcAttr{HideWindow: true}
}
