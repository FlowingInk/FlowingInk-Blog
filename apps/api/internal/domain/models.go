package domain

func Models() []any {
	return []any{
		&User{},
		&Author{},
		&Category{},
		&Tag{},
		&Topic{},
		&Post{},
	}
}
