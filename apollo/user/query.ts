import { gql } from "@apollo/client";

export const GET_WATCHES = gql`
query GetWatches ($input: WatchesInquiry!) {
    getWatches(input: $input) {
        list {
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
            meLiked {
                memberId
                likeRefId
                myFavorite
            }
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
        metaCounter {
            total
        }
    }
}
`;

export const GET_WATCH = gql`
  query GetWatch($watchId: String!) {
    getWatch(watchId: $watchId) {
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
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
      memberData {
        _id
        memberName
        memberPhoto
        memberAddress
      }
    }
  }
`;

export const GET_MEMBER = gql`
  query GetMember($memberId: String!) {
    getMember(memberId: $memberId) {
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
      meFollowed {
        followingId
        followerId
        myFollowing
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWERS = gql`
  query GetMemberFollowers($input: FollowInquiry!) {
    getMemberFollowers(input: $input) {
      list {
        _id
        followerId
        followingId
        followerData {
          _id
          memberName
          memberPhoto
          memberFollowers
          memberFollowings
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MEMBER_FOLLOWINGS = gql`
  query GetMemberFollowings($input: FollowInquiry!) {
    getMemberFollowings(input: $input) {
      list {
        _id
        followerId
        followingId
        followingData {
          _id
          memberName
          memberPhoto
          memberFollowers
          memberFollowings
        }
        meFollowed {
          followingId
          followerId
          myFollowing
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_DEALER_WATCHES = gql`
  query GetDealerWatches($input: DealerWatchesInquiry!) {
    getDealerWatches(input: $input) {
      list {
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
      metaCounter {
        total
      }
    }
  }
`;

export const GET_COMMENTS = gql`
  query GetComments($input: CommentsInquiry!) {
    getComments(input: $input) {
      list {
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
          memberName
          memberPhoto
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_BOARD_ARTICLE = gql`
  query GetBoardArticle($articleId: String!) {
    getBoardArticle(articleId: $articleId) {
      _id
      articleTitle
      articleContent
      articleImage
      articleViews
      articleLikes
      articleComments
      createdAt
      memberData {
        memberName
        memberPhoto
      }
      meLiked {
        memberId
        likeRefId
        myFavorite
      }
    }
  }
`;

export const GET_BOARD_ARTICLES = gql`
  query GetBoardArticles($input: BoardArticlesInquiry!) {
    getBoardArticles(input: $input) {
      list {
        _id
        articleCategory
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
        memberData {
          _id
          memberName
          memberPhoto
          memberType
        }
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_DEALERS = gql`
  query GetDealers($input: DealersInquiry!) {
    getDealers(input: $input) {
      list {
        _id
        memberName
        memberPhoto
        memberAddress
        memberWatches
        memberArticles
        memberLikes
        memberViews
        memberComments
        memberRank
        createdAt
      }
      metaCounter {
        total
      }
    }
  }
`;

export const GET_MY_BOARD_ARTICLES = gql`
  query GetMyBoardArticles($input: BoardArticlesInquiry!) {
    getMyBoardArticles(input: $input) {
      list {
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
      metaCounter {
        total
      }
    }
  }
`;