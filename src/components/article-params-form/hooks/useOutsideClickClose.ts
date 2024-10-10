import { useEffect } from 'react';

type UseOutsideClickClose = {
	isOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>[];
	onChange: (isOpen: boolean) => void;
};

export const useOutsideClickClose = ({
	isOpen,
	rootRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				isOpen &&
				target instanceof Node &&
				!rootRef.find((ref) => ref.current?.contains(target))
			) {
				onChange(false);
			}
		};
		if (isOpen) {
			window.addEventListener('mousedown', handleClick);

			return () => {
				window.removeEventListener('mousedown', handleClick);
			};
		}
	}, [onChange, isOpen]);
};
