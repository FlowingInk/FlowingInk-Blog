import { createFileRoute } from '@tanstack/react-router';
import { LoginForm } from '#/components/ui/auth/loginForm';

export const Route = createFileRoute('/login')({
	component: Login
});

function Login() {
	return (
		<div className="flex min-h-screen w-full items-center justify-center px-4 bg-[url('/bochi-bg-admin-pc-4k.jpg')] bg-cover bg-center bg-no-repeat">
			<LoginForm />
		</div>
	);
}
