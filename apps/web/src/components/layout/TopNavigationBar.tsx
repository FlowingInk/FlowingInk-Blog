import { Button } from '@headlessui/react';
import { DotsThreeOutlineVerticalIcon, MagnifyingGlassIcon } from '@phosphor-icons/react';
import { type ReactElement, useState } from 'react';
import HideOnScroll from '../behavior/HideOnScroll';
import ThemeToggleButton from '../ui/base/ThemeToggleButton';
import MobileNavigationSidebar from './MobileNavigationSidebar';
import NavigationSearchDialog from './NavigationSearchDialog';
import { navItems } from './navigationItems';

interface Props {
	window?: () => Window;
	children?: ReactElement<unknown>;
}

export default function TopNavigationBar(props: Props) {
	const [isSidebarOpen, setIsSidebarOpen] = useState(false);
	const [isSearchOpen, setIsSearchOpen] = useState(false);

	return (
		<div>
			<HideOnScroll {...props}>
				<nav className="fixed inset-x-0 top-0 z-50 h-12 w-full border-none shadow-sm backdrop-blur-md backdrop-saturate-150 md:h-14 lg:h-16">
					<div className="relative flex h-full items-center">
						<div className="hidden w-full justify-center gap-3.5 md:flex">
							{navItems.map((item) => {
								return (
									<a
										key={item.label}
										href={item.href}
										className="flex w-19 items-center justify-center rounded-none text-sm font-semibold tracking-widest
										text-primary transition-all duration-200
										hover:text-primary/60
										active:scale-95 active:text-primary/50"
									>
										{item.label}
									</a>
								);
							})}
						</div>
						<div className="absolute right-4 hidden md:flex md:items-center md:gap-5">
							<div className="hidden md:flex">
								<ThemeToggleButton />
							</div>
							<Button
								type="button"
								onClick={() => setIsSearchOpen(true)}
								className="flex h-9 items-center gap-2 rounded-full border border-primary/15 bg-white/70 px-3 text-sm font-medium text-primary shadow-sm backdrop-blur-sm transition-all hover:bg-white/85 active:scale-95"
							>
								<MagnifyingGlassIcon className="text-primary" />
								<span>搜索</span>
							</Button>
						</div>
						{/* moblie端ui */}
						<div className="flex w-full items-center justify-between p-2 md:hidden">
							<div>
								<img
									src="/bochi-avatar.jpg"
									alt="bochi"
									className="h-8 w-8 rounded-full border-2 border-primary"
								/>
							</div>
							<div className="absolute left-1/2 -translate-x-1/2 text-primary ">
								<h1
									className="font-semibold tracking-wide"
									style={{ fontFamily: 'Great Vibes' }}
								>
									FlowingInk's Blog
								</h1>
							</div>
							<div className="flex flex-row gap-4">
								<Button
									type="button"
									onClick={() => setIsSearchOpen(true)}
									className="flex size-8 items-center justify-center rounded-full transition-all active:scale-95 active:bg-primary/20"
								>
									<MagnifyingGlassIcon className="text-primary" />
								</Button>
								<Button
									type="button"
									onClick={() => setIsSidebarOpen(true)}
									className="flex size-8 items-center justify-center rounded-full transition-all active:scale-95 active:bg-primary/20"
								>
									<DotsThreeOutlineVerticalIcon className="text-primary" />
								</Button>
							</div>
						</div>
					</div>
				</nav>
			</HideOnScroll>
			<NavigationSearchDialog
				items={navItems}
				isOpen={isSearchOpen}
				onClose={() => setIsSearchOpen(false)}
			/>
			<MobileNavigationSidebar
				items={navItems}
				isOpen={isSidebarOpen}
				onClose={() => setIsSidebarOpen(false)}
			/>
		</div>
	);
}
