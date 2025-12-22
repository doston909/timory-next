import { Stack, Box, Typography } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { communityCommentsCount } from "@/libs/data/communityComments";

export type Article = {
  id: number;
  image: string;
  author: string;
  memberType?: string;
  date: string;
  comments: number;
  title: string;
  description: string;
};

type CommunityCardProps = {
  articles: Article[];
};

const CommunityCard = ({ articles }: CommunityCardProps) => {
  const router = useRouter(); // Bu qo'shish kerak
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const startIndex = (currentPage - 1) * articlesPerPage;
  const displayedArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  // Bu funksiyani qo'shish kerak
  const handleArticleClick = (articleId: number, e?: React.MouseEvent) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }
    console.log('Navigating to article:', articleId);
    router.push(`/community/detail?id=${articleId}`);
  };

  return (
    <Stack className="community-main">
      <Stack className="articles-grid">
        {displayedArticles.map((article) => (
          <Box key={article.id} className="article-card">
            <Box 
              className="article-image"
              onClick={(e) => handleArticleClick(article.id, e)}
            >
              <img src={article.image} alt={article.title} />
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
                    By {article.author}
                  </Box>
                </Box>
                {"  |  "}
                {article.date}  |  {communityCommentsCount} COMMENT
                {communityCommentsCount !== 1 ? "S" : ""}
              </Typography>
              <Typography 
                className="article-title"
                onClick={(e) => handleArticleClick(article.id, e)}
              >
                {article.title}
              </Typography>
              <Typography className="article-description">
                {article.description}
              </Typography>
            </Box>
          </Box>
        ))}
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

