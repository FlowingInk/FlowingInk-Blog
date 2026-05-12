package jwt

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
)

func AuthMiddleware(manager Manager) gin.HandlerFunc {
	return func(c *gin.Context) {
		token, err := ExtractToken(c.GetHeader("Authorization"))
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}

		claims, err := manager.ParseAccessToken(token)
		if err != nil {
			c.AbortWithStatusJSON(http.StatusUnauthorized, gin.H{
				"error": err.Error(),
			})
			return
		}
		ctx := NewContext(c.Request.Context(), claims)
		c.Request = c.Request.WithContext(ctx)
		c.Set("claims", claims)
		c.Next()
	}
}

func ExtractToken(header string) (string, error) {
	if header == "" {
		return "", fmt.Errorf("header is empty")
	}
	if !strings.HasPrefix(header, "Bearer ") {
		return "", fmt.Errorf("header is haven`t Bearer token")
	}
	return strings.TrimPrefix(header, "Bearer "), nil
}
