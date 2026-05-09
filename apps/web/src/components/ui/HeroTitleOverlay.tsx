import Fade from './Fade';

type HeroTitleOverlayProps = {
	title?: string;
	subtitle?: string;
};

export default function HeroTitleOverlay({
	title = '流光墨佰',
	subtitle = "FlowingInk's Blog"
}: HeroTitleOverlayProps) {
	return (
		<Fade
			as="div"
			enter="transition-opacity duration-[1700ms] ease-out"
			enterFrom="opacity-0"
			enterTo="opacity-100"
		>
			<div className="absolute inset-0 z-10">
				<div className="mx-auto flex h-full w-full max-w-380 items-start px-6 pt-28 md:pt-36 lg:px-10 lg:pt-44">
					<div className="w-fit rounded-4xl border border-white/10 bg-white/4 px-6 py-5 text-white shadow-[0_0_24px_rgba(0,0,0,0.18)] backdrop-blur-md lg:px-10 lg:py-7">
						<div className="whitespace-nowrap flex justify-center border-b border-white/70 pb-2 text-right text-2xl font-light tracking-wide text-white drop-shadow-sm lg:text-4xl">
							{title}
						</div>
						<div className="whitespace-nowrap flex justify-center pt-3 text-right text-xs font-light tracking-[0.14em] text-white/90 lg:text-lg">
							{subtitle}
						</div>
					</div>
				</div>
			</div>
		</Fade>
	);
}
