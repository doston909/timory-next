import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';
import { Direction } from '../../enums/common.enum';

export interface WatchInput {
	watchImages: string[];
	watchModelName: string;
	watchLimitedEdition?: boolean;
	watchBrand?: string;
	watchType: WatchType;
	watchPrice: number;
	watchColor?: string;
	watchCaseShape?: string;
	watchCaseSize?: string;
	watchCountry?: string;
	watchMakeData?: string;
	watchWaterResistance?: number;
	watchAvailability?: number;
	watchMaterial?: string;
	watchDescription?: string;
	memberId?: string;
}

export interface PricesRange {
	start: number;
	end: number;
}

export interface SizesRange {
	start: number;
	end: number;
}

export interface PeriodsRange {
	start: Date;
	end: Date;
}

interface WISearch {
	brandId?: string;
	dealerId?: string;
	typeList?: WatchType[];
	statusList?: WatchStatus[];
	locationList?: WatchLocation[];
	options?: string[];
	pricesRange?: PricesRange;
	sizesRange?: SizesRange;
	periodsRange?: PeriodsRange;
	text?: string;
	watchLimitedEdition?: boolean;
}

export interface WatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: WISearch;
}

interface DWISearch {
	watchStatus?: WatchStatus;
	text?: string;
}

export interface DealerWatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: DWISearch;
}

interface ALWISearch {
	watchStatus?: WatchStatus;
	watchLocationList?: WatchLocation[];
	watchTypeList?: WatchType[];
}

export interface AllWatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALWISearch;
}

export interface OrdinaryInquiry {
	page: number;
	limit: number;
}
