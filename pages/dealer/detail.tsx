import React, { useState, useMemo, useEffect } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { ShoppingBagOutlined, FavoriteBorder, Favorite, VisibilityOutlined, CommentOutlined, ArrowForwardIos, PersonOutline, ArrowForward } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useQuery, useMutation, useReactiveVar } from "@apollo/client";
import { useCart } from "@/libs/context/CartContext";
import { userVar } from "@/apollo/store";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { GET_MEMBER, GET_WATCHES, GET_BOARD_ARTICLES, GET_MEMBER_FOLLOWERS, GET_MEMBER_FOLLOWINGS } from "@/apollo/user/query";
import { SUBSCRIBE, UNSUBSCRIBE } from "@/apollo/user/mutation";
import { watchImageUrl } from "@/libs/utils";
import { sweetToastErrorAlert } from "@/libs/sweetAlert";

type Watch = {
  id: number | string;
  name: string;
  image: string;
  price: string;
  brand?: string;
  likes?: number;
  views?: number;
  comments?: number;
  datePosted?: string;
  status?: string;
  limitedEdition?: boolean;
  watchStatus?: boolean;
};

const ITEMS_PER_PAGE = 6;
const FOLLOWERS_PER_PAGE = 4;
const ARTICLES_PER_PAGE = 3;

const DealerDetailPage = () => {
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const { addToCart } = useCart();
  const dealerIdParam = router.query.id;
  const dealerId = typeof dealerIdParam === "string" ? dealerIdParam : Array.isArray(dealerIdParam) ? dealerIdParam[0] : undefined;

  const { data: memberData, refetch: refetchMember } = useQuery(GET_MEMBER, {
    variables: { memberId: dealerId ?? "" },
    skip: !dealerId,
  });
  const apiDealer = memberData?.getMember;

  const [subscribeMutation] = useMutation(SUBSCRIBE, {
    onCompleted: () => {
      refetchMember?.();
    },
  });
  const [unsubscribeMutation] = useMutation(UNSUBSCRIBE, {
    onCompleted: () => {
      refetchMember?.();
    },
  });

  const { data: watchesData } = useQuery(GET_WATCHES, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        search: dealerId ? { dealerId } : {},
      },
    },
    skip: !dealerId,
  });
  const watchesList = watchesData?.getWatches?.list ?? [];
  const watches: Watch[] = useMemo(
    () =>
      watchesList.map((w: any) => ({
        id: w._id,
        name: w.watchModelName ?? "",
        image: watchImageUrl(w.watchImages?.[0]),
        price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "$0.00",
        brand: w.watchBrand ?? undefined,
        likes: w.watchLikes ?? 0,
        views: w.watchViews ?? 0,
        comments: w.watchComments ?? 0,
        datePosted: w.createdAt ? new Date(w.createdAt).toISOString().slice(0, 16).replace("T", " ") : undefined,
        status: "Active",
        limitedEdition: w.watchLimitedEdition ?? false,
        watchStatus: w.watchStatus !== "SOLD",
      })),
    [watchesList]
  );

  const { data: articlesData } = useQuery(GET_BOARD_ARTICLES, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        search: dealerId ? { memberId: dealerId } : {},
      },
    },
    skip: !dealerId,
  });
  const articlesList = articlesData?.getBoardArticles?.list ?? [];
  const CATEGORY_TO_TYPE: Record<string, string> = { FREE: "Free board", RECOMMEND: "Recommendation", NEWS: "News" };
  const articles: { id: number | string; type: string; date: string; title: string; content: string; views: number; likes: number }[] = useMemo(
    () =>
      articlesList.map((a: any) => ({
        id: a._id,
        type: CATEGORY_TO_TYPE[String(a.articleCategory)] ?? "Free board",
        date: a.createdAt ? new Date(a.createdAt).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }) : "",
        title: a.articleTitle ?? "",
        content: a.articleContent ?? "",
        views: a.articleViews ?? 0,
        likes: a.articleLikes ?? 0,
      })),
    [articlesList]
  );

  const displayDealer = useMemo(
    () =>
      apiDealer
        ? { name: apiDealer.memberName ?? "—", image: watchImageUrl(apiDealer.memberPhoto), phone: apiDealer.memberPhone ?? "" }
        : null,
    [apiDealer]
  );

  const [isDealerFollowing, setIsDealerFollowing] = useState(false);
  const [totalFollowersCount, setTotalFollowersCount] = useState(0);
  useEffect(() => {
    if (apiDealer?.memberFollowers != null) setTotalFollowersCount(apiDealer.memberFollowers);
  }, [apiDealer?.memberFollowers]);
  useEffect(() => {
    const myFollowing = apiDealer?.meFollowed?.[0]?.myFollowing === true;
    setIsDealerFollowing(myFollowing);
    setIsCurrentUserFollower(myFollowing);
  }, [apiDealer?.meFollowed]);
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Watches");
  const tabFromQuery = router.query.tab;
  useEffect(() => {
    if (router.isReady && tabFromQuery === "contact") {
      setActiveTab("Contact Dealer");
    }
  }, [router.isReady, tabFromQuery]);
  const [followersPage, setFollowersPage] = useState(1);
  const [followingsPage, setFollowingsPage] = useState(1);
  const [followersFollowing, setFollowersFollowing] = useState<{ [key: string]: boolean }>({});
  const [followersCounts, setFollowersCounts] = useState<{ [key: string]: number }>({});
  const [likedWatches, setLikedWatches] = useState<{ [key: string]: boolean }>({});
  const [watchLikes, setWatchLikes] = useState<{ [key: string]: number }>({});
  const [articleLiked, setArticleLiked] = useState<{ [key: string]: boolean }>({});
  const [articleLikes, setArticleLikes] = useState<{ [key: string]: number }>({});
  const [articlePage, setArticlePage] = useState(1);

  const totalPages = Math.ceil(watches.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWatches = watches.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const { data: followersData, refetch: refetchFollowers } = useQuery(GET_MEMBER_FOLLOWERS, {
    variables: {
      input: {
        page: followersPage,
        limit: FOLLOWERS_PER_PAGE,
        search: dealerId ? { followingId: dealerId } : {},
      },
    },
    skip: !dealerId || activeTab !== "Followers",
  });
  const followersList = followersData?.getMemberFollowers?.list ?? [];
  const followersTotal = followersData?.getMemberFollowers?.metaCounter?.[0]?.total ?? 0;
  const totalFollowersPages = Math.max(1, Math.ceil(followersTotal / FOLLOWERS_PER_PAGE));

  const { data: followingsData, refetch: refetchFollowings } = useQuery(GET_MEMBER_FOLLOWINGS, {
    variables: {
      input: {
        page: followingsPage,
        limit: FOLLOWERS_PER_PAGE,
        search: dealerId ? { followerId: dealerId } : {},
      },
    },
    skip: !dealerId || activeTab !== "Followings",
  });
  const followingsList = followingsData?.getMemberFollowings?.list ?? [];
  const followingsTotal = followingsData?.getMemberFollowings?.metaCounter?.[0]?.total ?? 0;
  const totalFollowingsPages = Math.max(1, Math.ceil(followingsTotal / FOLLOWERS_PER_PAGE));

  const totalArticlePages = Math.ceil(articles.length / ARTICLES_PER_PAGE);
  const articleStartIndex = (articlePage - 1) * ARTICLES_PER_PAGE;
  const currentArticles = articles.slice(
    articleStartIndex,
    articleStartIndex + ARTICLES_PER_PAGE
  );

  const getArticleExcerpt = (content: string, wordLimit = 18) => {
    const words = content.split(/\s+/);
    if (words.length <= wordLimit) return content;
    return words.slice(0, wordLimit).join(" ") + "...";
  };

  const handleArticleLikeClick = (articleId: number | string) => {
    const key = String(articleId);
    const isLiked = !!articleLiked[key];
    setArticleLiked((prev) => ({ ...prev, [key]: !isLiked }));
    setArticleLikes((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + (isLiked ? -1 : 1) }));
  };

  const handleFollowMemberInList = (key: string, targetMemberId: string, isCurrentlyFollowing: boolean) => {
    if (isCurrentlyFollowing) {
      unsubscribeMutation({
        variables: { input: targetMemberId },
        onCompleted: () => {
          refetchFollowers?.();
          refetchFollowings?.();
        },
      });
    } else {
      subscribeMutation({
        variables: { input: targetMemberId },
        onCompleted: () => {
          refetchFollowers?.();
          refetchFollowings?.();
        },
      });
    }
    setFollowersFollowing((prev) => ({ ...prev, [key]: !isCurrentlyFollowing }));
    setFollowersCounts((prev) => ({
      ...prev,
      [key]: (prev[key] ?? 0) + (isCurrentlyFollowing ? -1 : 1),
    }));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleLikeClick = (watchId: number | string, e: React.MouseEvent) => {
    e.stopPropagation();
    const key = String(watchId);
    const isLiked = !!likedWatches[key];
    setLikedWatches((prev) => ({ ...prev, [key]: !isLiked }));
    setWatchLikes((prev) => ({ ...prev, [key]: (prev[key] ?? 0) + (isLiked ? -1 : 1) }));
  };

  const handleAddToCart = (watch: Watch, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      image: watch.image,
      name: watch.name,
      model: watch.name,
      brand: watch.brand || "",
      price: parseFloat(watch.price.replace(/[^0-9.-]+/g, "") || "0"),
      quantity: 1,
      dealerId: dealerId,
    });
  };

  const handleWatchClick = (watchId: number | string) => {
    router.push(`/watch/detail?id=${watchId}`);
  };

  const handleArticleClick = (articleId: number | string) => {
    router.push(`/community/detail?id=${articleId}`);
  };

  return (
    <Stack className="dealer-detail-page">
      <Box className="dealer-detail-hero">
        <Box className="dealer-detail-hero-bg" />

        <Box className="dealer-detail-hero-content">
          <Box className="dealer-detail-profile">
            <Box className="dealer-avatar-wrapper">
              {displayDealer?.image ? (
                <img
                  src={displayDealer.image}
                  alt={displayDealer.name}
                  className="dealer-avatar"
                />
              ) : (
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", width: "100%", height: "100%", backgroundColor: "action.hover" }}>
                  <PersonOutline sx={{ fontSize: 64, color: "action.disabled" }} />
                </Box>
              )}
            </Box>

            <Box className="dealer-profile-text">
              <Typography className="dealer-profile-name">
                {displayDealer?.name ?? "—"}
              </Typography>
              <Typography className="dealer-profile-phone">
                {displayDealer?.phone ?? ""}
              </Typography>
              <Typography className="dealer-profile-role">Dealer</Typography>
            </Box>
          </Box>

          {!(user?._id != null && String(user._id) === String(dealerId)) && (
            <Button
              className={`dealer-follow-button${
                isDealerFollowing ? " dealer-follow-button-active" : ""
              }`}
              onClick={() => {
                if (!dealerId) return;
                if (isDealerFollowing) {
                  unsubscribeMutation({ variables: { input: dealerId } });
                  setIsDealerFollowing(false);
                  setTotalFollowersCount((c) => c - 1);
                  setIsCurrentUserFollower(false);
                } else {
                  subscribeMutation({ variables: { input: dealerId } });
                  setIsDealerFollowing(true);
                  setTotalFollowersCount((c) => c + 1);
                  setIsCurrentUserFollower(true);
                }
              }}
            >
              {isDealerFollowing ? "Unfollow" : "Follow"}
            </Button>
          )}
        </Box>
      </Box>

      <Box className="dealer-detail-tabs">
        <Box
          className={`dealer-tab${activeTab === "Watches" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Watches")}
        >
          Watches ({watches.length})
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Followers" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers ({totalFollowersCount})
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Followings" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Followings")}
        >
          Followings ({apiDealer?.memberFollowings ?? 0})
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Articles" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Articles")}
        >
          Articles ({articles.length})
        </Box>
        <Box
          className={`dealer-tab${
            activeTab === "Contact Dealer" ? " dealer-tab-active" : ""
          }`}
          onClick={() => {
            if (!user?._id) {
              sweetToastErrorAlert("Please login or sign up first.").then();
              return;
            }
            setActiveTab("Contact Dealer");
          }}
        >
          Contact Dealer
        </Box>
      </Box>

      {activeTab === "Watches" && (
        <Box className="dealer-watches-container">
          <Typography className="dealer-watches-container-title">Watches</Typography>
          {watches.length === 0 ? (
            <Typography className="dealer-watches-empty-message">
              The dealer did not load the watch...
            </Typography>
          ) : (
            <>
              <Box className="dealer-watches-grid">
                {currentWatches.map((watch) => (
                  <Box key={watch.id} className="dealer-watch-item">
                    <Box className="dealer-watch-item-left">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="dealer-watch-item-image"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Box className="dealer-watch-item-icons">
                        <Box className="action-btn" onClick={(e) => handleAddToCart(watch, e)}>
                          <ShoppingBagOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                        </Box>
                        <Box 
                          className={`action-btn action-btn-with-count${likedWatches[String(watch.id)] ? " action-btn-liked" : ""}`}
                          onClick={(e) => handleLikeClick(watch.id, e)}
                        >
                          {likedWatches[String(watch.id)] ? (
                            <Favorite sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          ) : (
                            <FavoriteBorder sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          )}
                          {(watchLikes[String(watch.id)] ?? watch.likes ?? 0) > 0 && (
                            <span className="action-count">{watchLikes[String(watch.id)] ?? watch.likes ?? 0}</span>
                          )}
                        </Box>
                        <Box className="action-btn action-btn-with-count">
                          <VisibilityOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                          {watch.views && <span className="action-count">{watch.views}</span>}
                        </Box>
                        <Box className="action-btn action-btn-with-count">
                          <CommentOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                          {watch.comments && <span className="action-count">{watch.comments}</span>}
                        </Box>
                      </Box>
                    </Box>
                    <Box className="dealer-watch-item-right">
                      {watch.limitedEdition && (
                        <Typography className="dealer-watch-limited-edition">
                          Limited edition
                        </Typography>
                      )}
                      {watch.brand && (
                        <Typography className="dealer-watch-item-brand">
                          {watch.brand}
                        </Typography>
                      )}
                      <Typography 
                        className="dealer-watch-item-name"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {watch.name}
                      </Typography>
                      <Typography className="dealer-watch-item-price">
                        {watch.price}
                      </Typography>
                      {watch.datePosted && (
                        <Typography className="dealer-watch-item-date">
                          {watch.datePosted}
                        </Typography>
                      )}
                      {watch.watchStatus !== undefined && (
                        <Typography
                          className={`dealer-watch-item-status${
                            !watch.watchStatus ? " dealer-watch-item-status-sold-out" : ""
                          }`}
                        >
                          {watch.watchStatus ? "on sale" : "sold out"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              {totalPages > 1 && (
                <Box className="dealer-watches-pagination">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`dealer-watches-page-number${
                          page === currentPage ? " active" : ""
                        }`}
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </Box>
              )}
            </>
          )}
        </Box>
      )}

      {activeTab === "Followers" && (
        <Box className="dealer-followers-container">
          <Typography className="dealer-watches-container-title">Followers</Typography>
          {followersList.length === 0 ? (
            <Typography className="dealer-watches-empty-message">
              No Followers...
            </Typography>
          ) : (
            <>
              <Box className="dealer-followers-grid">
                {followersList.map((item: any) => {
                  const member = item.followerData;
                  const key = `followers-${item.followerId ?? item._id}`;
                  const isMe = user?._id != null && String(item.followerId) === String(user._id);
                  const isFollowerFollowing = isMe
                    ? isDealerFollowing
                    : (followersFollowing[key] !== undefined ? !!followersFollowing[key] : !!item.meFollowed?.[0]?.myFollowing);
                  const avatarUrl = member?.memberPhoto ? watchImageUrl(member.memberPhoto) : "";
                  return (
                    <Box key={key} className="dealer-followers-box">
                      <Box className="dealer-followers-box-part part-1">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={member?.memberName ?? "Follower"}
                            className="dealer-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="dealer-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="dealer-followers-box-part part-2">
                        <Typography className="dealer-followers-name">
                          {member?.memberName ?? "—"}
                          {isMe && " (You)"}
                        </Typography>
                        <Typography className="dealer-followers-role">User</Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-3">
                        <Typography className="dealer-followers-label">
                          Followers ({followersCounts[key] ?? member?.memberFollowers ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-4">
                        <Typography className="dealer-followers-label">
                          Followings ({member?.memberFollowings ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-5">
                        {!isMe && (
                          <Button
                            className={`dealer-follow-button${
                              isFollowerFollowing ? " dealer-follow-button-active" : ""
                            }`}
                            onClick={() => handleFollowMemberInList(key, String(item.followerId), isFollowerFollowing)}
                          >
                            {isFollowerFollowing ? "Unfollow" : "Follow"}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              {totalFollowersPages > 1 && (
                <Box className="dealer-watches-pagination">
                  {Array.from({ length: totalFollowersPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`dealer-watches-page-number${
                          page === followersPage ? " active" : ""
                        }`}
                        onClick={() => setFollowersPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </Box>
              )}
            </>
          )}
        </Box>
      )}

      {activeTab === "Followings" && (
        <Box className="dealer-followers-container">
          <Typography className="dealer-watches-container-title">Followings</Typography>
          {followingsList.length === 0 ? (
            <Typography className="dealer-watches-empty-message">
              No Followings...
            </Typography>
          ) : (
            <>
              <Box className="dealer-followers-grid">
                {followingsList.map((item: any) => {
                  const member = item.followingData;
                  const key = `followings-${item.followingId ?? item._id}`;
                  const isMe = user?._id != null && String(item.followingId) === String(user._id);
                  const isFollowerFollowing = followersFollowing[key] !== undefined ? !!followersFollowing[key] : !!item.meFollowed?.[0]?.myFollowing;
                  const avatarUrl = member?.memberPhoto ? watchImageUrl(member.memberPhoto) : "";
                  return (
                    <Box key={key} className="dealer-followers-box">
                      <Box className="dealer-followers-box-part part-1">
                        {avatarUrl ? (
                          <img
                            src={avatarUrl}
                            alt={member?.memberName ?? "User"}
                            className="dealer-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="dealer-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="dealer-followers-box-part part-2">
                        <Typography className="dealer-followers-name">
                          {member?.memberName ?? "—"}
                          {isMe && " (You)"}
                        </Typography>
                        <Typography className="dealer-followers-role">User</Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-3">
                        <Typography className="dealer-followers-label">
                          Followers ({followersCounts[key] ?? member?.memberFollowers ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-4">
                        <Typography className="dealer-followers-label">
                          Followings ({member?.memberFollowings ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-5">
                        {!isMe && (
                          <Button
                            className={`dealer-follow-button${
                              isFollowerFollowing ? " dealer-follow-button-active" : ""
                            }`}
                            onClick={() => handleFollowMemberInList(key, String(item.followingId), isFollowerFollowing)}
                          >
                            {isFollowerFollowing ? "Unfollow" : "Follow"}
                          </Button>
                        )}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              {totalFollowingsPages > 1 && (
                <Box className="dealer-watches-pagination">
                  {Array.from({ length: totalFollowingsPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`dealer-watches-page-number${
                          page === followingsPage ? " active" : ""
                        }`}
                        onClick={() => setFollowingsPage(page)}
                      >
                        {page}
                      </button>
                    );
                  })}
                </Box>
              )}
            </>
          )}
        </Box>
      )}

      {activeTab === "Articles" && (
        <Box className="dealer-followers-container">
          <Typography className="dealer-watches-container-title">Articles</Typography>
          <Box className="dealer-articles-box">
            {articles.length === 0 ? (
              <Typography className="dealer-watches-empty-message">
                The dealer did not load the article...
              </Typography>
            ) : (
              <>
                <Box className="dealer-articles-grid">
                  {currentArticles.map((article) => (
                    <Box key={article.id} className="dealer-article-card">
                      <Box className="dealer-article-header">
                        <Typography className="dealer-article-type">
                          {article.type}
                        </Typography>
                        <Typography className="dealer-article-date">
                          {article.date}
                        </Typography>
                      </Box>

                      <Box className="dealer-article-body">
                        <Box
                          className="dealer-article-title"
                          onClick={() => handleArticleClick(article.id)}
                          sx={{ cursor: "pointer" }}
                        >
                          <Typography className="dealer-article-title-text">
                            {article.title}
                          </Typography>
                        </Box>
                        <Box className="dealer-article-excerpt">
                          <Typography className="dealer-article-excerpt-text">
                            {getArticleExcerpt(article.content, 15)}
                          </Typography>
                        </Box>

                        <Box className="dealer-article-actions">
                          <Box
                            className="dealer-article-read-more"
                            onClick={() => handleArticleClick(article.id)}
                            sx={{ cursor: "pointer" }}
                          >
                            <Typography className="dealer-article-read-more-text">
                              Read more
                            </Typography>
                            <ArrowForwardIos className="dealer-article-read-more-arrow" />
                          </Box>
                          <Box className="dealer-article-actions-right">
                            <Box className="dealer-article-action">
                              <VisibilityOutlined
                                sx={{ fontSize: 22, color: "#000000" }}
                              />
                              {article.views !== undefined && (
                                <Typography className="dealer-article-action-count">
                                  {article.views}
                                </Typography>
                              )}
                            </Box>
                            <Box
                              className="dealer-article-action"
                              onClick={() =>
                                handleArticleLikeClick(article.id)
                              }
                            >
                              {articleLiked[String(article.id)] ? (
                                <Favorite
                                  sx={{ fontSize: 22, color: "#f09620" }}
                                />
                              ) : (
                                <FavoriteBorder
                                  sx={{ fontSize: 22, color: "#000000" }}
                                />
                              )}
                              <Typography className="dealer-article-action-count">
                                {articleLikes[String(article.id)] ??
                                  article.likes ??
                                  0}
                              </Typography>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  ))}
                </Box>

                {totalArticlePages > 1 && (
                  <Box className="dealer-watches-pagination">
                    {Array.from({ length: totalArticlePages }).map(
                      (_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            className={`dealer-watches-page-number${
                              page === articlePage ? " active" : ""
                            }`}
                            onClick={() => setArticlePage(page)}
                          >
                            {page}
                          </button>
                        );
                      }
                    )}
                  </Box>
                )}
              </>
            )}
          </Box>
        </Box>
      )}

      {activeTab === "Contact Dealer" && (
        <Box className="dealer-followers-container">
          <Typography className="dealer-watches-container-title cs-contact-title">
            Contact Dealer
          </Typography>

          <Box id="cs-contact-section" className="cs-contact-section">
            <Box className="cs-contact-container">
              <Box className="cs-contact-form">
                <Typography className="cs-contact-form-title">
                  Tell Us Your Message
                </Typography>

                <Box className="cs-contact-form-group">
                  <Typography className="cs-contact-label">
                    Your Name <span className="cs-contact-required">*</span>
                  </Typography>
                  <input
                    className="cs-contact-input"
                    type="text"
                    placeholder="Full Name..."
                  />
                </Box>

                <Box className="cs-contact-form-group">
                  <Typography className="cs-contact-label">
                    Your Email <span className="cs-contact-required">*</span>
                  </Typography>
                  <input
                    className="cs-contact-input"
                    type="email"
                    placeholder="Email Address..."
                  />
                </Box>

                <Box className="cs-contact-form-group">
                  <Typography className="cs-contact-label">
                    Subject
                  </Typography>
                  <input
                    className="cs-contact-input"
                    type="text"
                    placeholder="Subject..."
                  />
                </Box>

                <Box className="cs-contact-form-group">
                  <Typography className="cs-contact-label">
                    Your Message
                  </Typography>
                  <textarea
                    className="cs-contact-textarea"
                    placeholder="Message..."
                  />
                </Box>

                <Button
                  className="cs-contact-submit"
                  onClick={() => {
                    if (!user?._id) {
                      sweetToastErrorAlert("Please login or sign up first.").then();
                      return;
                    }
                    // TODO: send message logic
                  }}
                >
                  Send Message
                  <ArrowForward className="cs-contact-submit-icon" />
                </Button>
              </Box>

              <Box className="cs-contact-info">
                <Typography className="cs-contact-info-title">
                  Contact Dealer
                </Typography>
                <Typography className="cs-contact-info-text">
                  We&apos;re here to help.
                  <br />
                  If you have any questions or requests regarding this dealer,
                  please send us a message. Our team will review your request
                  and get back to you as soon as possible.
                  <br />
                  Thank you for using TIMORY.
                </Typography>
                <Box className="cs-contact-info-block">
                  <Typography className="cs-contact-info-heading">
                    <span className="cs-contact-info-icon"></span>
                    Address:
                  </Typography>
                  <Typography className="cs-contact-info-line">
                    29 Banryong-ro 28beongil, Buk-gu, Gwangju, South Korea
                  </Typography>
                </Box>

                <Box className="cs-contact-info-block">
                  <Typography className="cs-contact-info-heading">
                    <span className="cs-contact-info-icon"></span>
                    Email:
                  </Typography>
                  <Typography className="cs-contact-info-line">
                    ahmadalievd382@gmail.com
                  </Typography>
                  <Typography className="cs-contact-info-line">
                    ahmadalievd384@gmail.com
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

    </Stack>
  );
};

export default withLayoutBasic(DealerDetailPage);


