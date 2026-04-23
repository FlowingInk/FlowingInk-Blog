import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
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
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl bg-white/70 px-2.5 py-1.5 backdrop-blur-sm">
			<span className="border-b border-black/15 pb-1 text-xs font-medium tracking-wide text-primary">
				{label}
			</span>
			<span className="pt-1 text-base font-semibold text-primary">{value}</span>
		</div>
	);
}

export default function ProfileCard({
	avatarUrl = '/bochi-avatar.jpg',
	name = '流光墨佰',
	githubUrl = 'https://github.com/FlowingInk',
	bilibiliUrl = 'https://space.bilibili.com/382514723'
}: ProfileCardProps) {
	const [postCount, setPostCount] = useState<number>(0);
	const [categoryCount, setCategoryCount] = useState<number>(0);
	const [tagCount, setTagCount] = useState<number>(0);
	return (
		<Fade enter="transition-opacity duration-700" as="div">
			<div className="w-full max-w-80 rounded-3xl border border-white/50 bg-white/85 p-5 shadow-[0_20px_50px_rgba(255,130,140,0.18)] backdrop-blur-md">
				<div className="flex items-center justify-center gap-3">
					<img
						alt={name}
						className="h-16 w-16 rounded-full border-2 border-white object-cover shadow-md"
						src={avatarUrl}
					/>
				</div>

				<div className="mt-4 flex gap-2">
					<StatItem label="文章" value={postCount} />
					<StatItem label="分类" value={categoryCount} />
					<StatItem label="标签" value={tagCount} />
				</div>

				<div className="mt-4 flex flex-col items-center justify-between gap-2">
					<div className="text-[10px] font-medium tracking-[0.18em] text-primary/55">
						WELCOME TO MY SPACE
					</div>
					<div className="flex items-center gap-2">
						<a
							className="mr-6 inline-flex h-8 items-center justify-center rounded-full border border-primary/15 bg-white/70 px-2.5 text-xs font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
							href={githubUrl}
							rel="noreferrer"
							target="_blank"
						>
							<GithubLogoIcon size={16} />
						</a>
						{/*<a
							className="inline-flex h-10 items-center justify-center rounded-full border border-primary/15 bg-white/70 px-3 text-sm font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
							href={bilibiliUrl}
							rel="noreferrer"
							target="_blank"
						>
							Bilibili
						</a>*/}
					</div>
				</div>
			</div>
		</Fade>
	);
}
