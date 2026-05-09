package domain

import "time"

type PostStatus string

const (
	PostStatusDraft     PostStatus = "draft"
	PostStatusPublished PostStatus = "published"
	PostStatusArchived  PostStatus = "archived"
)

type Post struct {
	BaseModel
	Title          string     `json:"title" gorm:"size:200;not null"`
	Slug           string     `json:"slug" gorm:"size:220;not null;uniqueIndex"`
	Summary        string     `json:"summary" gorm:"type:text"`
	Content        string     `json:"content" gorm:"type:text;not null"`
	CoverImageURL  string     `json:"coverImageUrl" gorm:"size:500"`
	Status         PostStatus `json:"status" gorm:"type:varchar(20);not null;default:'draft';index"`
	IsPinned       bool       `json:"isPinned" gorm:"not null;default:false;index"`
	AllowComment   bool       `json:"allowComment" gorm:"not null;default:true"`
	ViewCount      uint64     `json:"viewCount" gorm:"not null;default:0"`
	WordCount      int        `json:"wordCount" gorm:"not null;default:0"`
	ReadingMinutes int        `json:"readingMinutes" gorm:"not null;default:0"`
	PublishedAt    *time.Time `json:"publishedAt" gorm:"index"`
	AuthorID       *uint      `json:"authorId" gorm:"index"`
	Author         *Author    `json:"author,omitempty"`
	CategoryID     *uint      `json:"categoryId" gorm:"index"`
	Category       *Category  `json:"category,omitempty"`
	Tags           []Tag      `json:"tags,omitempty" gorm:"many2many:post_tags;"`
	Topics         []Topic    `json:"topics,omitempty" gorm:"many2many:post_topics;"`
}
