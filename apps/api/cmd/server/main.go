package main

import (
	"log"

	"FlowingInk-Blog/internal/bootstrap"
	"FlowingInk-Blog/internal/config"
	"FlowingInk-Blog/internal/post"
	"FlowingInk-Blog/internal/profile"
	"FlowingInk-Blog/jwt"
	"FlowingInk-Blog/user"

	"github.com/gin-gonic/gin"
)

func main() {
	log.Println("App is starting.....")

	cfg := config.Load()

	jwtManager := jwt.NewJWTManager(jwt.WithAccessSecret(cfg.Jwt.AccessSecret),
		jwt.WithRefreshSecret(cfg.Jwt.RefreshSecret),
		jwt.WithAccessExpire(cfg.Jwt.AccessExpire),
		jwt.WithRefreshExpire(cfg.Jwt.RefreshExpire),
		jwt.WithIssuer(cfg.Jwt.Issuer),
	)

	db, err := bootstrap.NewDB(cfg.DB)
	if err != nil {
		log.Fatalf("init db failed: %v", err)
	}

	router := gin.Default()

	profile.RegisterRoutes(router, db)
	post.RegisterRoutes(router, db)
	user.RegisterRoutes(router, db, jwtManager)

	log.Printf("Server is running on :%s\n", cfg.Port)
	if err := router.Run(":" + cfg.Port); err != nil {
		log.Fatalf("server start failed: %v", err)
	}
}
