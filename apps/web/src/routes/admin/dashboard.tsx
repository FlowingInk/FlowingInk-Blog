import { Button } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { createFileRoute, Link } from '@tanstack/react-router';
import { ArrowSquareOutIcon, ArticleIcon, CheckCircleIcon, NotePencilIcon, PencilSimpleIcon, StackIcon } from '@phosphor-icons/react';
import { getPostList } from '#/api/postList';
import ThemeToggleButton from '#/components/ui/base/ThemeToggleButton';

export const Route = createFileRoute('/admin/dashboard')({
	component: Dashboard
});

const MOCK_PUBLISHED = 8;
const MOCK_DRAFTS = 4;

function Dashboard() {
	const { data, isLoading } = useQuery({
		queryKey: ['posts', 1, 5],
		queryFn: () => getPostList(1, 5)
	});

	const stats = [
		{ label: '文章总数', value: data?.total ?? '—', icon: ArticleIcon, iconClass: 'bg-white/70 text-primary' },
		{ label: '已发布', value: MOCK_PUBLISHED, icon: CheckCircleIcon, iconClass: 'bg-white/70 text-primary' },
		{ label: '草稿', value: MOCK_DRAFTS, icon: PencilSimpleIcon, iconClass: 'bg-white/70 text-primary' }
	];

	return (
		<div className="space-y-8">
			<div className="flex items-center justify-between">
				<h1 className="text-xl font-semibold text-primary">概览</h1>
				<ThemeToggleButton />
			</div>

			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				{stats.map((s) => (
					<div key={s.label} className="flex items-center gap-4 rounded-3xl border border-white/60 bg-white/85 p-5 shadow-xl backdrop-blur-md">
						<div className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${s.iconClass}`}>
							<s.icon size={22} />
						</div>
						<div>
							<p className="text-xs text-primary/40">{s.label}</p>
							<p className="text-2xl font-semibold text-primary">{s.value}</p>
						</div>
					</div>
				))}
			</div>

			<div className="overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-xl backdrop-blur-md">
				<div className="border-b border-white/60 px-6 py-4">
					<h2 className="text-sm font-semibold text-primary">最近文章</h2>
				</div>
				<div className="overflow-x-auto">
					{isLoading ? (
						<p className="px-6 py-8 text-sm text-primary/40">加载中...</p>
					) : !data?.data?.length ? (
						<p className="px-6 py-8 text-sm text-primary/40">暂无文章</p>
					) : (
						<table className="w-full text-sm">
							<thead>
								<tr className="border-b border-white/60 text-left text-xs text-primary/40">
									<th className="px-6 py-3 font-medium">标题</th>
									<th className="px-6 py-3 font-medium">摘要</th>
									<th className="px-6 py-3 font-medium">发布时间</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-white/40">
								{data.data.map((post) => (
									<tr key={post.slug} className="transition-colors hover:bg-white/50">
										<td className="max-w-48 truncate px-6 py-3 font-medium text-primary">{post.title}</td>
										<td className="max-w-64 truncate px-6 py-3 text-primary/60">{post.summary}</td>
										<td className="whitespace-nowrap px-6 py-3 text-primary/40">{post.publishedAt}</td>
									</tr>
								))}
							</tbody>
						</table>
					)}
				</div>
			</div>
			<div className="rounded-3xl border border-white/60 bg-white/85 shadow-xl backdrop-blur-md">
				<div className="border-b border-white/60 px-6 py-4">
					<h2 className="text-sm font-semibold text-primary">快捷操作</h2>
				</div>
				<div className="grid grid-cols-1 divide-y divide-white/40 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
					<Link
						to="/"
						target="_blank"
						className="flex items-center gap-4 px-6 py-5 transition-colors hover:bg-white/50"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-primary">
							<ArrowSquareOutIcon size={20} />
						</div>
						<div>
							<p className="text-sm font-medium text-primary">查看前台</p>
							<p className="text-xs text-primary/40">预览博客前台页面</p>
						</div>
					</Link>
					<Button
						disabled
						className="flex w-full items-center gap-4 px-6 py-5 transition-colors hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-primary">
							<NotePencilIcon size={20} />
						</div>
						<div className="text-left">
							<p className="text-sm font-medium text-primary">新建文章</p>
							<p className="text-xs text-primary/40">开始写一篇新文章</p>
						</div>
					</Button>
					<Button
						disabled
						className="flex w-full items-center gap-4 px-6 py-5 transition-colors hover:bg-white/50 disabled:cursor-not-allowed disabled:opacity-50"
					>
						<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/70 text-primary">
							<StackIcon size={20} />
						</div>
						<div className="text-left">
							<p className="text-sm font-medium text-primary">管理文章</p>
							<p className="text-xs text-primary/40">查看和管理所有文章</p>
						</div>
					</Button>
				</div>
			</div>
		</div>
	);
}
