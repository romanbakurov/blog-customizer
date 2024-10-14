import { useEffect } from 'react';

type UseOutsideClickClose = {
	isMenuOpen: boolean;
	rootRef: React.RefObject<HTMLDivElement>[];
	onChange: (isMenuOpen: boolean) => void;
};

export const useOutsideClickClose = ({
	isMenuOpen,
	rootRef,
	onChange,
}: UseOutsideClickClose) => {
	useEffect(() => {
		const handleClick = (event: MouseEvent) => {
			const { target } = event;
			if (
				isMenuOpen &&
				target instanceof Node &&
				!rootRef.find((ref) => ref.current?.contains(target))
			) {
				onChange(false);
			}
		};
		if (isMenuOpen) {
			window.addEventListener('mousedown', handleClick);

			return () => {
				window.removeEventListener('mousedown', handleClick);
			};
		}
	}, [onChange, isMenuOpen]);
};
