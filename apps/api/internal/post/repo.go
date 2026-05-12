package post

import (
	"FlowingInk-Blog/internal/domain"

	"gorm.io/gorm"
)

type PostRepo interface {
	GetPostList(page, pageSize int) ([]PostItem, int, error)
}

type PostRepoGorm struct {
	db *gorm.DB
}

func NewPostRepo(db *gorm.DB) *PostRepoGorm {
	return &PostRepoGorm{db: db}
}

func (r *PostRepoGorm) GetPostList(page, pageSize int) ([]PostItem, int, error) {
	var total int64
	if err := r.db.Model(&domain.Post{}).
		Where("status = ?", domain.PostStatusPublished).
		Count(&total).Error; err != nil {
		return nil, 0, err
	}

	var posts []PostItem
	err := r.db.Raw(`
		SELECT p.slug,
		       p.title,
		       p.summary,
		       p.cover_image_url,
		       COALESCE(c.name, '') AS eyebrow,
		       p.published_at
		FROM posts p
		LEFT JOIN categories c ON c.id = p.category_id
		WHERE p.status = ?
		  AND p.deleted_at IS NULL
		ORDER BY p.published_at DESC
		LIMIT ? OFFSET ?
	`, domain.PostStatusPublished, pageSize, (page-1)*pageSize).
		Scan(&posts).Error

	return posts, int(total), err
}
