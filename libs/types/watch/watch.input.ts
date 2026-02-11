import { WatchLocation, WatchStatus, WatchType } from '../../enums/watch.enum';
import { Direction } from '../../enums/common.enum';

export interface WatchInput {
	watchType: WatchType;
	watchAddress: string;
	watchTitle: string;
	watchPrice: number;
	watchImages: string[];
	watchDesc?: string;
	memberId?: string;
	createdAt?: string;
}

interface PISearch {
	memberId?: string;
	locationList?: WatchLocation[];
	typeList?: WatchType[];
	roomsList?: Number[];
	options?: string[];
	bedsList?: Number[];
	pricesRange?: Range;
	periodsRange?: PeriodsRange;
	squaresRange?: Range;
	text?: string;
}

export interface WatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: PISearch;
}

interface APISearch {
	watchStatus?: WatchStatus;
}

export interface DealerWatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: APISearch;
}

interface ALPISearch {
	watchStatus?: WatchStatus;
	watchLocationList?: WatchLocation[];
}

export interface AllWatchesInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: ALPISearch;
}

interface Range {
	start: number;
	end: number;
}

interface PeriodsRange {
	start: Date | number;
	end: Date | number;
}
