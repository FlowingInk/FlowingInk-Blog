import type { ReactNode } from 'react';
import Fade from './Fade';

export default function GradientBlurImage({
	imageUrl,
	children
}: {
	imageUrl: string;
	children?: ReactNode;
}) {
	return (
		<div className="relative hidden overflow-hidden md:block">
			<Fade enter="transition-opacity duration-1000">
				<img alt="Bochi" className="h-120 w-full object-cover object-center lg:h-144" src={imageUrl} />
			</Fade>
			{children}
			<div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,transparent_50%,rgba(240,240,240,0.5)_60%,rgb(240,240,240)_90%,rgb(255,255,255)_100%)]" />
		</div>
	);
}
