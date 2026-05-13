package jwt

import "github.com/golang-jwt/jwt/v5"

type CustomClaims struct {
	ID   uint   `json:"id"`
	Name string `json:"name"`
	Role string `json:"role"`

	jwt.RegisteredClaims
}
