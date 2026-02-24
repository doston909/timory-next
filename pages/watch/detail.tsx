import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { useTranslation } from "@/libs/context/useTranslation";

import PopularWatchesCard, {
  PopularWatch,
} from "@/libs/components/homepage/PopularWatchesCard";
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useReactiveVar, useQuery, useMutation } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { GET_WATCH, GET_COMMENTS } from "@/apollo/user/query";
import { CREATE_COMMENT, UPDATE_COMMENT, REMOVE_COMMENT, LIKE_TARGET_WATCH } from "@/apollo/user/mutation";
import { watchImageUrl } from "@/libs/utils";
import { useCart } from "@/libs/context/CartContext";
import {
  getWatchStatus,
  isWatchDeletedForVisitor,
} from "@/libs/watchStatusStorage";
import { incrementViewCount } from "@/libs/viewCountStorage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { ArrowForward } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "@mui/icons-material/Comment";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Person from "@mui/icons-material/Person";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Close from "@mui/icons-material/Close";
import { sweetToastErrorAlert } from "@/libs/sweetAlert";

const WatchDetail = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const { t } = useTranslation();
  const user = useReactiveVar(userVar);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedReviews, setLikedReviews] = useState<string[]>([]);
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const [newReviewText, setNewReviewText] = useState("");
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuReviewId, setOpenMenuReviewId] = useState<string | null>(null);
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);
  const [editedCommentIds, setEditedCommentIds] = useState<Set<string>>(new Set());
  const { addToCart } = useCart();

  const reviewsListRef = useRef<HTMLDivElement>(null);
  const reviewItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const watchIdParam = router.query.id;
  const watchIdStr =
    typeof watchIdParam === "string"
      ? watchIdParam
      : Array.isArray(watchIdParam)
        ? watchIdParam[0]
        : undefined;
  const watchId = watchIdStr ?? null;

  const { data: watchData, loading: watchLoading, error: watchError, refetch: refetchWatch } = useQuery(GET_WATCH, {
    variables: { watchId: watchIdStr ?? "" },
    skip: !watchIdStr,
    fetchPolicy: "network-only",
  });
  const apiWatch = watchData?.getWatch;

  const { data: commentsData, refetch: refetchComments } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        search: { commentRefId: watchIdStr ?? "" },
      },
    },
    skip: !watchIdStr,
    fetchPolicy: "network-only",
  });

  const apiCommentsList = commentsData?.getComments?.list ?? [];

  const [createCommentMutation, { loading: commentSubmitting }] = useMutation(CREATE_COMMENT, {
    refetchQueries: watchIdStr
      ? [
          { query: GET_WATCH, variables: { watchId: watchIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: { page: 1, limit: 500, search: { commentRefId: watchIdStr } },
            },
          },
        ]
      : [],
  });

  const [updateCommentMutation, { loading: commentUpdating }] = useMutation(UPDATE_COMMENT, {
    refetchQueries: watchIdStr
      ? [
          { query: GET_WATCH, variables: { watchId: watchIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: { page: 1, limit: 500, search: { commentRefId: watchIdStr } },
            },
          },
        ]
      : [],
  });

  const [removeCommentMutation] = useMutation(REMOVE_COMMENT, {
    refetchQueries: watchIdStr
      ? [
          { query: GET_WATCH, variables: { watchId: watchIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: { page: 1, limit: 500, search: { commentRefId: watchIdStr } },
            },
          },
        ]
      : [],
  });

  const [likeTargetWatchMutation] = useMutation(LIKE_TARGET_WATCH, {
    refetchQueries: watchIdStr ? [{ query: GET_WATCH, variables: { watchId: watchIdStr } }] : [],
  });

  const watchCommentsCount = apiWatch?.watchComments ?? 0;
  const watchLikesCount = apiWatch?.watchLikes ?? 0;
  const isWatchLiked = (apiWatch?.meLiked != null && apiWatch.meLiked.length > 0) ?? false;

  type ReviewItem = {
    id: string;
    date: string;
    author: string;
    text: string;
    memberId: string;
    isEdited: boolean;
  };
  const allReviews: ReviewItem[] = useMemo(
    () =>
      apiCommentsList.map((c: any) => {
        const created = c.createdAt ? new Date(c.createdAt).getTime() : 0;
        const updated = c.updatedAt ? new Date(c.updatedAt).getTime() : 0;
        const isEdited =
          (updated > 0 && updated > created) ||
          (c.updatedAt != null && c.createdAt != null && String(c.updatedAt) !== String(c.createdAt));
        return {
          id: c._id,
          date: c.createdAt
            ? new Date(c.createdAt).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            : "",
          author: c.memberData?.memberName ?? "—",
          text: c.commentContent ?? "",
          memberId: c.memberId ?? "",
          isEdited,
        };
      }),
    [apiCommentsList]
  );
  const mostRecentLimit = 200;
  const sortedReviews = [...allReviews].slice(0, mostRecentLimit);
  const reviewsCount = sortedReviews.length;
  const isCommentAuthor = (memberId: string) =>
    user?._id != null && String(user._id) === String(memberId);

  const handleReviewMenuOpen = (event: React.MouseEvent<HTMLElement>, reviewId: string) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setOpenMenuReviewId(reviewId);
  };

  const handleReviewMenuClose = () => {
    setMenuAnchorEl(null);
    setOpenMenuReviewId(null);
  };

  const handleEditReview = (commentId: string) => {
    handleReviewMenuClose();
    const review = allReviews.find((r) => r.id === commentId);
    if (review) {
      setNewReviewText(review.text);
      setEditingReviewId(commentId);
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setNewReviewText("");
  };

  const handleDeleteReview = async (commentId: string) => {
    handleReviewMenuClose();
    try {
      await removeCommentMutation({ variables: { commentId } });
    } catch (err) {
      if (typeof window !== "undefined") console.error("removeComment error:", err);
    }
  };

  const handleSubmitReview = async () => {
    const text = newReviewText.trim();
    if (!text) return;
    if (editingReviewId !== null) {
      try {
        await updateCommentMutation({
          variables: {
            input: {
              _id: editingReviewId,
              commentContent: text.slice(0, 100),
            },
          },
        });
        setEditedCommentIds((prev) => new Set(prev).add(editingReviewId));
        setEditingReviewId(null);
        setNewReviewText("");
      } catch (err) {
        if (typeof window !== "undefined") console.error("updateComment error:", err);
      }
      return;
    }
    // Yangi comment — faqat login qilgan member yoza oladi
    if (!watchIdStr) return;
    if (!user?._id) {
      sweetToastErrorAlert("Please log in or sign up to like and comment.").then();
      return;
    }
    try {
      await createCommentMutation({
        variables: {
          input: {
            commentGroup: "WATCH",
            commentContent: text.slice(0, 100),
            commentRefId: watchIdStr,
          },
        },
      });
      setNewReviewText("");
    } catch (err) {
      if (typeof window !== "undefined") console.error("createComment error:", err);
    }
  };

  // Calculate height for last 2 reviews dynamically
  useLayoutEffect(() => {
    if (reviewsListRef.current && reviewItemsRef.current.length >= 2) {
      const firstReview = reviewItemsRef.current[0];
      const secondReview = reviewItemsRef.current[1];

      if (firstReview && secondReview) {
        const totalHeight =
          firstReview.offsetHeight + secondReview.offsetHeight + 50;
        reviewsListRef.current.style.maxHeight = `${totalHeight}px`;
      }
    } else if (reviewsListRef.current && reviewItemsRef.current.length === 1) {
      const firstReview = reviewItemsRef.current[0];
      if (firstReview) {
        reviewsListRef.current.style.maxHeight = `${
          firstReview.offsetHeight + 25
        }px`;
      }
    }
  }, [sortedReviews, reviewsCount]);

  const defaultWatchData = {
    brand: "",
    color: "",
    caseShape: "",
    waterResistance: "",
    vendor: "",
    type: "",
    data: "",
    country: "",
    availability: 0,
    viewers: 0,
    sold: 0,
    soldHours: 0,
  };

  const watchFromApi = useMemo(() => {
    if (!apiWatch) return null;
    const priceStr = apiWatch.watchPrice != null
      ? `$ ${Number(apiWatch.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}`
      : "";
    const img0 = watchImageUrl(apiWatch.watchImages?.[0]);
    return {
      ...defaultWatchData,
      id: apiWatch._id,
      name: apiWatch.watchModelName ?? "",
      price: priceStr,
      image: img0,
      brand: apiWatch.watchBrand ?? "",
      color: apiWatch.watchColor ?? "",
      caseShape: apiWatch.watchCaseShape ?? "",
      waterResistance:
        apiWatch.watchWaterResistance != null
          ? `${Number(apiWatch.watchWaterResistance)} m`
          : "—",
      type: apiWatch.watchType ?? "",
      data: apiWatch.watchMakeData ?? "",
      country: apiWatch.watchCountry ?? "",
      availability: apiWatch.watchAvailability ?? 0,
      viewers: apiWatch.watchViews ?? 0,
    };
  }, [apiWatch]);

  const watch = watchFromApi;

  const getSecondImage = (image: string) => {
    if (image.includes("rasm1")) return image.replace("rasm1", "rasm2");
    if (image.includes("rasm2")) return image.replace("rasm2", "rasm3");
    if (image.includes("rasm3")) return image.replace("rasm3", "rasm1");
    if (image.includes("rasmm.png"))
      return image.replace("rasmm.png", "rasmm2.png");
    if (image.includes("rasmm2")) return image.replace("rasmm2", "rasmm");
    return image;
  };

  const images =
    apiWatch?.watchImages?.length
      ? apiWatch.watchImages.length >= 2
        ? [watchImageUrl(apiWatch.watchImages[0]), watchImageUrl(apiWatch.watchImages[1])]
        : watch
          ? [watch.image, getSecondImage(watch.image)]
          : []
      : watch
        ? [watch.image, getSecondImage(watch.image)]
        : [];

  const storedStatus = watchId != null ? getWatchStatus(String(watchId)) : undefined;
  const isDeletedForVisitor =
    watchId != null && isWatchDeletedForVisitor(String(watchId), user?._id);
  const availabilityText = watch
    ? (storedStatus?.status === "sold_out" ? "sold out" : String(watch.availability))
    : "";

  useEffect(() => {
    if (watchId != null) {
      incrementViewCount(String(watchId));
    }
  }, [watchId]);

  if (!router.isReady || (watchIdStr && watchLoading)) {
    return (
      <Stack className="watch-detail-page">
        <Box className="watch-detail-main" sx={{ p: 3, textAlign: "center" }}>
          <Typography>Loading...</Typography>
        </Box>
      </Stack>
    );
  }
  if (!watch) {
    return (
      <Stack className="watch-detail-page">
        <Box className="watch-detail-main" sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">
            {watchIdStr ? "Watch not found." : "No watch selected."}
          </Typography>
          {watchError && (
            <Typography sx={{ mt: 1, fontSize: 14, color: "text.secondary" }}>
              {watchError.message}
            </Typography>
          )}
          {watchIdStr && (
            <Typography sx={{ mt: 0.5, fontSize: 12, color: "text.secondary" }}>
              ID: {watchIdStr}
            </Typography>
          )}
          <Button onClick={() => router.push("/watch")} sx={{ mt: 2 }}>
            Back to list
          </Button>
        </Box>
      </Stack>
    );
  }

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const popularWatches: PopularWatch[] = [];

  if (isDeletedForVisitor) {
    return (
      <Stack className="watch-detail-page">
        <Box className="watch-detail-main" sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">This watch is no longer available.</Typography>
          <Button onClick={() => router.back()} sx={{ mt: 2 }}>
            Go back
          </Button>
        </Box>
      </Stack>
    );
  }

  if (device === "mobile") {
    return (
      <Stack className="watch-detail-page">
        <Box className="watch-detail-main" sx={{ p: 3, textAlign: "center" }}>
          <Typography>WATCH DETAIL MOBILE</Typography>
        </Box>
      </Stack>
    );
  }

  return (
    <Stack className="watch-detail-page">
      <Box className="watch-detail-main">
        {/* Product Image Section */}
        <Box className="watch-image-section">
          <img
            src={images[currentImageIndex]}
            alt={watch.name}
            className="watch-main-image"
          />

          {/* Pagination Buttons */}
          {images.length > 1 && (
            <>
              <IconButton
                className="watch-scroll-arrow watch-scroll-arrow-left"
                aria-label="Previous"
                onClick={handlePrev}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className="watch-scroll-arrow watch-scroll-arrow-right"
                aria-label="Next"
                onClick={handleNext}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Product Info Section */}
        <Box className="watch-info-section">
          {/* Product Name & Price */}
          <Typography className="watch-detail-name">{watch.name}</Typography>

          {/* Product Details */}
          <Box className="watch-details">
            <Box className="detail-item">
              <Typography className="detail-label">Brand:</Typography>
              <Typography className="detail-value">{watch.brand}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Price:</Typography>
              <Typography className="detail-value">{watch.price}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Color:</Typography>
              <Box className="color-preview" />
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Case Shape:</Typography>
              <Typography className="detail-value">
                {watch.caseShape}
              </Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">
                Water Resistance:
              </Typography>
              <Typography className="detail-value">
                {watch.waterResistance}
              </Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">{t("detail.type")}</Typography>
              <Typography className="detail-value">{watch.type}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">{t("detail.data")}</Typography>
              <Typography className="detail-value">{watch.data}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">{t("detail.madeIn")}</Typography>
              <Typography className="detail-value">{watch.country}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">{t("detail.availability")}</Typography>
              <Typography className="detail-value availability">
                {availabilityText}
              </Typography>
            </Box>{" "}
            <Box className="detail-item">
              <Typography className="detail-label">{t("detail.dealer")}</Typography>
              <Typography className="detail-value availability">
                {apiWatch?.memberData?.memberName ?? "—"}
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box className="action-buttons">
            <Button 
              className="action-btn add-to-cart-btn"
              onClick={() => {
                addToCart({
                  id: watch.id,
                  image: watch.image,
                  name: watch.name,
                  model: watch.name,
                  brand: "",
                  price: parseFloat(String(watch.price).replace(/[^0-9.-]+/g, "")) || 0,
                  quantity: 1,
                  dealerId: apiWatch?.memberId ?? apiWatch?.memberData?._id,
                });
              }}
            >
              {t("detail.addToWishlist")} <ArrowForward sx={{ ml: 1 }} />
            </Button>
            <Button
              className="action-btn contact-dealer-btn"
              onClick={() => {
                if (!user?._id) {
                  sweetToastErrorAlert("Please login or sign up first.").then();
                  return;
                }
                const dealerId = apiWatch?.memberId ?? apiWatch?.memberData?._id;
                if (dealerId) router.push(`/dealer/detail?id=${dealerId}&tab=contact`);
              }}
            >
              {t("detail.contactDealer")} <ArrowForward sx={{ ml: 1 }} />
            </Button>
          </Box>

          {/* Engagement Metrics */}
          <Box className="engagement-metrics">
            <Box className="metric-item">
              <VisibilityIcon className="metric-icon" />
              <Typography className="metric-text">
                {watch.viewers} {t("detail.peopleViewing")}
              </Typography>
            </Box>
            <Box
              className="metric-item"
              onClick={(e) => {
                e.stopPropagation();
                if (!user?._id) {
                  sweetToastErrorAlert("Please log in or sign up to like and comment.").then();
                  return;
                }
                if (watchIdStr)
                  likeTargetWatchMutation({ variables: { input: watchIdStr } });
              }}
              sx={{ cursor: "pointer" }}
            >
              {isWatchLiked ? (
                <FavoriteIcon className="metric-icon" sx={{ color: "#c00" }} />
              ) : (
                <FavoriteBorderIcon className="metric-icon" />
              )}
              <Typography className="metric-text">
                {watchLikesCount} Likes
              </Typography>
            </Box>
            <Box className="metric-item">
              <LocalFireDepartmentIcon className="metric-icon" />
              <Typography className="metric-text">
                {t("detail.soldProducts").replace("{sold}", String(watch.sold)).replace("{hours}", String(watch.soldHours))}
              </Typography>
            </Box>
          </Box>

          {/* Back Link */}
          <Box className="watch-back-wrapper">
            <Box className="see-all-text" onClick={() => router.push("/watch")}>
              {t("detail.back")} <ArrowForward className="see-all-arrow" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        className="watch-tabs"
        sx={{
          display: "flex",
          gap: "40px",
          "& .MuiTab-root": {
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: "24px !important",
            color: "#1a1a1a",
            textTransform: "none",
            padding: "12px 24px",
            minHeight: "50px",
            backgroundColor: "#ffffff",
            border: "1px solid #1a1a1a",
            borderRadius: "8px",
            marginRight: "10px !important",
            "&:last-of-type": {
              marginRight: "0 !important",
            },
            position: "relative",
            flex: "0 0 auto",
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            },

            "&.Mui-selected": {
              color: "#D4B890 !important",
              backgroundColor: "#8C7360 !important",
              borderColor: "#8C7360 !important",
              fontWeight: 400,
              zIndex: 1,
            },
            "&:hover:not(.Mui-selected)": {
              backgroundColor: "#ffffff",
              color: "#1a1a1a",
              borderColor: "#1a1a1a",
            },
          },
          "& .MuiTabs-indicator": {
            display: "none !important",
          },
        }}
      >
        <Tab label={t("detail.tabDescription")} />
        <Tab label={t("detail.tabShoppingInfo")} />
        <Tab label={t("detail.tabReviews")} />
      </Tabs>

      {/* Description/Reviews Section */}
      <Box
        className={`watch-tabs-section ${
          activeTab === 2 ? "reviews-active" : ""
        }`}
      >
        <Box className="tab-content">
          {activeTab === 0 && (
            <Box className="description-content">
              <Typography className="description-text">
                {apiWatch?.watchDescription ?? ""}
              </Typography>
            </Box>
          )}
          {activeTab === 1 && (
            <Box className="shipping-content">
              <Typography className="description-text">
                Returns Policy <br />
                You may return most new, unopened items within 30 days of
                delivery for a full refund. We'll also pay the return shipping
                costs if the return is a result of our error (you received an
                incorrect or defective item, etc.).<br /> You should expect to receive
                your refund within four weeks of giving your package to the
                return shipper, however, in many cases you will receive a refund
                more quickly. This time period includes the transit time for us
                to receive your return from the shipper (5 to 10 business days),
                the time it takes us to process your return once we receive it
                (3 to 5 business days), and the time it takes your bank to
                process our refund request (5 to 10 business days).<br /> If you need
                to return an item, simply login to your account, view the order
                using the 'Complete Orders' link under the My Account menu and
                click the Return Item(s) button. We'll notify you via e-mail of
                your refund once we've received and processed the returned item
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box className="reviews-content">
              <Box className="reviews-title-wrapper">
                <Comment className="reviews-title-icon" />
                <Typography className="reviews-title">
                  {watchCommentsCount} {watchCommentsCount !== 1 ? t("detail.reviewCountPlural") : t("detail.reviewCount")}
                </Typography>
              </Box>

              {/* Existing Reviews — birinchi 2 ta ko‘rinadi, qolgani scroll */}
              <Box
                className="reviews-list"
                ref={reviewsListRef}
                sx={{ overflowY: "auto" }}
              >
                {watchCommentsCount === 0 ? (
                  <Box className="no-reviews">
                    <Typography className="no-reviews-text">
                      {t("detail.noReview")}
                    </Typography>
                  </Box>
                ) : (
                  sortedReviews.map((review, index) => (
                    <Box
                      key={review.id}
                      className="review-item"
                      ref={(el: HTMLDivElement | null) => {
                        reviewItemsRef.current[index] = el;
                      }}
                    >
                      <Typography className="review-number">
                        {reviewsCount - index}.
                      </Typography>
                      <Box className="review-content">
                        <Box className="review-meta">
                          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box component="span" className="review-meta-item">
                              <CalendarToday className="review-meta-icon" />
                              <Typography component="span" className="review-meta-text">
                                {review.date}
                              </Typography>
                            </Box>
                            <Box component="span" className="review-meta-item">
                              <Person className="review-meta-icon" />
                              <Typography component="span" className="review-meta-text">
                                {review.author}
                              </Typography>
                            </Box>
                          </Box>
                          {editingReviewId !== review.id && isCommentAuthor(review.memberId) && (
                            <IconButton
                              className="review-more-btn"
                              size="small"
                              onClick={(e) => handleReviewMenuOpen(e, review.id)}
                              sx={{ padding: "4px" }}
                            >
                              <MoreHoriz sx={{ fontSize: 22, color: "#8c6f5a" }} />
                            </IconButton>
                          )}
                        </Box>
                        <Box className="review-text-wrapper">
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", width: "100%" }}>
                            <Typography className="review-text">
                              {review.text}
                            </Typography>
                            <Box className="review-actions">
                              <Box className="review-reply-btn">
                                <ReplyIcon className="reply-icon" />
                              </Box>
                              <Box
                                className={`review-like-btn ${
                                  likedReviews.includes(review.id) ? "liked" : ""
                                }`}
                                onClick={() => {
                                  if (likedReviews.includes(review.id)) {
                                    setLikedReviews(
                                      likedReviews.filter((id) => id !== review.id)
                                    );
                                    setLikeCounts((prev) => ({
                                      ...prev,
                                      [review.id]: (prev[review.id] || 2) - 1,
                                    }));
                                  } else {
                                    setLikedReviews([...likedReviews, review.id]);
                                    setLikeCounts((prev) => ({
                                      ...prev,
                                      [review.id]: (prev[review.id] || 2) + 1,
                                    }));
                                  }
                                }}
                              >
                                {likedReviews.includes(review.id) ? (
                                  <FavoriteIcon className="like-icon" />
                                ) : (
                                  <FavoriteBorderIcon className="like-icon" />
                                )}
                                <Box className="like-badge">
                                  {likeCounts[review.id] || 2}
                                </Box>
                              </Box>
                            </Box>
                          </Box>
                          {(review.isEdited || editedCommentIds.has(review.id)) && (
                            <Typography className="review-edited">
                              {t("detail.edited")}
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleReviewMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    "& .MuiMenuItem-root": {
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    if (openMenuReviewId !== null) handleEditReview(openMenuReviewId);
                  }}
                >
                  {t("detail.edit")}
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (openMenuReviewId !== null) handleDeleteReview(openMenuReviewId);
                  }}
                >
                  {t("detail.delete")}
                </MenuItem>
              </Menu>

              {/* Review Form */}
              <Box className="review-form">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                  <Typography className="review-form-title">
                    {editingReviewId !== null ? t("detail.editReview") : t("detail.leaveReview")}
                  </Typography>
                  {editingReviewId !== null && (
                    <IconButton
                      size="small"
                      onClick={handleCancelEdit}
                      sx={{ color: "#8c6f5a" }}
                      aria-label="Cancel edit"
                    >
                      <Close sx={{ fontSize: 24 }} />
                    </IconButton>
                  )}
                </Box>
                <Box className="review-form-row"></Box>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder={t("detail.messagePlaceholder")}
                  className="review-textarea"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                      paddingTop: "16px !important",
                    },
                    "& textarea": {
                      paddingTop: "16px !important",
                      resize: "none !important",
                      overflowY: "auto !important",
                      overflowX: "hidden !important",
                    },
                    "& .MuiOutlinedInput-root": {
                      overflow: "hidden !important",
                    },
                  }}
                />
                <Box className="review-submit-wrapper">
                  <Button className="review-submit-btn" onClick={handleSubmitReview} disabled={commentSubmitting || commentUpdating}>
                    {commentSubmitting || commentUpdating ? (t("detail.sending") || "Yuborilmoqda...") : t("detail.postComment")}
                    <ArrowForward sx={{ ml: 1, fontSize: 22 }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default withLayoutBasic(WatchDetail);
