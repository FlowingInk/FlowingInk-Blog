package user

import (
	"errors"

	"FlowingInk-Blog/internal/domain"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type UserService struct {
	Repo UserRepo
}

func NewUserService(repo UserRepo) *UserService {
	return &UserService{Repo: repo}
}

func (s *UserService) HashPassword(password string) (string, error) {
	bytes, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(bytes), nil
}

func (s *UserService) VerifyPassword(passwordHash, password string) bool {
	err := bcrypt.CompareHashAndPassword([]byte(passwordHash), []byte(password))
	return err == nil
}

func (s *UserService) Register(email, password string) error {
	hashed, err := s.HashPassword(password)
	if err != nil {
		return err
	}

	user := &domain.User{
		Email:        email,
		PasswordHash: hashed,
	}

	if err := s.Repo.CreateUser(user); err != nil {
		if errors.Is(err, gorm.ErrDuplicatedKey) {
			return errors.New("email already exists")
		}
		return err
	}
	return nil
}

func (s *UserService) Login(email, password string) (*domain.User, error) {
	user, err := s.Repo.GetUserByEmail(email)
	if err != nil {
		if errors.Is(err, gorm.ErrRecordNotFound) {
			return nil, errors.New("invalid email or password")
		}
		return nil, err
	}

	if !s.VerifyPassword(user.PasswordHash, password) {
		return nil, errors.New("invalid email or password")
	}
	return user, nil
}
