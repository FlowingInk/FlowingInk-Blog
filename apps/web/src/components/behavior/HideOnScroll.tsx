import { Transition } from '@headlessui/react';
import type { ReactElement } from 'react';
import { useEffect, useRef, useState } from 'react';

interface Props {
	window?: () => Window;
	children?: ReactElement<unknown>;
}
export default function HideOnScroll(props: Props) {
	const { children, window } = props;
	const [isVisible, setIsVisible] = useState(true);
	const lastScrollTopRef = useRef(0);

	useEffect(() => {
		const target = window ? window() : globalThis.window;

		if (!target) {
			return;
		}

		const handleScroll = () => {
			const currentScrollTop = target.scrollY;
			setIsVisible(currentScrollTop <= lastScrollTopRef.current || currentScrollTop <= 0);
			lastScrollTopRef.current = currentScrollTop;
		};

		handleScroll();
		target.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			target.removeEventListener('scroll', handleScroll);
		};
	}, [window]);

	return (
		<Transition
			appear={false}
			show={isVisible}
			as="div"
			enter="transform transition duration-500 ease-out"
			enterFrom="-translate-y-full opacity-0"
			enterTo="translate-y-0 opacity-100"
			leave="transform transition duration-400 ease-in"
			leaveFrom="translate-y-0 opacity-100"
			leaveTo="-translate-y-full opacity-0"
		>
			{children ?? <div />}
		</Transition>
	);
}
