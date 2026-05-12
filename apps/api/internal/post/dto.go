package post

type PostItem struct {
	Slug          string `json:"slug"          gorm:"column:slug"`
	Title         string `json:"title"         gorm:"column:title"`
	Summary       string `json:"summary"       gorm:"column:summary"`
	CoverImageURL string `json:"coverImageUrl" gorm:"column:cover_image_url"`
	Eyebrow       string `json:"eyebrow"       gorm:"column:eyebrow"`
	PublishedAt   string `json:"publishedAt"   gorm:"column:published_at"`
}

type PostListResponse struct {
	Data       []PostItem `json:"data"`
	Total      int        `json:"total"`
	Page       int        `json:"page"`
	PageSize   int        `json:"pageSize"`
	TotalPages int        `json:"totalPages"`
}

type PostListRequest struct {
	Page     int `form:"page"     binding:"required,min=1"`
	PageSize int `form:"pageSize" binding:"required,min=1,max=100"`
}
