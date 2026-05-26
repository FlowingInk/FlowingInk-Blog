import { request } from './client';

interface RegisterReq {
	email: string;
	password: string;
}

interface LoginReq {
	email: string;
	password: string;
}

interface LoginResp {
	access_token: string;
	refresh_token: string;
}

export function register(data: RegisterReq) {
	return request<{ message: string }>('/api/register', {
		method: 'POST',
		body: data
	});
}

export function login(data: LoginReq) {
	return request<LoginResp>('/api/login', {
		method: 'POST',
		body: data
	});
}
