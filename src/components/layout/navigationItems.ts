export type NavigationItem = {
	label: string;
	href: string;
};

export const navItems: NavigationItem[] = [
	{ label: '首页', href: '/' },
	{ label: '文章', href: '/#articles' },
	{ label: '专题', href: '/#topics' },
	{ label: '关于', href: '/#about' }
];
