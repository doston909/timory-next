import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { communityComments } from "@/libs/data/communityComments";
import { useTranslation } from "@/libs/context/useTranslation";
import {
  Stack,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import { NextPage } from "next";
import {
  CalendarToday,
  Comment,
  Person,
  ArrowForward,
} from "@mui/icons-material";
import PermIdentityOutlinedIcon from "@mui/icons-material/PermIdentityOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Close from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useLayoutEffect, useMemo } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { GET_BOARD_ARTICLE, GET_COMMENTS } from "@/apollo/user/query";
import {
  LIKE_TARGET_BOARD_ARTICLE,
  CREATE_COMMENT,
  UPDATE_COMMENT,
  REMOVE_COMMENT,
} from "@/apollo/user/mutation";
import { watchImageUrl, articleImageUrl } from "@/libs/utils";
import { sweetToastErrorAlert } from "@/libs/sweetAlert";

// Articles data - index.tsx dagi bilan bir xil

const CommunityDetail: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useReactiveVar(userVar);
  const articleId = router.query.id || router.query.articleId;
  const articleIdStr =
    typeof articleId === "string"
      ? articleId
      : Array.isArray(articleId)
      ? articleId[0]
      : undefined;
  const [article, setArticle] = useState<any>(null);
  const isStaticId = typeof articleId === "string" && /^[1-6]$/.test(articleId);
  const {
    data: articleData,
    error: articleError,
    refetch: refetchArticle,
  } = useQuery(GET_BOARD_ARTICLE, {
    variables: { articleId: articleIdStr ?? "" },
    skip: !articleIdStr || isStaticId,
    fetchPolicy: "network-only",
  });
  const apiArticle = articleData?.getBoardArticle;
  const { data: commentsData } = useQuery(GET_COMMENTS, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        search: { commentRefId: articleIdStr ?? "" },
      },
    },
    skip: !articleIdStr || isStaticId,
  });
  const [likeTargetArticleMutation] = useMutation(LIKE_TARGET_BOARD_ARTICLE, {
    refetchQueries: articleIdStr
      ? [{ query: GET_BOARD_ARTICLE, variables: { articleId: articleIdStr } }]
      : [],
  });
  const [createCommentMutation] = useMutation(CREATE_COMMENT, {
    refetchQueries: articleIdStr
      ? [
          { query: GET_BOARD_ARTICLE, variables: { articleId: articleIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: {
                page: 1,
                limit: 500,
                search: { commentRefId: articleIdStr },
              },
            },
          },
        ]
      : [],
  });
  const [updateCommentMutation] = useMutation(UPDATE_COMMENT, {
    refetchQueries: articleIdStr
      ? [
          { query: GET_BOARD_ARTICLE, variables: { articleId: articleIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: {
                page: 1,
                limit: 500,
                search: { commentRefId: articleIdStr },
              },
            },
          },
        ]
      : [],
  });
  const [removeCommentMutation] = useMutation(REMOVE_COMMENT, {
    refetchQueries: articleIdStr
      ? [
          { query: GET_BOARD_ARTICLE, variables: { articleId: articleIdStr } },
          {
            query: GET_COMMENTS,
            variables: {
              input: {
                page: 1,
                limit: 500,
                search: { commentRefId: articleIdStr },
              },
            },
          },
        ]
      : [],
  });
  const apiCommentsList = commentsData?.getComments?.list ?? [];
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [newCommentText, setNewCommentText] = useState("");
  const [extraComments, setExtraComments] = useState<
    { id: number; date: string; author: string; text: string }[]
  >([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<
    number | string | null
  >(null);
  const [deletedCommentIds, setDeletedCommentIds] = useState<
    (number | string)[]
  >([]);
  const [editingCommentId, setEditingCommentId] = useState<
    number | string | null
  >(null);
  const [editedCommentTexts, setEditedCommentTexts] = useState<
    Record<string, string>
  >({});

  // Refs for dynamic height calculation - HOOKS TEPADA BO'LISHI KERAK
  const commentsListRef = useRef<HTMLDivElement>(null);
  const commentItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const isArticleFromApi = Boolean(articleIdStr && !isStaticId && article?.id);
  const apiCommentsMapped = useMemo(() => {
    if (!isArticleFromApi) return [];
    return apiCommentsList.map((c: any) => {
      const created = c.createdAt ? new Date(c.createdAt).getTime() : 0;
      const updated = c.updatedAt ? new Date(c.updatedAt).getTime() : 0;
      const isEdited =
        (updated > 0 && updated > created) ||
        (c.updatedAt != null &&
          c.createdAt != null &&
          String(c.updatedAt) !== String(c.createdAt));
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
    });
  }, [isArticleFromApi, apiCommentsList]);
  const baseComments = isArticleFromApi
    ? []
    : communityComments.slice(0, article?.comments ?? 0);
  const allComments = isArticleFromApi
    ? apiCommentsMapped
    : [...baseComments, ...extraComments].filter(
        (c) => !deletedCommentIds.includes(c.id)
      );
  const sortedComments = [...allComments];
  const commentsCount = allComments.length;
  const isCommentAuthor = (memberId: string) =>
    user?._id != null && String(user._id) === String(memberId);
  const articleLikesCount = isArticleFromApi
    ? apiArticle?.articleLikes ?? 0
    : 0;
  const isArticleLiked =
    isArticleFromApi &&
    ((apiArticle?.meLiked != null && apiArticle.meLiked.length > 0) ?? false);

  const handleCommentMenuOpen = (
    event: React.MouseEvent<HTMLElement>,
    commentId: number | string
  ) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setOpenMenuCommentId(commentId);
  };

  const handleCommentMenuClose = () => {
    setMenuAnchorEl(null);
    setOpenMenuCommentId(null);
  };

  const handleEditComment = (commentId: number | string) => {
    handleCommentMenuClose();
    const comment = allComments.find((c: any) => c.id === commentId);
    if (comment) {
      setNewCommentText(editedCommentTexts[String(commentId)] ?? comment.text);
      setEditingCommentId(commentId);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setNewCommentText("");
  };

  const handleDeleteComment = async (commentId: number | string) => {
    if (isArticleFromApi && typeof commentId === "string") {
      try {
        await removeCommentMutation({ variables: { commentId } });
      } catch (err) {
        if (typeof window !== "undefined")
          console.error("removeComment error:", err);
      }
      handleCommentMenuClose();
      return;
    }
    setDeletedCommentIds((prev) => [...prev, commentId]);
    setExtraComments((prev) => prev.filter((c) => c.id !== commentId));
    handleCommentMenuClose();
  };

  const handleSubmitComment = async () => {
    const text = newCommentText.trim();
    if (!text) return;
    if (isArticleFromApi) {
      if (editingCommentId !== null && typeof editingCommentId === "string") {
        try {
          await updateCommentMutation({
            variables: {
              input: {
                _id: editingCommentId,
                commentContent: text.slice(0, 100),
              },
            },
          });
          setEditingCommentId(null);
          setNewCommentText("");
        } catch (err) {
          if (typeof window !== "undefined")
            console.error("updateComment error:", err);
        }
        return;
      }
      if (!user?._id) {
        sweetToastErrorAlert("Please log in or sign up to like and comment.").then();
        return;
      }
      try {
        await createCommentMutation({
          variables: {
            input: {
              commentGroup: "ARTICLE",
              commentContent: text.slice(0, 100),
              commentRefId: articleIdStr,
            },
          },
        });
        setNewCommentText("");
      } catch (err) {
        if (typeof window !== "undefined")
          console.error("createComment error:", err);
      }
      return;
    }
    if (editingCommentId !== null) {
      const baseCommentsList = communityComments.slice(
        0,
        article?.comments ?? 0
      );
      const comment = [...baseCommentsList, ...extraComments].find(
        (c) => c.id === editingCommentId
      );
      const originalText = comment?.text ?? "";
      if (text !== originalText) {
        setEditedCommentTexts((prev) => ({
          ...prev,
          [String(editingCommentId)]: text,
        }));
      } else {
        setEditedCommentTexts((prev) => {
          const next = { ...prev };
          delete next[String(editingCommentId)];
          return next;
        });
      }
      setExtraComments((prev) =>
        prev.map((c) => (c.id === editingCommentId ? { ...c, text } : c))
      );
      setEditingCommentId(null);
      setNewCommentText("");
    } else {
      setExtraComments((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }),
          author: "You",
          text,
        },
      ]);
      setNewCommentText("");
    }
  };

  useEffect(() => {
    if (!router.isReady || !articleId) return;
    if (isStaticId) {
      // Old statik maqolalar ro'yxati olib tashlangan,
      // statik id bo'lsa community sahifasiga qaytaramiz
      router.push("/community");
      return;
    }
    if (articleData?.getBoardArticle) {
      const a = articleData.getBoardArticle;
      setArticle({
        id: a._id,
        image: articleImageUrl(a.articleImage),
        title: a.articleTitle ?? "",
        content: a.articleContent ?? "",
        date: a.createdAt
          ? new Date(a.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })
          : "",
        author: a.memberData?.memberName ?? "",
        authorImage: watchImageUrl(a.memberData?.memberPhoto),
        comments: a.articleComments ?? 0,
        articleLikes: a.articleLikes ?? 0,
        meLiked: a.meLiked,
      });
      return;
    }
    if (articleError || (articleData && !articleData.getBoardArticle)) {
      router.push("/community");
    }
  }, [router.isReady, articleId, isStaticId, articleData, articleError]);

  // Calculate height for last 2 comments dynamically
  useLayoutEffect(() => {
    if (commentsListRef.current && commentItemsRef.current.length >= 2) {
      const firstComment = commentItemsRef.current[0];
      const secondComment = commentItemsRef.current[1];

      if (firstComment && secondComment) {
        const totalHeight =
          firstComment.offsetHeight + secondComment.offsetHeight + 50;
        commentsListRef.current.style.maxHeight = `${totalHeight}px`;
      }
    } else if (
      commentsListRef.current &&
      commentItemsRef.current.length === 1
    ) {
      const firstComment = commentItemsRef.current[0];
      if (firstComment) {
        commentsListRef.current.style.maxHeight = `${
          firstComment.offsetHeight + 25
        }px`;
      }
    }
  }, [sortedComments, article]);

  if (!article) {
    return (
      <Stack className="community-detail-page">
        <Typography>{t("commDetail.loading")}</Typography>
      </Stack>
    );
  }

  return (
    <Stack className="community-detail-page">
      <Stack className="community-detail-container">
        {/* Main Article */}
        <Box className="article-main">
          <Box className="article-image">
            <img src={article.image} />
          </Box>

          <Box className="article-header">
            <Typography className="article-title">{article.title}</Typography>
            <Box className="article-meta">
              <Box component="span" className="meta-item">
                <CalendarToday className="meta-icon" />
                <Typography component="span" className="meta-text">
                  {article.date}
                </Typography>
              </Box>

              <Box component="span" className="meta-item">
                <Comment className="meta-icon" />
                <Typography component="span" className="meta-text">
                  {commentsCount}{" "}
                  {commentsCount !== 1
                    ? t("commDetail.commentCountPlural")
                    : t("commDetail.commentCount")}
                </Typography>
              </Box>
              <Box component="span" className="meta-item meta-author">
                {article.authorImage ? (
                  <>
                    <Box className="meta-author-avatar">
                      <img src={article.authorImage} alt={article.author} />
                    </Box>
                    <Typography component="span" className="meta-text">
                      {article.author}
                    </Typography>
                  </>
                ) : (
                  <>
                    <Person className="meta-icon" />
                    <Typography component="span" className="meta-text">
                      {article.author}
                    </Typography>
                  </>
                )}
              </Box>
            </Box>
          </Box>

          <Box className="article-content">
            <Typography className="article-text">{article.content}</Typography>
          </Box>

          {/* Back Link */}
          <Box className="watch-back-wrapper">
            <Box
              className="see-all-text"
              onClick={() => router.push("/community")}
            >
              {t("commDetail.back")} <ArrowForward className="see-all-arrow" />
            </Box>
          </Box>

          {/* Comments Section */}
          <Box className="comments-section">
            <Box className="comments-title-wrapper">
              <Comment className="comments-title-icon" />
              <Typography className="comments-title">
                {commentsCount}{" "}
                {commentsCount !== 1
                  ? t("commDetail.commentCountPlural")
                  : t("commDetail.commentCount")}
              </Typography>
            </Box>

            {/* Existing Comments */}
            <Box className="comments-list" ref={commentsListRef}>
              {commentsCount === 0 ? (
                <Box className="no-comments">
                  <Typography className="no-comments-text">
                    {t("commDetail.noComment")}
                  </Typography>
                </Box>
              ) : (
                sortedComments.map((comment, index) => (
                  <Box
                    key={comment.id}
                    className="comment-item"
                    ref={(el: HTMLDivElement | null) => {
                      commentItemsRef.current[index] = el;
                    }}
                  >
                    <Typography className="comment-number">
                      {commentsCount - index}.
                    </Typography>
                    <Box className="comment-content">
                      <Box className="comment-meta">
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "20px",
                          }}
                        >
                          <Box component="span" className="comment-meta-item">
                            <CalendarToday className="comment-meta-icon" />
                            <Typography
                              component="span"
                              className="comment-meta-text"
                            >
                              {comment.date}
                            </Typography>
                          </Box>
                          <Box component="span" className="comment-meta-item">
                            <Person className="comment-meta-icon" />
                            <Typography
                              component="span"
                              className="comment-meta-text"
                            >
                              {comment.author}
                            </Typography>
                          </Box>
                        </Box>
                        {editingCommentId !== comment.id &&
                          (comment.author === "You" ||
                            (isArticleFromApi &&
                              "memberId" in comment &&
                              isCommentAuthor(comment.memberId))) && (
                            <IconButton
                              className="comment-more-btn"
                              size="small"
                              onClick={(e) =>
                                handleCommentMenuOpen(e, comment.id)
                              }
                              sx={{ padding: "4px" }}
                            >
                              <MoreHoriz
                                sx={{ fontSize: 22, color: "#8c6f5a" }}
                              />
                            </IconButton>
                          )}
                      </Box>
                      <Box className="comment-text-wrapper">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "flex-end",
                            gap: "20px",
                            width: "100%",
                          }}
                        >
                          <Typography className="comment-text">
                            {editedCommentTexts[String(comment.id)] ??
                              comment.text}
                          </Typography>
                          <Box className="comment-actions">
                            <Box className="comment-reply-btn">
                              <ReplyIcon className="reply-icon" />
                            </Box>
                            <Box
                              className={`comment-like-btn ${
                                likedComments.includes(comment.id)
                                  ? "liked"
                                  : ""
                              }`}
                              onClick={() => {
                                if (likedComments.includes(comment.id)) {
                                  setLikedComments(
                                    likedComments.filter(
                                      (id) => id !== comment.id
                                    )
                                  );
                                  setLikeCounts((prev) => ({
                                    ...prev,
                                    [comment.id]: (prev[comment.id] || 2) - 1,
                                  }));
                                } else {
                                  setLikedComments([
                                    ...likedComments,
                                    comment.id,
                                  ]);
                                  setLikeCounts((prev) => ({
                                    ...prev,
                                    [comment.id]: (prev[comment.id] || 2) + 1,
                                  }));
                                }
                              }}
                            >
                              {likedComments.includes(comment.id) ? (
                                <FavoriteIcon className="like-icon" />
                              ) : (
                                <FavoriteBorderIcon className="like-icon" />
                              )}
                              <Box className="like-badge">
                                {likeCounts[comment.id] || 2}
                              </Box>
                            </Box>
                          </Box>
                        </Box>
                        {((isArticleFromApi &&
                          (comment as { isEdited?: boolean }).isEdited) ||
                          editedCommentTexts[String(comment.id)]) && (
                          <Typography className="comment-edited">
                            {t("detail.edited") || "edited"}
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
              onClose={handleCommentMenuClose}
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              transformOrigin={{ vertical: "top", horizontal: "right" }}
              PaperProps={{
                sx: {
                  "& .MuiMenuItem-root": {
                    fontFamily:
                      "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  if (openMenuCommentId !== null)
                    handleEditComment(openMenuCommentId);
                }}
              >
                {t("commDetail.edit")}
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (openMenuCommentId !== null)
                    handleDeleteComment(openMenuCommentId);
                }}
              >
                {t("commDetail.delete")}
              </MenuItem>
            </Menu>

            {/* Comment Form */}
            <Box className="comment-form">
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginBottom: 1,
                }}
              >
                <Typography className="comment-form-title">
                  {editingCommentId !== null
                    ? t("commDetail.editComment")
                    : t("commDetail.leaveComment")}
                </Typography>
                {editingCommentId !== null && (
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
              <Box className="comment-form-row"></Box>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder={t("commDetail.messagePlaceholder")}
                className="comment-textarea"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
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
                    overflow: "visible !important",
                  },
                }}
              />
              <Box className="comment-submit-wrapper">
                <Button
                  className="comment-submit-button"
                  onClick={handleSubmitComment}
                >
                  {t("commDetail.postComment")}
                  <ArrowForward sx={{ ml: 1, fontSize: 22 }} />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Stack>
    </Stack>
  );
};

export default withLayoutBasic(CommunityDetail);
