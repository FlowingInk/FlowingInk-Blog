package bootstrap

import (
	"FlowingInk-Blog/internal/config"
	"FlowingInk-Blog/internal/domain"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func NewDB(cfg config.DBConfig) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(cfg.DSN), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	if err := db.AutoMigrate(domain.Models()...); err != nil {
		return nil, err
	}

	return db, nil
}
