package config

import (
	"net/url"
	"os"
	"strings"

	"github.com/joho/godotenv"
)

type DBConfig struct {
	DSN      string
	Host     string
	Port     string
	User     string
	Password string
	Name     string
}

func loadDBConfig() DBConfig {
	godotenv.Load()
	dsn := os.Getenv("DB_DSN")

	cfg := DBConfig{DSN: dsn}
	if dsn == "" {
		return cfg
	}

	u, err := url.Parse(dsn)
	if err != nil {
		return cfg
	}

	cfg.User = u.User.Username()
	if p, ok := u.User.Password(); ok {
		cfg.Password = p
	}

	host := u.Hostname()
	if host != "" {
		cfg.Host = host
	}
	port := u.Port()
	if port != "" {
		cfg.Port = port
	}

	if name := strings.TrimPrefix(u.Path, "/"); name != "" {
		cfg.Name = name
	}

	return cfg
}
