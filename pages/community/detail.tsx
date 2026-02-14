import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { communityComments } from "@/libs/data/communityComments";
import { Stack, Box, Typography, TextField, Button, IconButton, Menu, MenuItem } from "@mui/material";
import { NextPage } from "next";
import { CalendarToday, Comment, Person, ArrowForward } from "@mui/icons-material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Close from "@mui/icons-material/Close";
import { useRouter } from "next/router";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

// Articles data - index.tsx dagi bilan bir xil
const articles = [
    {
      id: 1,
      image: "/img/watch/asosiy1.webp",
      author: "Dostonbek",
      
      memberType: "Admin",
      date: "May 30, 2022",
      comments: 10,
      title: "How to build watches by machine",
      content: `Crese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper. Crese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.
      Crese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui. Praesent blandit dolor. Sed non quam. In vel mi sit amet augue congue elementum. Morbi in ipsum sit amet pede facilisis laoreet. Donec lacus nunc, viverra nec, blandit vel, egestas et, augue. Vestibulum tincidunt malesuada tellus. Ut ultrices ultrices enim. Curabitur sit amet mauris. Morbi in dui quis est pulvinar ullamcorper.`,
    },
    {
      id: 2,
      image: "/img/watch/rasm3.png",
      author: "RAM M",
      memberType: "Member",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "TRENDING FASHION WHITE WATCHES",
      content: `Erese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam.`,
    },
    {
      id: 3,
      image: "/img/watch/asosiy1.webp",
      author: "RAM M",
      memberType: "Dealer",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "THE CLASSIC DIAL MEN'S WATCHES",
      content: `Wrese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna.`,
    },
    {
      id: 4,
      image: "/img/watch/rasmm2.png",
      author: "RAM M",
      memberType: "Member",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "MADE OF 100% RECYCLED PLASTIC",
      content: `Prese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis. Nam convallis pellentesque nisl. Integer euismod lacus luctus magna. Quisque cursus, metus vitae pharetra auctor, sem massa mattis sem, at interdum magna augue eget diam. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Morbi lacinia molestie dui.`,
    },
    {
      id: 5,
      image: "/img/watch/rasmm.png",
      author: "RAM M",
      memberType: "Admin",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "THE CLASSIC DIAL MEN'S WATCHES",
      content: `Wrese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis.`,
    },
    {
      id: 6,
      image: "/img/watch/rasmm2.png",
      author: "RAM M",
      memberType: "Dealer",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "MADE OF 100% RECYCLED PLASTIC",
      content: `Prese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id, imperdiet feugiat, pede. Sed lectus. Donec mollis hendrerit risus. Phasellus nec sem in justo pellentesque facilisis.`,
    },
  ];

const CommunityDetail: NextPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [article, setArticle] = useState<any>(null);
  const [likedComments, setLikedComments] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [newCommentText, setNewCommentText] = useState("");
  const [extraComments, setExtraComments] = useState<{ id: number; date: string; author: string; text: string }[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuCommentId, setOpenMenuCommentId] = useState<number | null>(null);
  const [deletedCommentIds, setDeletedCommentIds] = useState<number[]>([]);
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedCommentTexts, setEditedCommentTexts] = useState<Record<number, string>>({});

  // Refs for dynamic height calculation - HOOKS TEPADA BO'LISHI KERAK
  const commentsListRef = useRef<HTMLDivElement>(null);
  const commentItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Comments: article.comments dan + yangi qo'shilganlar (o'chirilganlarsiz)
  const baseComments = communityComments.slice(0, article?.comments ?? 0);
  const allComments = [...baseComments, ...extraComments].filter((c) => !deletedCommentIds.includes(c.id));
  const sortedComments = [...allComments].reverse();
  const commentsCount = allComments.length;

  const handleCommentMenuOpen = (event: React.MouseEvent<HTMLElement>, commentId: number) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setOpenMenuCommentId(commentId);
  };

  const handleCommentMenuClose = () => {
    setMenuAnchorEl(null);
    setOpenMenuCommentId(null);
  };

  const handleEditComment = (commentId: number) => {
    handleCommentMenuClose();
    const comment = allComments.find((c) => c.id === commentId);
    if (comment) {
      setNewCommentText(editedCommentTexts[commentId] ?? comment.text);
      setEditingCommentId(commentId);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setNewCommentText("");
  };

  const handleDeleteComment = (commentId: number) => {
    setDeletedCommentIds((prev) => [...prev, commentId]);
    setExtraComments((prev) => prev.filter((c) => c.id !== commentId));
    handleCommentMenuClose();
  };

  const handleSubmitComment = () => {
    const text = newCommentText.trim();
    if (!text) return;
    if (editingCommentId !== null) {
      setEditedCommentTexts((prev) => ({ ...prev, [editingCommentId]: text }));
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
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          author: "You",
          text,
        },
      ]);
      setNewCommentText("");
    }
  };

  useEffect(() => {
    if (router.isReady) {
      const articleId = router.query.id || router.query.articleId;
      console.log('Router ready:', router.isReady);
      console.log('Query params:', router.query);
      console.log('Article ID from query:', articleId);
      
      if (articleId) {
        const idNum = parseInt(articleId as string, 10);
        console.log('Parsed article ID:', idNum);
        const foundArticle = articles.find((a) => a.id === idNum);
        console.log('Found article:', foundArticle);
        
        if (foundArticle) {
          setArticle(foundArticle);
        } else {
          console.log('Article not found, redirecting...');
          router.push('/community');
        }
      }
    }
  }, [router.isReady, router.query]);

  // Calculate height for last 2 comments dynamically
  useLayoutEffect(() => {
    if (commentsListRef.current && commentItemsRef.current.length >= 2) {
      const firstComment = commentItemsRef.current[0];
      const secondComment = commentItemsRef.current[1];
      
      if (firstComment && secondComment) {
        const totalHeight = firstComment.offsetHeight + secondComment.offsetHeight + 50;
        commentsListRef.current.style.maxHeight = `${totalHeight}px`;
      }
    } else if (commentsListRef.current && commentItemsRef.current.length === 1) {
      const firstComment = commentItemsRef.current[0];
      if (firstComment) {
        commentsListRef.current.style.maxHeight = `${firstComment.offsetHeight + 25}px`;
      }
    }
  }, [sortedComments, article]);

  if (!article) {
    return (
      <Stack className="community-detail-page">
        <Typography>Loading...</Typography>
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
            <Typography className="article-title">
              {article.title}
            </Typography>
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
                  {commentsCount} Comment{commentsCount !== 1 ? "s" : ""}
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
            <Typography className="article-text">
              {article.content}
            </Typography>
          </Box>

          {/* Back Link */}
          <Box className="watch-back-wrapper">
            <Box className="see-all-text" onClick={() => router.push("/community")}>
              Back <ArrowForward className="see-all-arrow" />
            </Box>
          </Box>
  
          {/* Comments Section */}
          <Box className="comments-section">
            <Box className="comments-title-wrapper">
              <Comment className="comments-title-icon" />
              <Typography className="comments-title">
                {commentsCount} Comment{commentsCount !== 1 ? "s" : ""}
              </Typography>
            </Box>

            {/* Existing Comments */}
            <Box className="comments-list" ref={commentsListRef}>
              {commentsCount === 0 ? (
                <Box className="no-comments">
                  <Typography className="no-comments-text">No comment...</Typography>
                </Box>
              ) : (
                sortedComments.map((comment, index) => (
                  <Box 
                    key={comment.id} 
                    className="comment-item"
                    ref={(el: HTMLDivElement | null) => { commentItemsRef.current[index] = el; }}
                  >
                    <Typography className="comment-number">{commentsCount - index}.</Typography>
                    <Box className="comment-content">
                      <Box className="comment-meta">
                        <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                          <Box component="span" className="comment-meta-item">
                            <CalendarToday className="comment-meta-icon" />
                            <Typography component="span" className="comment-meta-text">
                              {comment.date}
                            </Typography>
                          </Box>
                          <Box component="span" className="comment-meta-item">
                            <Person className="comment-meta-icon" />
                            <Typography component="span" className="comment-meta-text">
                              {comment.author}
                            </Typography>
                          </Box>
                        </Box>
                        {editingCommentId !== comment.id && (
                          <IconButton
                            className="comment-more-btn"
                            size="small"
                            onClick={(e) => handleCommentMenuOpen(e, comment.id)}
                            sx={{ padding: "4px" }}
                          >
                            <MoreHoriz sx={{ fontSize: 22, color: "#8c6f5a" }} />
                          </IconButton>
                        )}
                      </Box>
                      <Box className="comment-text-wrapper">
                        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", width: "100%" }}>
                          <Typography className="comment-text">
                            {editedCommentTexts[comment.id] ?? comment.text}
                          </Typography>
                          <Box className="comment-actions">
                            <Box className="comment-reply-btn">
                              <ReplyIcon className="reply-icon" />
                            </Box>
                            <Box
                              className={`comment-like-btn ${likedComments.includes(comment.id) ? 'liked' : ''}`}
                            onClick={() => {
                              if (likedComments.includes(comment.id)) {
                                setLikedComments(likedComments.filter(id => id !== comment.id));
                                setLikeCounts(prev => ({ ...prev, [comment.id]: (prev[comment.id] || 2) - 1 }));
                              } else {
                                setLikedComments([...likedComments, comment.id]);
                                setLikeCounts(prev => ({ ...prev, [comment.id]: (prev[comment.id] || 2) + 1 }));
                              }
                            }}
                            >
                              {likedComments.includes(comment.id) ? (
                                <FavoriteIcon className="like-icon" />
                              ) : (
                                <FavoriteBorderIcon className="like-icon" />
                              )}
                              <Box className="like-badge">{likeCounts[comment.id] || 2}</Box>
                            </Box>
                          </Box>
                        </Box>
                        {editedCommentTexts[comment.id] && (
                          <Typography className="comment-edited">
                            edited
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
                    fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  },
                },
              }}
            >
              <MenuItem
                onClick={() => {
                  if (openMenuCommentId !== null) handleEditComment(openMenuCommentId);
                }}
              >
                Edit
              </MenuItem>
              <MenuItem
                onClick={() => {
                  if (openMenuCommentId !== null) handleDeleteComment(openMenuCommentId);
                }}
              >
                Delete
              </MenuItem>
            </Menu>

            {/* Comment Form */}
            <Box className="comment-form">
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                <Typography className="comment-form-title">
                  {editingCommentId !== null ? "Edit comment" : "Leave a comment"}
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
              <Box className="comment-form-row">
              </Box>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Message"
                className="comment-textarea"
                value={newCommentText}
                onChange={(e) => setNewCommentText(e.target.value)}
                sx={{ 
                  mb: 2,
                  '& .MuiInputBase-input': {
                    paddingTop: '16px !important',
                  },
                  '& textarea': {
                    paddingTop: '16px !important',
                    resize: 'none !important',
                    overflowY: 'auto !important',
                    overflowX: 'hidden !important',
                  },
                  '& .MuiOutlinedInput-root': {
                    overflow: 'visible !important',
                  }
                }}
              />
              <Box className="comment-submit-wrapper">
                <Button className="comment-submit-button" onClick={handleSubmitComment}>
                  Post comment
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

