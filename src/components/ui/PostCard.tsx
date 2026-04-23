type PostCardProps = {
	title?: string;
	summary?: string;
	coverImageUrl?: string;
	coverImageAlt?: string;
	eyebrow?: string;
};

export default function PostCard({
	title = '在玻璃感界面里组织一篇舒服的文章卡片',
	summary = '左侧可以放封面，右侧展示标题和简述。在没有封面图时，卡片会自然回退到纯文本布局，依旧保持统一的视觉风格。',
	coverImageUrl,
	coverImageAlt = '文章封面',
	eyebrow = 'POST'
}: PostCardProps) {
	const hasCover = Boolean(coverImageUrl);

	return (
		<article className="w-full overflow-hidden rounded-3xl border border-white/60 bg-white/85 shadow-xl backdrop-blur-md transition-all duration-200 hover:-translate-y-0.5 hover:shadow-2xl">
			<div className="flex min-h-36">
				{hasCover ? (
					<div className="w-28 shrink-0 border-r border-white/60 bg-primary/5 sm:w-32 md:w-40">
						<img
							alt={coverImageAlt}
							className="h-full w-full object-cover"
							src={coverImageUrl}
						/>
					</div>
				) : null}

				<div className="flex min-w-0 flex-1 flex-col justify-center gap-3 p-5 md:p-6">
					<div className="text-xs font-medium tracking-widest text-primary/55">
						{eyebrow}
					</div>
					<h2 className="line-clamp-2 text-lg font-semibold text-primary md:text-xl">
						{title}
					</h2>
					<p className="line-clamp-3 text-sm leading-6 text-primary/65 md:text-base">
						{summary}
					</p>
				</div>
			</div>
		</article>
	);
}
