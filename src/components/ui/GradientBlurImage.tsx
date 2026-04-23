import Fade from './Fade';

export default function GradientBlurImage({ imageUrl }: { imageUrl: string }) {
	return (
		<div className="relative overflow-hidden">
			<Fade enter="transition-opacity duration-1000">
				<img alt="Bochi" className="h-full w-full object-cover" src={imageUrl} />
			</Fade>
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,rgba(240,240,240,0.4)_70%,rgb(240,240,240)_100%)]" />
		</div>
	);
}
