import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import clsx from 'clsx';
import { useRef, useState } from 'react';
import { useOutsideClickClose } from './hooks/useOutsideClickClose';
import { Select } from '../select';
import {
	ArticleStateType,
	backgroundColors,
	fontFamilyOptions,
	fontColors,
	fontSizeOptions,
	contentWidthArr,
	OptionType,
} from 'src/constants/articleProps';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	defaultState: ArticleStateType;
	applyStatesHandler: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultState,
	applyStatesHandler,
}: ArticleParamsFormProps) => {
	const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
	const arrowButtonRef = useRef<HTMLDivElement>(null);
	const sideBarElementRef = useRef<HTMLDivElement>(null);
	const [options, setOptions] = useState<ArticleStateType>({ ...defaultState });

	useOutsideClickClose({
		isMenuOpen,
		rootRef: [arrowButtonRef, sideBarElementRef],
		onChange: setIsMenuOpen,
	});

	function makeUpdateOptionHandler(
		option: keyof ArticleStateType
	): (value: OptionType) => void {
		return (value) => {
			setOptions((prevState) => {
				return { ...prevState, [option]: value };
			});
		};
	}

	return (
		<>
			<ArrowButton
				ref={sideBarElementRef}
				isOpen={isMenuOpen}
				onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
			/>
			<aside
				className={clsx(styles.container, {
					[styles.container_open]: isMenuOpen,
				})}
				ref={arrowButtonRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						applyStatesHandler(options);
					}}>
					<Text as={'h2'} size={31} uppercase weight={800}>
						Задайте параметры
					</Text>
					<Select
						title='шрифт'
						options={fontFamilyOptions}
						selected={options.fontFamilyOption}
						onChange={makeUpdateOptionHandler('fontFamilyOption')}
					/>
					<RadioGroup
						name={'text-font-size'}
						options={fontSizeOptions}
						selected={options.fontSizeOption}
						onChange={makeUpdateOptionHandler('fontSizeOption')}
						title='размер шрифта'
					/>
					<Select
						title='цвет шрифта'
						options={fontColors}
						selected={options.fontColor}
						onChange={makeUpdateOptionHandler('fontColor')}
					/>
					<Separator />
					<Select
						title='цвет фона'
						options={backgroundColors}
						selected={options.backgroundColor}
						onChange={makeUpdateOptionHandler('backgroundColor')}
					/>
					<Select
						title='ширина контента'
						options={contentWidthArr}
						selected={options.contentWidth}
						onChange={makeUpdateOptionHandler('contentWidth')}
					/>
					<div className={styles.bottomContainer}>
						<Button
							title='Сбросить'
							htmlType='submit'
							type='reset'
							onClick={() => {
								setOptions({ ...defaultState });
								applyStatesHandler({ ...defaultState });
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
