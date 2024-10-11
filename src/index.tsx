import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import {
	defaultArticleState,
	ArticleStateType,
} from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [articleState, setArticleState] =
		useState<ArticleStateType>(defaultArticleState);

	function makeClassForSettings(newState: ArticleStateType): CSSProperties {
		return {
			'--font-family': newState.fontFamilyOption.value,
			'--font-size': newState.fontSizeOption.value,
			'--font-color': newState.fontColor.value,
			'--container-width': newState.contentWidth.value,
			'--bg-color': newState.backgroundColor.value,
		} as CSSProperties;
	}

	return (
		<main className={styles.main} style={makeClassForSettings(articleState)}>
			<ArticleParamsForm
				defaultState={defaultArticleState}
				applyStatesHandler={setArticleState}
			/>
			<Article />
		</main>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
