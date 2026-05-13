package jwt

import (
	"context"
	"errors"
	"time"

	"github.com/golang-jwt/jwt/v5"
)

type TokenPair struct {
	AccessToken  string
	RefreshToken string
	AccessExpire time.Duration
}

type Manager interface {
	GenerateTokenPair(userID uint, userName, role string) (*TokenPair, error)
	ParseAccessToken(token string) (*CustomClaims, error)
	ParseRefreshToken(token string) (*CustomClaims, error)
	RefreshTokenPair(token string) (*TokenPair, error)
}

type jwtManager struct {
	opts Options
}

type contextKey struct{}

func NewJWTManager(opts ...Option) Manager {
	o := DefaultOption()
	for _, opt := range opts {
		opt(&o)
	}
	return &jwtManager{opts: o}
}

func NewContext(ctx context.Context, claims *CustomClaims) context.Context {
	return context.WithValue(ctx, contextKey{}, claims)
}

func FromContext(ctx context.Context) (*CustomClaims, bool) {
	claims, ok := ctx.Value(contextKey{}).(*CustomClaims)
	return claims, ok
}

func (j *jwtManager) sign(claims *CustomClaims, secret string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	return token.SignedString([]byte(secret))
}

func (m *jwtManager) parse(tokenStr, secret string) (*CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenStr, &CustomClaims{}, func(t *jwt.Token) (interface{}, error) {
		// 验证签名算法，防止 alg:none 攻击
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, ErrSigningMethod
		}
		return []byte(secret), nil
	})
	if err != nil {
		// 将 jwt 库错误映射为业务错误
		switch {
		case errors.Is(err, jwt.ErrTokenExpired):
			return nil, ErrTokenExpired
		case errors.Is(err, jwt.ErrTokenMalformed):
			return nil, ErrTokenMalformed
		default:
			return nil, ErrTokenInvalid
		}
	}

	claims, ok := token.Claims.(*CustomClaims)
	if !ok || !token.Valid {
		return nil, ErrTokenInvalid
	}
	return claims, nil
}

func (j *jwtManager) ParseAccessToken(tokenStr string) (*CustomClaims, error) {
	return j.parse(tokenStr, j.opts.AccessSecret)
}

func (j *jwtManager) ParseRefreshToken(tokenStr string) (*CustomClaims, error) {
	return j.parse(tokenStr, j.opts.RefreshSecret)
}

func (j *jwtManager) RefreshTokenPair(refreshTokenStr string) (*TokenPair, error) {
	claims, err := j.ParseRefreshToken(refreshTokenStr)
	if err != nil {
		return nil, err
	}
	//TODO 刷新token需要现场查用户名和权限来生成通行token
	return j.GenerateTokenPair(claims.ID, claims.Name, claims.Role)
}

func (j *jwtManager) GenerateTokenPair(userID uint, userName, role string) (*TokenPair, error) {
	now := time.Now()
	accessClaims := &CustomClaims{
		ID:   userID,
		Name: userName,
		Role: role,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    j.opts.Issuer,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(j.opts.AccessExpire)),
		},
	}

	refreshClaims := &CustomClaims{
		ID: userID,
		RegisteredClaims: jwt.RegisteredClaims{
			Issuer:    j.opts.Issuer,
			IssuedAt:  jwt.NewNumericDate(now),
			ExpiresAt: jwt.NewNumericDate(now.Add(j.opts.RefreshExpire)),
		},
	}

	accessToken, err := j.sign(accessClaims, j.opts.AccessSecret)
	if err != nil {
		return nil, err
	}
	refreshToken, err := j.sign(refreshClaims, j.opts.RefreshSecret)
	if err != nil {
		return nil, err
	}

	return &TokenPair{
		AccessToken:  accessToken,
		RefreshToken: refreshToken,
		AccessExpire: time.Duration(now.Add(j.opts.AccessExpire).Unix()),
	}, nil
}
