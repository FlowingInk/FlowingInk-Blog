import { request } from './client';

export interface ProfileData {
	postCount: number;
	categoryCount: number;
	tagCount: number;
}

export function getProfile(id: string): Promise<ProfileData> {
	return request<ProfileData>('/api/profile', {
		method: 'POST',
		body: { id }
	});
}
