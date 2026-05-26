import { createFileRoute } from '@tanstack/react-router';
import TopNavigationBar from '#/components/layout/TopNavigationBar';
import FontLoader from '#/components/ui/base/FontLoader';
import PostCard from '#/components/ui/blog/PostCard';
// import PostList from '#/components/ui/blog/PostList';
import ProfileCard from '#/components/ui/blog/ProfileCard';
import GradientBlurImage from '#/components/ui/hero/GradientBlurImage';
import HeroTitleOverlay from '#/components/ui/hero/HeroTitleOverlay';
import MobileHeroTitle from '#/components/ui/hero/MobileHeroTitle';
import { useTheme } from '#/hooks/useTheme';

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
				{/* pc端 heroTitle */}
				<div className="hidden md:block">
					<HeroTitleOverlay />
				</div>
				{/* moblie端 */}
				<div className="md:hidden">
					<MobileHeroTitle title="博客" />
				</div>
			</GradientBlurImage>
			<div className="relative z-10 mx-auto max-w-380 -mt-60 flex flex-row items-start gap-20 px-6 md:-mt-24 lg:px-10">
				<div className="w-full shrink-0 md:w-auto hidden md:flex">
					<ProfileCard />
				</div>
				<div className="min-w-0 flex-1 flex flex-col gap-6">
					{/*<PostList page={1} pageSize={10} />*/}
					<PostCard title="这是一个文章" summary="你好，这是一个文章" coverImageUrl="" />
				</div>
			</div>
		</>
	);
}
