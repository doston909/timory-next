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