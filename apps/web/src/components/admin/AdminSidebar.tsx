import { Button } from '@headlessui/react';
import { HouseSimpleIcon, SignOutIcon } from '@phosphor-icons/react';
import { Link, useNavigate } from '@tanstack/react-router';
import { useAuth } from '#/hooks/useAuth';

const navItems = [{ label: 'Dashboard', to: '/admin/dashboard', icon: HouseSimpleIcon }] as const;

export function AdminSidebar() {
	const { clearAuth } = useAuth();
	const navigate = useNavigate();

	function handleLogout() {
		clearAuth();
		navigate({ to: '/login' });
	}

	return (
		<aside className="flex h-screen w-56 shrink-0 flex-col border-r border-white/50 bg-white/85 backdrop-blur-md">
			<div className="border-b border-white/50 px-5 py-4">
				<p className="text-base font-semibold text-primary">FlowingInk's Blog</p>
				<p className="text-xs text-primary/40">管理后台</p>
			</div>

			<nav className="flex-1 space-y-0.5 p-3">
				{navItems.map((item) => (
					<Link
						key={item.to}
						to={item.to}
						className="flex items-center gap-3 rounded-xl px-3 py-2 text-sm text-primary/60 transition-colors hover:bg-white/70 hover:text-primary"
						activeProps={{
							className:
								'flex items-center gap-3 rounded-xl px-3 py-2 text-sm bg-white/70 text-primary font-medium'
						}}
					>
						<item.icon size={18} />
						{item.label}
					</Link>
				))}
			</nav>

			<div className="border-t border-white/50 p-3">
				<Button
					onClick={handleLogout}
					className="flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm text-primary/60 transition-colors hover:bg-white/70 hover:text-primary"
				>
					<SignOutIcon size={18} />
					退出登录
				</Button>
			</div>
		</aside>
	);
}
