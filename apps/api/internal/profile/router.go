package profile

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	repo := NewAuthorRepo(db)
	svc := NewProfileService(repo)
	handler := NewProfileHandler(svc)

	r.POST("/api/profile", handler.GetProfileInfo)
}
