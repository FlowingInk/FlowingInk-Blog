import { Transition } from '@headlessui/react';
import type React from 'react';

export default function Fade({
	as = 'div',
	appear = true,
	show = true,
	enter = 'transition-opacity duration-300',
	enterFrom = 'opacity-0',
	enterTo = 'opacity-100',
	leave = 'transition-opacity duration-300',
	leaveFrom = 'opacity-100',
	leaveTo = 'opacity-0',
	children
}: {
	as?: React.ElementType;
	appear?: boolean;
	show?: boolean;
	enter?: string;
	enterFrom?: string;
	enterTo?: string;
	leave?: string;
	leaveFrom?: string;
	leaveTo?: string;
	children: React.ReactNode;
}) {
	return (
		<Transition
			as={as}
			appear={appear}
			show={show}
			enter={enter}
			enterFrom={enterFrom}
			enterTo={enterTo}
			leave={leave}
			leaveFrom={leaveFrom}
			leaveTo={leaveTo}
		>
			{children}
		</Transition>
	);
}
