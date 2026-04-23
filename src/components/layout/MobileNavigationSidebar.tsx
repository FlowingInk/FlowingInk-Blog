import { Button, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { GithubLogoIcon } from '@phosphor-icons/react';
import type { NavigationItem } from './navigationItems';

type MobileNavigationSidebarProps = {
	items: NavigationItem[];
	isOpen: boolean;
	onClose: () => void;
};

export default function MobileNavigationSidebar({
	items,
	isOpen,
	onClose
}: MobileNavigationSidebarProps) {
	return (
		<Transition show={isOpen}>
			<Dialog className="relative z-60 md:hidden" onClose={onClose}>
				<TransitionChild
					as="div"
					enter="transition-opacity duration-300 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-200 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/20 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-hidden">
					<div className="absolute inset-y-0 right-0 flex max-w-full pl-10">
						<TransitionChild
							as="div"
							className="max-w-sm"
							enter="transform transition duration-300 ease-out"
							enterFrom="translate-x-full"
							enterTo="translate-x-0"
							leave="transform transition duration-200 ease-in"
							leaveFrom="translate-x-0"
							leaveTo="translate-x-full"
						>
							<DialogPanel className="flex h-full flex-col bg-white/88 px-5 py-4 shadow-2xl backdrop-blur-xl">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-3">
										<img
											src="/bochi-avatar.jpg"
											alt="bochi"
											className="h-10 w-10 rounded-full border-2 border-primary object-cover"
										/>
										<div>
											<div className="text-sm font-semibold tracking-wide text-primary">
												流光墨佰
											</div>
											<div className="flex gap-2.5 text-xs text-primary/65">
												<Button
													type="button"
													className="flex size-4 items-center justify-center rounded-full border border-primary/15 bg-primary/6 text-primary shadow-sm transition-all duration-200 hover:bg-primary/12 hover:shadow active:scale-95 active:bg-primary/18"
												>
													<GithubLogoIcon size={16} />
												</Button>
											</div>
										</div>
									</div>
									<Button
										type="button"
										onClick={onClose}
										className="flex h-9 w-9 items-center justify-center rounded-full text-2xl text-primary transition-all active:scale-95 active:bg-primary/15"
									>
										<span aria-hidden="true">×</span>
									</Button>
								</div>

								<div className="mt-8 flex flex-col gap-2">
									{items.map((item) => {
										return (
											<a
												key={item.label}
												href={item.href}
												onClick={onClose}
												className="flex items-center justify-between rounded-2xl px-4 py-3 text-base font-medium text-primary transition-colors duration-200 hover:bg-primary/8 active:bg-primary/12"
											>
												<span>{item.label}</span>
												<span className="text-primary/35">/</span>
											</a>
										);
									})}
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
