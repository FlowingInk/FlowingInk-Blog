import { GithubLogoIcon } from '@phosphor-icons/react/dist/ssr';
import { useProfile } from '#/hooks/useProfile';
import Fade from '../base/Fade';

type ProfileCardProps = {
	avatarUrl?: string;
	name?: string;
	subtitle?: string;
	githubUrl?: string;
	bilibiliUrl?: string;
};

type StatItemProps = {
	label: string;
	value: number;
};

function StatItem({ label, value }: StatItemProps) {
	return (
		<div className="flex min-w-0 flex-1 flex-col items-center justify-center rounded-xl bg-white/70 px-4 py-3 backdrop-blur-sm">
			<span className="border-b border-black/15 pb-1 text-base font-medium tracking-wide text-primary">
				{label}
			</span>
			<span className="pt-1 text-xl font-semibold text-primary">{value}</span>
		</div>
	);
}

export default function ProfileCard({
	avatarUrl = '/bochi-avatar.jpg',
	githubUrl = 'https://github.com/FlowingInk'
}: ProfileCardProps) {
	const { data } = useProfile('1');
	const postCount = data?.postCount ?? 0;
	const categoryCount = data?.categoryCount ?? 0;
	const tagCount = data?.tagCount ?? 0;

	return (
		<Fade enter="transition-opacity duration-700" as="div">
			<div className="w-full max-w-100 rounded-3xl border border-white/50 bg-white/85 p-7 shadow-[0_20px_50px_var(--shadow-color)] backdrop-blur-md">
				<div className="flex items-center justify-center gap-3">
					<img
						alt={'avatar'}
						className="h-24 w-24 rounded-full border-2 border-white object-cover shadow-md"
						src={avatarUrl}
					/>
				</div>

				<div className="mt-6 flex gap-4">
					<StatItem label="文章" value={postCount} />
					<StatItem label="分类" value={categoryCount} />
					<StatItem label="标签" value={tagCount} />
				</div>

				<div className="mt-6 flex flex-col items-center justify-between gap-4">
					<div className="text-sm font-medium tracking-[0.18em] text-primary/55">
						WELCOME TO MY SPACE
					</div>
					<div className="flex items-center gap-2">
						<a
							className="mr-6 inline-flex h-12 items-center justify-center rounded-full border border-primary/15 bg-white/70 px-4 text-base font-medium text-primary transition-colors duration-200 hover:bg-primary/8"
							href={githubUrl}
							rel="noreferrer"
							target="_blank"
						>
							<GithubLogoIcon size={24} />
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
