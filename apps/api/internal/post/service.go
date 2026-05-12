package post

import "fmt"

type PostService struct {
	repo *PostRepoGorm
}

func NewPostService(repo *PostRepoGorm) *PostService {
	return &PostService{repo: repo}
}

func (s *PostService) GetPostList(page, pageSize int) (PostListResponse, error) {
	posts, total, err := s.repo.GetPostList(page, pageSize)
	if err != nil {
		return PostListResponse{}, fmt.Errorf("failed to get post list: %w", err)
	}
	return PostListResponse{
		Data:       posts,
		Total:      total,
		Page:       page,
		PageSize:   pageSize,
		TotalPages: (total + pageSize - 1) / pageSize,
	}, nil
}
