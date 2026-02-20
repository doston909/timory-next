import { MemberStatus, MemberType } from '../../enums/member.enum';
import { Direction } from '../../enums/common.enum';

export interface MemberInput {
	memberName: string;
	memberEmail: string;
	memberPassword: string;
	memberConfirmPassword: string;
	memberType: MemberType;
}

export interface LoginInput {
	memberName: string;
	memberPassword: string;
}

interface AISearch {
	text?: string;
}

export interface AgentsInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: AISearch;
}

interface MISearch {
	memberStatus?: MemberStatus;
	memberType?: MemberType;
	text?: string;
}

export interface MembersInquiry {
	page: number;
	limit: number;
	sort?: string;
	direction?: Direction;
	search: MISearch;
}
