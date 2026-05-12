import { useQuery } from '@tanstack/react-query';
import { getPostList } from '#/api/postList';

export function usePostList(page: number, pageSize = 10) {
	return useQuery({
		queryKey: ['postList', page, pageSize],
		queryFn: () => getPostList(page, pageSize)
	});
}
