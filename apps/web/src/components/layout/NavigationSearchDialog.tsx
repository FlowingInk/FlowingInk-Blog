import { Button, Dialog, DialogPanel, Transition, TransitionChild } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@phosphor-icons/react';
import { type ChangeEvent, useMemo, useState } from 'react';
import type { NavigationItem } from './navigationItems';

type NavigationSearchDialogProps = {
	items: NavigationItem[];
	isOpen: boolean;
	onClose: () => void;
};

export default function NavigationSearchDialog({
	items,
	isOpen,
	onClose
}: NavigationSearchDialogProps) {
	const [searchQuery, setSearchQuery] = useState('');

	const filteredItems = useMemo(() => {
		const keyword = searchQuery.trim().toLowerCase();

		if (!keyword) {
			return items;
		}

		return items.filter((item) => {
			return (
				item.label.toLowerCase().includes(keyword) ||
				item.href.toLowerCase().includes(keyword)
			);
		});
	}, [items, searchQuery]);

	const handleClose = () => {
		setSearchQuery('');
		onClose();
	};

	const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearchQuery(event.target.value);
	};

	return (
		<Transition show={isOpen}>
			<Dialog className="relative z-70" onClose={handleClose}>
				<TransitionChild
					as="div"
					enter="transition-opacity duration-200 ease-out"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="transition-opacity duration-150 ease-in"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black/25 backdrop-blur-sm" />
				</TransitionChild>

				<div className="fixed inset-0 overflow-y-auto p-4 pt-20 md:p-6 md:pt-24">
					<div className="mx-auto w-full max-w-2xl">
						<TransitionChild
							as="div"
							enter="transform transition duration-200 ease-out"
							enterFrom="translate-y-3 opacity-0 scale-98"
							enterTo="translate-y-0 opacity-100 scale-100"
							leave="transform transition duration-150 ease-in"
							leaveFrom="translate-y-0 opacity-100 scale-100"
							leaveTo="translate-y-3 opacity-0 scale-98"
						>
							<DialogPanel className="overflow-hidden rounded-[28px] border border-white/60 bg-white/92 shadow-[0_24px_80px_rgba(0,0,0,0.15)] backdrop-blur-xl">
								<div className="flex items-center gap-3 border-b border-black/5 px-4 py-4 md:px-5">
									<div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10 text-primary">
										<MagnifyingGlassIcon />
									</div>
									<input
										autoFocus
										value={searchQuery}
										onChange={handleChange}
										placeholder="搜索页面、栏目或关键词..."
										className="h-11 w-full border-none bg-transparent text-base text-zinc-800 outline-none placeholder:text-zinc-400"
									/>
									<Button
										type="button"
										onClick={handleClose}
										className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-2xl text-primary transition-all active:scale-95 active:bg-primary/15"
									>
										<span aria-hidden="true">×</span>
									</Button>
								</div>

								<div className="px-4 py-4 md:px-5 md:py-5">
									<div className="mb-3 text-xs font-medium tracking-[0.24em] text-primary/55">
										QUICK SEARCH
									</div>
									<div className="flex flex-col gap-2">
										{filteredItems.length > 0 ? (
											filteredItems.map((item) => {
												return (
													<a
														key={item.label}
														href={item.href}
														onClick={handleClose}
														className="flex items-center justify-between rounded-2xl border border-primary/8 bg-white/70 px-4 py-3 text-primary transition-colors duration-200 hover:bg-primary/6 active:bg-primary/10"
													>
														<div>
															<div className="text-sm font-semibold">
																{item.label}
															</div>
															<div className="text-xs text-primary/55">
																{item.href}
															</div>
														</div>
														<MagnifyingGlassIcon className="text-primary/45" />
													</a>
												);
											})
										) : (
											<div className="rounded-2xl border border-dashed border-primary/15 bg-primary/3 px-4 py-5 text-sm text-primary/65">
												没有找到和 “{searchQuery}” 相关的内容。
											</div>
										)}
									</div>
								</div>
							</DialogPanel>
						</TransitionChild>
					</div>
				</div>
			</Dialog>
		</Transition>
	);
}
