import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { communityComments, communityCommentsCount } from "@/libs/data/communityComments";
import { Stack, Box, Typography, TextField, Button } from "@mui/material";
import { NextPage } from "next";
import { CalendarToday, Comment, Person, ArrowForward} from "@mui/icons-material";
import PermIdentityOutlinedIcon from '@mui/icons-material/PermIdentityOutlined';
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ReplyIcon from "@mui/icons-material/Reply";
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
      comments: 1,
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

  // Refs for dynamic height calculation - HOOKS TEPADA BO'LISHI KERAK
  const commentsListRef = useRef<HTMLDivElement>(null);
  const commentItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Comments data (source of truth)
  const comments = communityComments;

  // Eng yangi commentlar birinchi ko'rinishi uchun teskari tartib (4,3,2,1)
  const sortedComments = [...comments].reverse();
  const commentsCount = communityCommentsCount;

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
                      <Box className="comment-text-wrapper">
                        <Typography className="comment-text">
                          {comment.text}
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
                    </Box>
                  </Box>
                ))
              )}
            </Box>

            {/* Comment Form */}
            <Box className="comment-form">
              <Typography className="comment-form-title">Leave a comment</Typography>
              <Box className="comment-form-row">
              </Box>
              <TextField
                fullWidth
                multiline
                rows={6}
                placeholder="Message"
                className="comment-textarea"
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
                <Button className="comment-submit-button">
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

