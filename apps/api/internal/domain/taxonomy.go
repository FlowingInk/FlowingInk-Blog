package domain

type Tag struct {
	BaseModel
	Name        string `json:"name" gorm:"size:59;not null;uniqueIndex"`
	Slug        string `json:"slug" gorm:"size:79;not null;uniqueIndex"`
	Description string `json:"description" gorm:"type:text"`
	Color       string `json:"color" gorm:"size:19"`
	Posts       []Post `json:"-" gorm:"many2many:post_tags;"`
}
type Category struct {
	BaseModel
	Name          string `json:"name" gorm:"size:100;not null;uniqueIndex"`
	Slug          string `json:"slug" gorm:"size:120;not null;uniqueIndex"`
	Description   string `json:"description" gorm:"type:text"`
	CoverImageURL string `json:"coverImageUrl" gorm:"size:500"`
	Posts         []Post `json:"-" gorm:"foreignKey:CategoryID"`
}

type Topic struct {
	BaseModel
	Name          string `json:"name" gorm:"size:100;not null;uniqueIndex"`
	Slug          string `json:"slug" gorm:"size:120;not null;uniqueIndex"`
	Summary       string `json:"summary" gorm:"type:text"`
	CoverImageURL string `json:"coverImageUrl" gorm:"size:500"`
	Featured      bool   `json:"featured" gorm:"not null;default:false"`
	Posts         []Post `json:"-" gorm:"many2many:post_topics;"`
}
