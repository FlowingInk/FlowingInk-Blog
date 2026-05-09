package profile

import (
	"fmt"
)

type ProfileService struct {
	authorRepo AuthorRepo
}

func NewProfileService(authorRepo AuthorRepo) *ProfileService {
	return &ProfileService{authorRepo: authorRepo}
}

func (s *ProfileService) GetProfileInfo(id string) (ProfileStats, error) {
	stats, err := s.authorRepo.GetStats(id)
	if err != nil {
		return ProfileStats{}, fmt.Errorf("get stats failed: %w", err)
	}
	return stats, nil
}
