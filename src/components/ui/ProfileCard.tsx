import { useState } from 'react';
import Fade from './Fade';

type ProfileCardProps = {
	avatarUrl?: string;
	name?: string;
	subtitle?: string;
	postCount?: number;
	categoryCount?: number;
	tagCount?: number;
	githubUrl?: string;
	bilibiliUrl?: string;
};

type StatItemProps = {
	label: string;
	value: number;
};

function StatItem({ label, value }: StatItemProps) {
	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl bg-white/70 px-3 py-2 backdrop-blur-sm">
			<span className="border-b border-black/15 pb-1 text-sm font-medium tracking-wide text-primary">
				{label}
			</span>
			<span className="pt-1 text-lg font-semibold text-primary">{value}</span>
		</div>
	);
}

export default function ProfileCard({
	avatarUrl = '/bochi.png',
	name = '流光墨佰',
	subtitle = "FlowingInk's Blog",
	githubUrl = 'https://github.com/FlowingInk',
	bilibiliUrl = 'https://space.bilibili.com/382514723'
}: ProfileCardProps) {
	const [postCount, setPostCount] = useState<number>(0);
	const [categoryCount, setCategoryCount] = useState<number>(0);
	const [tagCount, setTagCount] = useState<number>(0);
	return (
		<Fade enter="transition-opacity duration-700" as="div">
			<div className="w-full max-w-sm rounded-3xl border border-white/50 bg-white/85 p-5 shadow-[0_20px_50px_rgba(255,130,140,0.18)] backdrop-blur-md">
				<div className="flex items-start gap-4">
					<img
						alt={name}
						className="w-20 h-20 rounded-full border-2 border-white object-cover shadow-md"
						src={avatarUrl}
					/>
					<div className="min-w-0 flex-1 pt-1">
						<div className="truncate text-2xl font-semibold tracking-wide text-primary">
							{name}
						</div>
						<div className="truncate text-sm font-medium text-primary/70">
							{subtitle}
						</div>
					</div>
				</div>

				<div className="mt-5 flex gap-2.5">
					<StatItem label="文章" value={postCount} />
					<StatItem label="分类" value={categoryCount} />
					<StatItem label="标签" value={tagCount} />
				</div>

				<div className="mt-5 flex items-center justify-between gap-3">
					<div className="text-xs font-medium tracking-[0.2em] text-primary/55">
						WELCOME TO MY SPACE
					</div>
					<div className="flex items-center gap-2">
						<a
							className="inline-flex h-10 items-center justify-center rounded-full border border-primary/15 bg-white/70 px-3 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
							href={githubUrl}
							rel="noreferrer"
							target="_blank"
						>
							GitHub
						</a>
						<a
							className="inline-flex h-10 items-center justify-center rounded-full border border-primary/15 bg-white/70 px-3 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
							href={bilibiliUrl}
							rel="noreferrer"
							target="_blank"
						>
							Bilibili
						</a>
					</div>
				</div>
			</div>
		</Fade>
	);
}
