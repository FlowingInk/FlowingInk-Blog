import { createFileRoute, Outlet, useNavigate } from '@tanstack/react-router';
import { useEffect } from 'react';
import { AdminSidebar } from '#/components/admin/AdminSidebar';
import { useAuth } from '#/hooks/useAuth';

export const Route = createFileRoute('/admin')({
	component: AdminLayout
});

function AdminLayout() {
	const { isAuthenticated } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (!isAuthenticated) {
			navigate({ to: '/login' });
		}
	}, [isAuthenticated, navigate]);

	if (!isAuthenticated) return null;

	return (
		<div className="flex h-screen bg-[#f4f3f0]">
			<AdminSidebar />
			<main className="flex-1 overflow-y-auto p-6">
				<Outlet />
			</main>
		</div>
	);
}
