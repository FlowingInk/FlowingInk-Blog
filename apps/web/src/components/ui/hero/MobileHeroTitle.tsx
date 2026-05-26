export default function MobileHeroTitle({ title }: { title: string }) {
	return (
		<div className="absolute inset-0 z-20">
			<div className="flex h-full w-full items-start justify-start pt-28">
				<div className="flex items-start border-b border-primary py-4 px-4 mx-auto text-4xl text-primary">
					{title}
				</div>
			</div>
		</div>
	);
}
