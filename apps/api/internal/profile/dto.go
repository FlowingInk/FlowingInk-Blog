package profile

type ProfileStats struct {
	PostCount     int `json:"postCount"     gorm:"column:post_count"`
	CategoryCount int `json:"categoryCount" gorm:"column:category_count"`
	TagCount      int `json:"tagCount"      gorm:"column:tag_count"`
}
