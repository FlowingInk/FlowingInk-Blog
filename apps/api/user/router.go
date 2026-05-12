package user

import (
	"FlowingInk-Blog/jwt"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(router *gin.Engine, db *gorm.DB, jwtManager jwt.Manager) {

	authGroup := router.Group("/api/admin", jwt.AuthMiddleware(jwtManager))
	{
	}
}
