package jwt

import "time"

type Options struct {
	AccessSecret  string
	RefreshSecret string
	AccessExpire  time.Duration
	RefreshExpire time.Duration
	Issuer        string
}

type Option func(*Options)

func DefaultOption() Options {
	return Options{
		AccessExpire:  2 * time.Hour,
		RefreshExpire: 7 * 24 * time.Hour,
		Issuer:        "FlowingInk-Blog",
	}
}

func WithAccessSecret(secret string) Option {
	return func(o *Options) {
		o.AccessSecret = secret
	}
}

func WithRefreshSecret(secret string) Option {
	return func(o *Options) {
		o.RefreshSecret = secret
	}
}

func WithAccessExpire(expire time.Duration) Option {
	return func(o *Options) {
		o.AccessExpire = expire
	}
}

func WithRefreshExpire(expire time.Duration) Option {
	return func(o *Options) {
		o.RefreshExpire = expire
	}
}

func WithIssuer(issuer string) Option {
	return func(o *Options) {
		o.Issuer = issuer
	}
}
