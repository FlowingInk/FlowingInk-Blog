import { request } from './client';

export interface PostItem {
	slug: string;
	title: string;
	summary: string;
	coverImageUrl: string;
	eyebrow: string;
	publishedAt: string;
}

export interface PostListResponse {
	postItem: PostItem[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export function getPostList(page: number, pageSize = 10): Promise<PostListResponse> {
	return request<PostListResponse>(`/api/posts?page=${page}&pageSize=${pageSize}`);
}
