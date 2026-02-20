import { BoardArticleCategory, BoardArticleStatus } from '../../enums/board-article.enum';
import type { TotalCounter } from '../common';
import { MeLiked } from '../like/like';
import { Member } from '../member/member';

export interface BoardArticle {
	_id: string;
	articleCategory: BoardArticleCategory;
	articleStatus: BoardArticleStatus;
	articleTitle: string;
	articleContent: string;
	articleImage?: string;
	articleViews: number;
	articleLikes: number;
	articleComments: number;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
	meLiked?: MeLiked[];
}

export interface BoardArticles {
	list: BoardArticle[];
	metaCounter: TotalCounter[];
}
