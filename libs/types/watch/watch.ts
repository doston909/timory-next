import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';
import type { TotalCounter } from '../common';
import { MeLiked } from '../like/like';
import { Member } from '../member/member';

export interface Watch {
	_id: string;
	watchType: WatchType;
	watchStatus: WatchStatus;
	watchLocation?: WatchLocation;
	watchAddress?: string;
	watchModelName: string;
	watchLimitedEdition?: boolean;
	watchPrice: number;
	watchViews: number;
	watchLikes: number;
	watchComments: number;
	watchRank: number;
	watchImages: string[];
	watchBrand?: string;
	watchColor?: string;
	watchCaseShape?: string;
	watchCaseSize?: string;
	watchCountry?: string;
	watchMakeData?: string;
	watchWaterResistance?: number;
	watchAvailability?: number;
	watchMaterial?: string;
	watchDescription?: string;
	memberId: string;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt: Date;
	updatedAt: Date;
	memberData?: Member;
	meLiked?: MeLiked[];
}

export interface Watches {
	list: Watch[];
	metaCounter: TotalCounter[];
}

// Re-export for backward compatibility
export type { MeLiked } from '../like/like';
export type { TotalCounter } from '../common';
