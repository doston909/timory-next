import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';

export interface WatchUpdate {
	_id: string;
	watchType?: WatchType;
	watchStatus?: WatchStatus;
	watchLocation?: WatchLocation;
	watchAddress?: string;
	watchModelName?: string;
	watchLimitedEdition?: boolean;
	watchPrice?: number;
	watchImages?: string[];
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
	soldAt?: Date;
	deletedAt?: Date;
	updatedAt?: Date;
}
