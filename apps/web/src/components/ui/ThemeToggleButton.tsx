import { PaintBrushIcon } from '@phosphor-icons/react';
import { useTheme } from './useTheme';

export default function ThemeToggleButton() {
	const { theme, toggle } = useTheme();

	return (
		<button
			type="button"
			onClick={toggle}
			aria-label="切换主题色"
			title={theme === 'bochi' ? '切换到蓝色主题' : '切换到粉色主题'}
			className="flex size-8 items-center justify-center rounded-full text-primary transition-all hover:bg-primary/10 active:scale-95 active:bg-primary/20 md:size-9"
		>
			<PaintBrushIcon />
		</button>
	);
}
