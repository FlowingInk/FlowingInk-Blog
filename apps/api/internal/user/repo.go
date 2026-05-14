package user

import (
	"FlowingInk-Blog/internal/domain"

	"gorm.io/gorm"
)

type UserRepo interface {
	GetUserByEmail(email string) (*domain.User, error)
	CreateUser(user *domain.User) error
}

type UserRepoGorm struct {
	DB *gorm.DB
}

func NewUserRepo(db *gorm.DB) UserRepo {
	return &UserRepoGorm{DB: db}
}

func (r *UserRepoGorm) GetUserByEmail(email string) (*domain.User, error) {
	var user domain.User
	if err := r.DB.Where("email = ?", email).First(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func (r *UserRepoGorm) CreateUser(user *domain.User) error {
	return r.DB.Create(user).Error
}
