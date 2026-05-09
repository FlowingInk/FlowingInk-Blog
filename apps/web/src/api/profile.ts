import { request } from './client';

export interface ProfileData {
  postCount: number;
  categoryCount: number;
  tagCount: number;
}

export function getProfile(id: string) {
  return request<{ data: ProfileData }>('/api/profile', {
    method: 'POST',
    body: { id },
  });
}
