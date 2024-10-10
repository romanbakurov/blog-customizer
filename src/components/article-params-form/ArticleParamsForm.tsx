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
	settingsHandleChange: (newState: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	defaultState,
	settingsHandleChange,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState<boolean>(false);
	const formRef = useRef<HTMLDivElement>(null);
	const selectRef = useRef<HTMLDivElement>(null);
	const [options, setOptions] = useState<ArticleStateType>({ ...defaultState });

	useOutsideClickClose({
		isOpen,
		rootRef: [formRef, selectRef],
		onChange: setIsOpen,
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
				ref={selectRef}
				isOpen={isOpen}
				onClick={() => setIsOpen((isOpen) => !isOpen)}
			/>
			<aside
				className={clsx(styles.container, { [styles.container_open]: isOpen })}
				ref={formRef}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						settingsHandleChange(options);
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
								settingsHandleChange({ ...defaultState });
							}}
						/>
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
