package profile

import (
	"gorm.io/gorm"
)

type AuthorRepo interface {
	GetStats(id string) (ProfileStats, error)
}

type AuthorRepoGorm struct {
	db *gorm.DB
}

func NewAuthorRepo(db *gorm.DB) AuthorRepo {
	return &AuthorRepoGorm{db: db}
}

func (r *AuthorRepoGorm) GetStats(id string) (ProfileStats, error) {
	var stats ProfileStats
	err := r.db.Raw(`
		SELECT
			COUNT(DISTINCT p.id)          AS post_count,
			COUNT(DISTINCT p.category_id) AS category_count,
			COUNT(DISTINCT pt.tag_id)     AS tag_count
		FROM posts p
		LEFT JOIN post_tags pt ON pt.post_id = p.id
		WHERE p.author_id = ?
	`, id).Scan(&stats).Error
	return stats, err
}

func (r *AuthorRepoGorm) GetProfileInfo(id string) {

}
