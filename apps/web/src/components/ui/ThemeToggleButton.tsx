import { PaintBrushIcon } from '@phosphor-icons/react';
import { useTheme } from './useTheme';

export default function ThemeToggleButton() {
	const { theme, toggle, backgroundUrl } = useTheme();

	return (
		<button
			type="button"
			onClick={() => {
				toggle();
				console.log(backgroundUrl);
			}}
			aria-label="切换主题色"
			title={theme === 'bochi' ? '切换到蓝色主题' : '切换到粉色主题'}
			className="flex h-8 items-center gap-2 justify-center border border-primary/15 shadow-sm rounded-full px-2 text-primary text-sm font-medium transition-all bg-white/70 hover:bg-white/85 active:scale-95 md:h-9"
		>
			<PaintBrushIcon />
			<span>主题</span>
		</button>
	);
}
