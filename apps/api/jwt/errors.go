package jwt

import "errors"

var (
	ErrTokenExpired   = errors.New("token expired")
	ErrTokenInvalid   = errors.New("token invalid")
	ErrTokenNotFound  = errors.New("token not found")
	ErrTokenMalformed = errors.New("token malformed")
	ErrTokenSignature = errors.New("token signature invalid")
	ErrSigningMethod  = errors.New("unexpected signing method")
	ErrClaimsInvalid  = errors.New("claims invalid")
)
