export enum BoardArticleCategory {
	FREE = 'FREE',
	RECOMMEND = 'RECOMMEND',
	NEWS = 'NEWS',
}

/** Article types: only Free board, Recommendation, News */
export const CREATE_ARTICLE_CATEGORIES: BoardArticleCategory[] = [
	BoardArticleCategory.FREE,
	BoardArticleCategory.RECOMMEND,
	BoardArticleCategory.NEWS,
];

/** Display labels: Free board, Recommendation, News */
export const CREATE_ARTICLE_TYPE_LABELS: Record<BoardArticleCategory, string> = {
	[BoardArticleCategory.FREE]: 'Free board',
	[BoardArticleCategory.RECOMMEND]: 'Recommendation',
	[BoardArticleCategory.NEWS]: 'News',
};

export enum BoardArticleStatus {
	PUBLISHING = 'PUBLISHING',
	DELETE = 'DELETE',
	REMOVE = 'REMOVE',
}
