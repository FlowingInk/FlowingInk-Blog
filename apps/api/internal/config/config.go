package config

import (
	"log"

	"github.com/joho/godotenv"
)

type AppConfig struct {
	Port string
	DB   DBConfig
}

func Load() AppConfig {
	if err := godotenv.Load(); err != nil {
		log.Printf("warning: .env file not found: %v", err)
	}

	return AppConfig{
		Port: "8080",
		DB:   loadDBConfig(),
	}
}
