package domain

type Author struct {
	BaseModel
	Name        string `json:"name" gorm:"size:100;not null"`
	DisplayName string `json:"displayName" gorm:"size:100;not null"`
	Slug        string `json:"slug" gorm:"size:120;not null;uniqueIndex"`
	Email       string `json:"email" gorm:"size:255;uniqueIndex"`
	Subtitle    string `json:"subtitle" gorm:"size:255"`
	AvatarURL   string `json:"avatarUrl" gorm:"size:500"`
	Bio         string `json:"bio" gorm:"type:text"`
	GithubURL   string `json:"githubUrl" gorm:"size:500"`
	BilibiliURL string `json:"bilibiliUrl" gorm:"size:500"`
	Posts       []Post `json:"-" gorm:"foreignKey:AuthorID"`
}
