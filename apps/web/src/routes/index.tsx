import { createFileRoute } from '@tanstack/react-router';
import TopNavigationBar from '#/components/layout/TopNavigationBar';
import FontLoader from '#/components/ui/FontLoader';
import GradientBlurImage from '#/components/ui/GradientBlurImage';
import HeroTitleOverlay from '#/components/ui/HeroTitleOverlay';
import ProfileCard from '#/components/ui/ProfileCard';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return (
		<>
			<FontLoader
				href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
				id="GreatVibes"
			/>
			<TopNavigationBar />
			<GradientBlurImage imageUrl="/bochi.png">
				<HeroTitleOverlay />
			</GradientBlurImage>
			<div className="relative mx-auto max-w-380 z-10 -mt-24 hidden w-full px-6 md:flex lg:px-10">
				<ProfileCard />
			</div>
		</>
	);
}
