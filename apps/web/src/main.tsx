import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRouter, RouterProvider } from '@tanstack/react-router';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { AuthProvider } from '#/hooks/useAuth';
import { ThemeProvider } from '#/hooks/useTheme';
import { routeTree } from './routeTree.gen';

const queryClient = new QueryClient();

const router = createRouter({
	routeTree,
	defaultPreload: 'intent',
	scrollRestoration: true
});

declare module '@tanstack/react-router' {
	interface Register {
		router: typeof router;
	}
}

const rootElement = document.getElementById('app');

if (rootElement && !rootElement.innerHTML) {
	const root = ReactDOM.createRoot(rootElement);
	root.render(
		<React.StrictMode>
			<QueryClientProvider client={queryClient}>
				<ThemeProvider>
					<AuthProvider>
						<RouterProvider router={router} />
					</AuthProvider>
				</ThemeProvider>
			</QueryClientProvider>
		</React.StrictMode>
	);
}
