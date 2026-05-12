package post

import (
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func RegisterRoutes(r *gin.Engine, db *gorm.DB) {
	repo := NewPostRepo(db)
	svc := NewPostService(repo)
	handler := NewPostHandler(svc)

	r.GET("/api/posts", handler.GetPostList)
}
