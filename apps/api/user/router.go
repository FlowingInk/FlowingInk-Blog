package user

import (
	"FlowingInk-Blog/internal/jwt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB, jwtManager jwt.Manager) {
	repo := NewUserRepo(db)
	service := NewUserService(repo)
	handler := NewUserHandler(service, jwtManager)

	// public routes
	router.POST("/api/register", handler.Register)
	router.POST("/api/login", handler.Login)

	// protected routes
	authGroup := router.Group("/api/admin", jwt.AuthMiddleware(jwtManager))
	{
		_ = authGroup
	}
}
