import { Button, Description, Field, Fieldset, Input, Label } from '@headlessui/react';
import { useNavigate } from '@tanstack/react-router';
import { useEffect, useState } from 'react';
import { login } from '#/api/auth';
import { useAuth } from '#/hooks/useAuth';

export function LoginForm() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [loading, setLoading] = useState(false);

	const { isAuthenticated, setAuth } = useAuth();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) {
			navigate({ to: '/admin/dashboard' });
		}
	}, [isAuthenticated, navigate]);

	if (isAuthenticated) return null;

	async function handleSubmit(e: React.FormEvent) {
		e.preventDefault();
		setError('');

		if (!email.trim() || !password) {
			setError('请输入邮箱和密码');
			return;
		}

		setLoading(true);
		try {
			const res = await login({ email, password });
			setAuth(res.access_token, res.refresh_token);
			navigate({ to: '/admin/dashboard' });
		} catch (err) {
			setError(err instanceof Error ? err.message : '登录失败');
		} finally {
			setLoading(false);
		}
	}

	return (
		<form
			onSubmit={handleSubmit}
			className="w-full max-w-md rounded-2xl sm:rounded-3xl border border-white/60 bg-white/85 p-5 sm:p-8 shadow-xl backdrop-blur-md"
		>
			<h1 className="mb-5 sm:mb-8 text-center text-xl sm:text-2xl font-semibold text-primary">
				登录
			</h1>

			{error ? (
				<Description className="mb-6 rounded-xl border border-red-200/60 bg-red-50/80 px-4 py-3 text-sm text-red-600 backdrop-blur-sm">
					{error}
				</Description>
			) : null}

			<Fieldset className="space-y-5">
				<Field>
					<Label className="mb-2 block text-xs font-medium tracking-widest text-primary/55">
						邮箱
					</Label>
					<Input
						autoComplete="email"
						className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-primary outline-none backdrop-blur-sm transition-colors placeholder:text-primary/30 focus:border-primary/30 focus:bg-white/90"
						onChange={(e) => setEmail(e.target.value)}
						placeholder="your@email.com"
						type="email"
						value={email}
					/>
				</Field>

				<Field>
					<Label className="mb-2 block text-xs font-medium tracking-widest text-primary/55">
						密码
					</Label>
					<Input
						autoComplete="current-password"
						className="w-full rounded-xl border border-white/60 bg-white/60 px-4 py-3 text-sm text-primary outline-none backdrop-blur-sm transition-colors placeholder:text-primary/30 focus:border-primary/30 focus:bg-white/90"
						onChange={(e) => setPassword(e.target.value)}
						placeholder="••••••••"
						type="password"
						value={password}
					/>
				</Field>
			</Fieldset>

			<Button
				disabled={loading}
				type="submit"
				className="mt-6 w-full rounded-xl bg-primary/85 px-4 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all hover:bg-primary disabled:cursor-not-allowed disabled:opacity-50"
			>
				{loading ? '登录中...' : '登录'}
			</Button>
		</form>
	);
}
