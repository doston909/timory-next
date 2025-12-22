// Browser-compatible config (removed Node.js specific imports)
import { T } from './types/common';

export const availableBrandSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableDealerSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews', 'memberRank'];
export const availableMembersSorts = ['createdAt', 'updatedAt', 'memberLikes', 'memberViews'];
export const availableWatchSorts = ['createdAt', 'updatedAt', 'watchLikes', 'watchViews', 'watchyRank', 'watchPrice'];
export const availableWatchOptions = [
	'AUTOMATIC',
	'CHRONOGRAPH',
	'WATER_RESISTANT',
	'LIMITED_EDITION',
	'DATE_DISPLAY',
	'POWER_RESERVE',
];

export const availableBoardArticleSorts = ['createdAt', 'updatedAt', 'articleLikes', 'articleViews'];
export const availableCommentSorts = ['createdAt', 'updatedAt'];

export const Messages = {
	error1: 'Something went wrong!',
	error2: 'Please login first!',
	error3: 'Please fulfill all inputs!',
	error4: 'Message is empty!',
	error5: 'Only images with jpeg, jpg, png format allowed!',
};

/** IMAGE CONFIGURATION **/

export const validMimeTypes = ['image/png', 'image/jpg', 'image/jpeg'];

// Browser-compatible version of getSerialForImage
export const getSerialForImage = (filename: string) => {
	const ext = filename.slice((filename.lastIndexOf('.') - 1 >>> 0) + 2);
	const randomId = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
	return randomId + '.' + ext;
};

// Browser-compatible version (returns string as-is for client-side)
export const shapeIntoMongoObjectId = (target: any) => {
	return typeof target === 'string' ? target : target;
};

export const lookupAuthMemberLiked = (memberId: T, targetRefId: string = '$_id') => {
	return {
		$lookup: {
			from: 'likes',
			let: {
				localLikeRefId: targetRefId,
				localMemberId: memberId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$likeRefId', '$$localLikeRefId'] }, { $eq: ['$memberId', '$$localMemberId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0,
						memberId: 1,
						likeRefId: 1,
						myFavorite: '$$localMyFavorite',
					},
				},
			],
			as: 'meLiked',
		},
	};
};

interface LookupAuthMemberFollowed {
	followerId: T;
	followingId: string;
}

export const lookupAuthMemberFollowed = (input: LookupAuthMemberFollowed) => {
	const { followerId, followingId } = input;
	return {
		$lookup: {
			from: 'follows',
			let: {
				localFollowerId: followerId,
				localFollowingId: followingId,
				localMyFavorite: true,
			},
			pipeline: [
				{
					$match: {
						$expr: {
							$and: [{ $eq: ['$followerId', '$$localFollowerId'] }, { $eq: ['$followingId', '$$localFollowingId'] }],
						},
					},
				},
				{
					$project: {
						_id: 0,
						followerId: 1,
						followingId: 1,
						myFollowing: '$$localMyFavorite',
					},
				},
			],
			as: 'meFollowed',
		},
	};
};

export const lookupMember = {
	$lookup: {
		from: 'members',
		localField: 'memberId',
		foreignField: '_id',
		as: 'memberData',
	},
};

export const lookupFollowingData = {
	$lookup: {
		from: 'members',
		localField: 'followingId',
		foreignField: '_id',
		as: 'followingData',
	},
};

export const lookupFollowerData = {
	$lookup: {
		from: 'members',
		localField: 'followerId',
		foreignField: '_id',
		as: 'followerData',
	},
};

export const lookupFavorite = {
	$lookup: {
		from: 'members',
		localField: 'favoriteWatch.memberId',
		foreignField: '_id',
		as: 'favoriteWatch.memberData',
	},
};

	export const lookupVisit = {
	$lookup: {
		from: 'members',
		localField: 'visitedWatch.memberId',
		foreignField: '_id',
		as: 'visitedWatch.memberData',
	},
};