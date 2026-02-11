import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';

export interface WatchUpdate {
	_id: string;
	watchType?: WatchType;
	watchStatus?: WatchStatus;
	watchLocation?: WatchLocation;
	watchAddress?: string;
	watchTitle?: string;
	watchPrice?: number;
	watchImages?: string[];
	watchDesc?: string;
	watchBarter?: boolean;
	watchRent?: boolean;
	soldAt?: Date;
	deletedAt?: Date;
	createdAt?: Date;
}
