import { createFileRoute } from '@tanstack/react-router';
import TopNavigationBar from '#/components/layout/TopNavigationBar';
import FontLoader from '#/components/ui/FontLoader';
import GradientBlurImage from '#/components/ui/GradientBlurImage';

export const Route = createFileRoute('/')({ component: Home });

function Home() {
	return (
		<>
			<FontLoader
				href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap"
				id="GreatVibes"
			/>
			<TopNavigationBar />
			<GradientBlurImage imageUrl="/bochi.png" />
		</>
	);
}
