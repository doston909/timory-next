import { Stack, Box, Typography, Select, MenuItem } from "@mui/material";
import {
  Favorite,
  FavoriteBorderOutlined,
  VisibilityOutlined,
  CommentOutlined,
} from "@mui/icons-material";
import { useState, useMemo } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { sweetToastErrorAlert } from "@/libs/sweetAlert";

export type Article = {
  id: number | string;
  image: string;
  author: string;
  memberType?: string;
  date: string;
  comments: number;
  title: string;
  description: string;
  articleType?: string;
  articleLikes?: number;
  articleViews?: number;
  meLiked?: { memberId?: string; likeRefId?: string; myFavorite?: boolean }[];
};

type CommunityCardProps = {
  articles: Article[];
  onArticleClick?: (id: number | string) => void;
  onLike?: (articleId: number | string) => void;
};

const CommunityCard = ({ articles, onArticleClick, onLike }: CommunityCardProps) => {
  const router = useRouter();
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [likedArticles, setLikedArticles] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>({});
  const articlesPerPage = 4;
  
  // Sort qilingan articlelar
  const sortedArticles = useMemo(() => {
    const sorted = [...articles].sort((a, b) => {
      if (sortBy === "newest") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      }
      if (sortBy === "oldest") {
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      }
      return 0;
    });
    return sorted;
  }, [articles, sortBy]);
  
  const totalPages = Math.ceil(sortedArticles.length / articlesPerPage);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = sortedArticles.slice(startIndex, startIndex + articlesPerPage);

  const handleLikeClick = (articleId: number | string, articleLikesFromDb: number, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!onLike) {
      sweetToastErrorAlert("Please log in or sign up to like and comment.").then();
      return;
    }
    const key = String(articleId);
    const currentlyLiked = likedArticles[key] ?? false;
    const nextLiked = !currentlyLiked;
    setLikedArticles((prev) => ({ ...prev, [key]: nextLiked }));
    const baseCount = likeCounts[key] ?? articleLikesFromDb;
    setLikeCounts((counts) => ({
      ...counts,
      [key]: nextLiked ? baseCount + 1 : Math.max(0, baseCount - 1),
    }));
    onLike(articleId);
  };

  const handleArticleClick = (articleId: number | string, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    if (onArticleClick) {
      onArticleClick(articleId);
    } else {
      router.push(`/community/detail?id=${articleId}`);
    }
  };

  return (
    <Stack className="community-main">
      {/* Sort Dropdown */}
      <Box 
        className="community-header" 
        sx={{ 
          display: 'flex', 
          flexDirection: 'row',
          justifyContent: 'flex-end', 
          alignItems: 'center',
          marginBottom: '50px',
          gap: '10px'
        }}
      >
        <Typography 
          className="sort-label"
          sx={{ 
            fontSize: '22px',
            color: '#000000',
            fontWeight: 400,
            whiteSpace: 'nowrap',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
          }}
        >
          Sort by
        </Typography>
        <Select
          value={sortBy}
          onChange={(e) => {
            setSortBy(e.target.value);
            setCurrentPage(1);
          }}
          className="sort-select"
          sx={{
            minWidth: '200px',
            width: '200px',
            height: '36px',
            borderRadius: '6px',
            fontSize: '18px',
            fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
          }}
          MenuProps={{
            PaperProps: {
              className: "sort-select-menu",
              sx: {
                '& .MuiMenuItem-root': {
                  fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                  '&:hover': {
                    backgroundColor: '#f5f5f5',
                  },
                  '&.Mui-selected': {
                    backgroundColor: '#c1c1c1',
                    '&:hover': {
                      backgroundColor: '#bbb7b7',
                    }
                  }
                }
              }
            }
          }}
        >
          <MenuItem value="newest">Newest</MenuItem>
          <MenuItem value="oldest">Oldest</MenuItem>
        </Select>
      </Box>
      
      <Stack className="articles-grid">
        {displayedArticles.map((article) => {
          const detailHref = `/community/detail?id=${encodeURIComponent(String(article.id))}`;
          return (
            <Link key={article.id} href={detailHref} passHref legacyBehavior>
              <Box
                className="article-card"
                component="a"
                sx={{
                  textDecoration: "none",
                  color: "inherit",
                  cursor: "pointer",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Box className="article-image">
                  <img src={article.image} alt={article.title} />
                  {article.articleType && (
                    <Typography className="article-type-label">{article.articleType}</Typography>
                  )}
                  <Stack className="article-image-icons" direction="column">
                    <Box
                      className={`icon-wrapper icon-wrapper-with-count${(article.meLiked != null && article.meLiked.length > 0) || likedArticles[String(article.id)] ? " icon-wrapper-liked" : ""}`}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        e.stopPropagation();
                        handleLikeClick(article.id, article.articleLikes ?? 0, e);
                      }}
                      component="span"
                    >
                      {(article.meLiked != null && article.meLiked.length > 0) || likedArticles[String(article.id)] ? (
                        <Favorite sx={{ fontSize: 28 }} />
                      ) : (
                        <FavoriteBorderOutlined sx={{ fontSize: 28 }} />
                      )}
                      <span className="icon-wrapper-count">
                        {likeCounts[String(article.id)] ?? article.articleLikes ?? 0}
                      </span>
                    </Box>
                    <Box
                      className="icon-wrapper icon-wrapper-with-count"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      component="span"
                    >
                      <VisibilityOutlined sx={{ fontSize: 28 }} />
                      <span className="icon-wrapper-count">{article.articleViews ?? 0}</span>
                    </Box>
                    <Box
                      className="icon-wrapper icon-wrapper-with-count"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                      component="span"
                    >
                      <CommentOutlined sx={{ fontSize: 28 }} />
                      <span className="icon-wrapper-count">{article.comments}</span>
                    </Box>
                  </Stack>
                </Box>
                <Box className="article-content">
                  <Typography className="article-meta">
                    <Box component="span" className="article-author-wrapper">
                      {article.memberType && (
                        <Box component="span" className="article-member-type">
                          ({article.memberType.toLowerCase()})
                        </Box>
                      )}
                      <Box component="span" className="article-author">
                        {article.author}
                      </Box>
                    </Box>
                    <Box component="span">{article.date}</Box>
                  </Typography>
                  <Typography className="article-title">
                    {article.title}
                  </Typography>
                  <Typography className="article-description">
                    {article.description}
                  </Typography>
                </Box>
              </Box>
            </Link>
          );
        })}
      </Stack>

      {/* Pagination */}
      <Box className="pagination">
        {totalPages > 1 && (
          <Box className="watch-pagination">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Box
                key={page}
                className={`pagination-number ${currentPage === page ? "active" : ""}`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Stack>
  );
};

export default CommunityCard;

