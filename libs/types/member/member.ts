import { MemberAuthType, MemberStatus, MemberType } from '../../enums/member.enum';
import type { TotalCounter } from '../common';
import { MeFollowed } from '../follow/follow';
import { MeLiked } from '../like/like';

export interface Member {
	_id: string;
	memberType: MemberType;
	memberStatus: MemberStatus;
	memberAuthType: MemberAuthType;
	memberName?: string;
	memberEmail?: string;
	memberPhone?: string;
	memberWatches: number;
	memberPhoto?: string;
	memberAddress?: string;
	memberArticles: number;
	memberFollowers: number;
	memberFollowings: number;
	memberPoints: number;
	memberLikes: number;
	memberViews: number;
	memberComments: number;
	memberRank: number;
	memberWarnings: number;
	memberBlocks: number;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	accessToken?: string;
	meLiked?: MeLiked[];
	meFollowed?: MeFollowed[];
}

export interface Members {
	list: Member[];
	metaCounter: TotalCounter[];
}
