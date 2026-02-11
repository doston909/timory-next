import { gql } from '@apollo/client';

/**************************
 *         MEMBER         *
 *************************/

export const SIGN_UP = gql`
	mutation Signup($input: MemberInput!) {
		signup(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberWatches
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LOGIN = gql`
	mutation Login($input: LoginInput!) {
		login(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberWatches
			memberRank
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const UPDATE_MEMBER = gql`
	mutation UpdateMember($input: MemberUpdate!) {
		updateMember(input: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWatches
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberWarnings
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const LIKE_TARGET_MEMBER = gql`
	mutation LikeTargetMember($input: String!) {
		likeTargetMember(memberId: $input) {
			_id
			memberType
			memberStatus
			memberAuthType
			memberPhone
			memberNick
			memberFullName
			memberImage
			memberAddress
			memberDesc
			memberWarnings
			memberBlocks
			memberWatches
			memberRank
			memberPoints
			memberLikes
			memberViews
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

/**************************
 *        PROPERTY        *
 *************************/

export const CREATE_WATCH = gql`
	mutation CreateDealerWatch($input: WatchInput!) {
    createDealerWatch(input: $input) {
        _id
        watchType
        watchStatus
        watchLocation
        watchAddress
        watchTitle
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchDesc
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
    }
}
`;

export const UPDATE_WATCH = gql`
mutation UpdateWatch($input: WatchUpdate!) {
    updateWatch(input: $input) {
        _id
        watchType
        watchStatus
        watchLocation
        watchAddress
        watchTitle
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchDesc
        memberId
        dealerIds
        soldAt
        deletedAt
        createdAt
        updatedAt
    }
}

`;

export const LIKE_TARGET_WATCH = gql`
mutation LikeTargetWatch($input: String!) {
    likeTargetWatch(watchId: $input) {
        _id
        watchType
        watchStatus
        watchLocation
        watchAddress
        watchTitle
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchDesc
        brandId
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
        memberData {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberWatches
            memberFullName
            memberImage
            memberAddress
            memberDesc
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}
`;

/**************************
 *      BOARD-ARTICLE     *
 *************************/

export const CREATE_BOARD_ARTICLE = gql`
mutation CreateBoardArticle($input: BoardArticleInput!) {
    createBoardArticle(input: $input) {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        articleViews
        articleLikes
        articleComments
        memberId
        createdAt
        updatedAt
        memberData {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberFullName
            memberImage
            memberAddress
            memberDesc
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}
`;

export const UPDATE_BOARD_ARTICLE = gql`
mutation UpdateBoardArticle($input: BoardArticleUpdate!){
    updateBoardArticle(input: $input) {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        articleViews
        articleLikes
        articleComments
        memberId
        createdAt
        updatedAt
        memberData {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberFullName
            memberImage
            memberAddress
            memberDesc
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}

`;

export const LIKE_TARGET_BOARD_ARTICLE = gql`
	mutation LikeTargetBoardArticle($input: String!){
    likeTargetBoardArticle(articleId: $input) {
        _id
        articleCategory
        articleStatus
        articleTitle
        articleContent
        articleImage
        articleViews
        articleLikes
        articleComments
        memberId
        createdAt
        updatedAt
    }
}

`;

/**************************
 *         COMMENT        *
 *************************/

export const CREATE_COMMENT = gql`
	mutation CreateComment($input: CommentInput!) {
    createComment(input: $input) {
        _id
        commentStatus
        commentGroup
        commentContent
        commentRefId
        memberId
        createdAt
        updatedAt
        memberData {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberFullName
            memberImage
            memberAddress
            memberDesc
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}

`;

export const UPDATE_COMMENT = gql`
	mutation UpdateComment($input: CommentUpdate!) {
    updateComment(input: $input) {
        _id
        commentStatus
        commentGroup
        commentContent
        commentRefId
        memberId
        createdAt
        updatedAt
        memberData {
            _id
            memberType
            memberStatus
            memberAuthType
            memberPhone
            memberNick
            memberFullName
            memberImage
            memberAddress
            memberDesc
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberWarnings
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}

`;

/**************************
 *         FOLLOW        *
 *************************/

export const SUBSCRIBE = gql`
	mutation Subscribe($input: String!) {
    subscribe(input: $input) {
        _id
        followingId
        followerId
        createdAt
        updatedAt
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
        meFollowed {
            followingId
            followerId
            myFollowing
        }
    }
}

`;

export const UNSUBSCRIBE = gql`
	mutation Unsubscribe($input: String!) {
    unsubscribe(input: $input) {
        _id
        followingId
        followerId
        createdAt
        updatedAt
    }
}

`;
