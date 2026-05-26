import type { PostItem } from '#/api/postList';
import { usePostList } from '#/hooks/usePostList';
import PostCard from './PostCard';

export default function PostList({ page, pageSize }: { page: number; pageSize?: number }) {
	const { data } = usePostList(page, pageSize);

	return (
		<div className="flex flex-col gap-6">
			{data?.postItem?.map((post: PostItem) => (
				<PostCard {...post} key={post.slug} />
			))}
		</div>
	);
}
