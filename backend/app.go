package main

import (
	"context"
	"strconv"

	"golang.org/x/sys/windows"
)

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
	myNumber := DiskUsage()
	str := strconv.FormatUint(myNumber, 10)
	return str
}

// print disk usage of path/disk
func DiskUsage() uint64 {

	var free, total, avail uint64

	path := "c:\\"
	pathPtr, err := windows.UTF16PtrFromString(path)
	if err != nil {
		panic(err)
	}
	err = windows.GetDiskFreeSpaceEx(pathPtr, &free, &total, &avail)

	//fmt.Println("Free:", free, "Total:", total, "Available:", avail)

	return total
}
