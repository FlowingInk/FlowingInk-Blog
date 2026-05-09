package domain

func Models() []any {
	return []any{
		&Author{},
		&Category{},
		&Tag{},
		&Topic{},
		&Post{},
	}
}
