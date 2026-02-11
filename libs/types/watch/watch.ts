import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';
import { Member } from '../member/member';

export interface MeLiked {
	memberId: string;
	likeRefId: string;
	myFavorite: boolean;
}

export interface TotalCounter {
	total: number;
}

export interface Property {
	_id: string;
	watchType: WatchType;
	watchStatus: WatchStatus;
	watchLocation: WatchLocation;
	watchAddress: string;
	watchTitle: string;
	watchPrice: number;
	watchViews: number;
	watchLikes: number;
	watchComments: number;
	watchRank: number;
	watchImages: string[];
	watchDesc?: string;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	/** from aggregation **/
	meLiked?: MeLiked[];
	memberData?: Member;
}

export interface Watches {
	list: Watches[];
	metaCounter: TotalCounter[];
}
