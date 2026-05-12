package config

import (
	"log"
	"os"
	"time"

	"gopkg.in/yaml.v3"
)

type Jwt struct {
	AccessSecret  string        `yaml:"access_secret"`
	RefreshSecret string        `yaml:"refresh_secret"`
	AccessExpire  time.Duration `yaml:"access_expire"`
	RefreshExpire time.Duration `yaml:"refresh_expire"`
	Issuer        string        `yaml:"issuer"`
}

type jwtConfig struct {
	Jwt Jwt `yaml:"jwt"`
}

func loadJwt() Jwt {
	data, err := os.ReadFile("config.yml")
	if err != nil {
		log.Printf("warning: cannot read config.yml: %v", err)
		return Jwt{}
	}

	var cfg jwtConfig
	if err := yaml.Unmarshal(data, &cfg); err != nil {
		log.Printf("warning: cannot parse jwt config: %v", err)
		return Jwt{}
	}

	return cfg.Jwt
}
