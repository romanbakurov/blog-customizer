import arrow from 'src/images/arrow.svg';
import { forwardRef, PropsWithoutRef } from 'react';

import styles from './ArrowButton.module.scss';
import clsx from 'clsx';

/** Функция для обработки открытия/закрытия формы */
export type OnClick = () => void;

interface ArrowButtonProps {
	onClick: OnClick;
	isOpen: boolean;
}

export const ArrowButton = forwardRef<
	HTMLDivElement,
	PropsWithoutRef<ArrowButtonProps>
>(function ArrowButton(props, ref) {
	const { isOpen, onClick } = props;
	return (
		/* Не забываем указывать role и aria-label атрибуты для интерактивных элементов */
		<div
			ref={ref}
			role='button'
			aria-label='Открыть/Закрыть форму параметров статьи'
			tabIndex={0}
			className={clsx(styles.container, { [styles.container_open]: isOpen })}
			onClick={onClick}>
			<img
				src={arrow}
				alt='иконка стрелочки'
				className={clsx(styles.arrow, { [styles.arrow_open]: isOpen })}
			/>
		</div>
	);
});
