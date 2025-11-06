package main

import (
	"context"
	"embed"
	"os"

	"github.com/wailsapp/wails/v2"
	"github.com/wailsapp/wails/v2/pkg/options"
	"github.com/wailsapp/wails/v2/pkg/options/assetserver"
)

//go:embed all:frontend
var assets embed.FS

// App structure
type App struct {
	ctx context.Context
}

func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

// SaveFile Save text to file
func (a *App) SaveFile(content string) error {
	return os.WriteFile("note.txt", []byte(content), 0o644)
}

func main() {
	app := &App{}

	err := wails.Run(&options.App{
		Title:      "Sachiel",
		Width:      900,
		Height:     600,
		Fullscreen: true,
		// BackgroundColour: &options.RGBA{R: 0, G: 0, B: 0, A: 0},
		// Frameless:        true,
		Debug: options.Debug{},
		AssetServer: &assetserver.Options{
			Assets: assets,
		},
		OnStartup: func(ctx context.Context) {
			app.startup(ctx)
		},
		Bind: []any{app},
	})
	if err != nil {
		println("Error:", err.Error())
	}
}
