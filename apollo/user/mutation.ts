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
			memberName
			memberEmail
			memberPhone
			memberPhoto
			memberAddress
			memberWatches
			memberArticles
			memberFollowers
			memberFollowings
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberBlocks
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
			memberName
			memberEmail
			memberPhone
			memberPhoto
			memberAddress
			memberWatches
			memberArticles
			memberFollowers
			memberFollowings
			memberPoints
			memberLikes
			memberViews
			memberComments
			memberRank
			memberBlocks
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
			memberName
			memberEmail
			memberPhoto
			memberAddress
			memberWatches
			memberRank
			memberArticles
			memberPoints
			memberLikes
			memberViews
			memberBlocks
			deletedAt
			createdAt
			updatedAt
			accessToken
		}
	}
`;

export const IMAGE_UPLOADER = gql`
  mutation ImageUploader($file: Upload!, $target: String!) {
    imageUploader(file: $file, target: $target)
  }
`;

export const IMAGES_UPLOADER = gql`
  mutation ImagesUploader($files: [Upload!]!, $target: String!) {
    imagesUploader(files: $files, target: $target)
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
			memberName
			memberPhoto
			memberAddress
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
	mutation CreateWatch($input: WatchInput!) {
    createWatch(input: $input) {
        _id
        watchType
        watchStatus
        watchLocation
        watchAddress
        watchModelName
        watchLimitedEdition
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchBrand
        watchColor
        watchCaseShape
        watchCaseSize
        watchCountry
        watchMakeData
        watchWaterResistance
        watchAvailability
        watchMaterial
        watchDescription
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
        watchModelName
        watchLimitedEdition
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchBrand
        watchColor
        watchCaseShape
        watchCaseSize
        watchCountry
        watchMakeData
        watchWaterResistance
        watchAvailability
        watchMaterial
        watchDescription
        memberId
        soldAt
        deletedAt
        createdAt
        updatedAt
    }
}
`;

export const REMOVE_WATCH = gql`
  mutation RemoveWatch($watchId: String!) {
    removeWatch(watchId: $watchId) {
      _id
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
        watchModelName
        watchLimitedEdition
        watchPrice
        watchViews
        watchLikes
        watchComments
        watchRank
        watchImages
        watchBrand
        watchDescription
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
            memberWatches
            memberName
            memberPhoto
            memberAddress
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
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
            memberWatches
            memberName
            memberPhoto
            memberAddress
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
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
            memberWatches
            memberName
            memberPhoto
            memberAddress
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
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
        meLiked {
            memberId
            likeRefId
            myFavorite
        }
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
            memberWatches
            memberName
            memberPhoto
            memberAddress
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
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
            memberWatches
            memberName
            memberPhoto
            memberAddress
            memberArticles
            memberFollowers
            memberFollowings
            memberPoints
            memberLikes
            memberViews
            memberComments
            memberRank
            memberBlocks
            deletedAt
            createdAt
            updatedAt
            accessToken
        }
    }
}

`;

export const REMOVE_COMMENT = gql`
  mutation RemoveComment($commentId: String!) {
    removeComment(commentId: $commentId) {
      _id
      commentStatus
      commentContent
      memberId
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
