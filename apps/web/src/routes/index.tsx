import { createFileRoute } from '@tanstack/react-router';
import TopNavigationBar from '#/components/layout/TopNavigationBar';
import FontLoader from '#/components/ui/FontLoader';
import GradientBlurImage from '#/components/ui/GradientBlurImage';
import HeroTitleOverlay from '#/components/ui/HeroTitleOverlay';
import PostList from '#/components/ui/PostList';
import ProfileCard from '#/components/ui/ProfileCard';
import { useTheme } from '#/components/ui/useTheme';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	const { backgroundUrl } = useTheme();

	return (
		<>
			<FontLoader
				href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
				id="GreatVibes"
			/>
			<TopNavigationBar />
			<GradientBlurImage imageUrl={backgroundUrl}>
				<HeroTitleOverlay />
			</GradientBlurImage>
			<div className="relative z-10 mx-auto max-w-380 -mt-24 flex flex-col items-start gap-20 px-6 md:flex-row lg:px-10">
				<div className="w-full shrink-0 md:w-auto hidden md:flex">
					<ProfileCard />
				</div>
				<div className="min-w-0 flex-1 flex flex-col gap-6">
					<PostList page={1} pageSize={10} />
				</div>
			</div>
		</>
	);
}
