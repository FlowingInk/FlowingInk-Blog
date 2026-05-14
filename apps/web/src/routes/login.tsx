import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/login')({
	component: Login
});

function Login() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center bg-[url('/bochi-bg1-4k.jpg')] bg-cover bg-center bg-no-repeat"></div>
	);
}
