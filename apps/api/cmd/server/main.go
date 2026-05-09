package main

import (
	"log"

	"FlowingInk-Blog/internal/bootstrap"
	"FlowingInk-Blog/internal/config"
	"FlowingInk-Blog/internal/profile"

	"github.com/gin-gonic/gin"
)

func main() {
	log.Println("App is starting.....")

	appCfg := config.Load()

	db, err := bootstrap.NewDB(appCfg.DB)
	if err != nil {
		log.Fatalf("init db failed: %v", err)
	}

	authorRepo := profile.NewAuthorRepo(db)
	profileSvc := profile.NewProfileService(authorRepo)
	profileHandler := profile.NewProfileHandler(profileSvc)

	router := gin.Default()
	router.POST("/api/profile", profileHandler.GetProfileInfo)

	log.Printf("Server is running on :%s\n", appCfg.Port)
	if err := router.Run(":" + appCfg.Port); err != nil {
		log.Fatalf("server start failed: %v", err)
	}
}
