import { useEffect } from 'react';

type FontLoaderProps = {
	href: string;
	id?: string;
};

export default function FontLoader({ href, id }: FontLoaderProps) {
	useEffect(() => {
		const fontId = id || href;

		if (document.getElementById(fontId)) return;

		const link = document.createElement('link');
		link.id = fontId;
		link.rel = 'stylesheet';
		link.href = href;

		document.head.appendChild(link);
	}, [href, id]);

	return null;
}
