package config

import (
	"log"

	"github.com/joho/godotenv"
)

type Configuration struct {
	Port string
	DB   DBConfig
	Jwt  Jwt
}

func Load() Configuration {
	if err := godotenv.Load(); err != nil {
		log.Printf("warning: .env file not found: %v", err)
	}

	return Configuration{
		Port: "8080",
		DB:   loadDBConfig(),
		Jwt:  loadJwt(),
	}
}
