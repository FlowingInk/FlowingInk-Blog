package profile

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

type ProfileHandler struct {
	profileService *ProfileService
}

func NewProfileHandler(s *ProfileService) *ProfileHandler {
	return &ProfileHandler{profileService: s}
}

func (h *ProfileHandler) GetProfileInfo(c *gin.Context) {
	var req struct {
		ID string `json:"id"`
	}
	if err := c.ShouldBindJSON(&req); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid params",
		})
		return
	}
	data, err := h.profileService.GetProfileInfo(req.ID)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": err.Error(),
		})
		return
	}
	c.JSON(http.StatusOK, gin.H{"data": data})
}
