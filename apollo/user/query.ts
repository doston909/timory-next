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
                memberWarnings
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