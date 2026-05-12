package domain

import "time"

type UserRole string

const (
	UserRoleAdmin  UserRole = "admin"
	UserRoleEditor UserRole = "editor"
)

type User struct {
	BaseModel
	Email        string     `json:"email"     gorm:"size:255;uniqueIndex;not null"`
	PasswordHash string     `json:"-"         gorm:"size:255;not null"`
	Role         UserRole   `json:"role"      gorm:"size:20;not null;default:'admin'"`
	LastLoginAt  *time.Time `json:"lastLoginAt"`
	IsActive     bool       `json:"isActive"  gorm:"not null;default:true"`
	AuthorID     *uint      `json:"authorId"  gorm:"uniqueIndex"`
	Author       *Author    `json:"author,omitempty" gorm:"foreignKey:AuthorID"`
}
