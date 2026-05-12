import type { RequestOptions } from './type';

const BASE_URL = '';

export async function request<T>(path: string, options: RequestOptions = {}): Promise<T> {
	const { body, ...init } = options;

	const headers: Record<string, string> = {
		...(body ? { 'Content-Type': 'application/json' } : {}),
		...(init.headers as Record<string, string>)
	};

	const res = await fetch(`${BASE_URL}${path}`, {
		...init,
		headers,
		...(body ? { body: JSON.stringify(body) } : {})
	});

	if (!res.ok) {
		throw new Error(`HTTP ${res.status}`);
	}

	return res.json();
}
