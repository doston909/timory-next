import { CommentGroup, CommentStatus } from '../../enums/comment.enum';
import type { TotalCounter } from '../common';
import { Member } from '../member/member';

export interface Comment {
	_id: string;
	commentStatus: CommentStatus;
	commentGroup: CommentGroup;
	commentContent: string;
	commentRefId: string;
	memberId: string;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
}

export interface Comments {
	list: Comment[];
	metaCounter: TotalCounter[];
}
