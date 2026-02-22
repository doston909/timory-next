import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Stack, Box, Typography, IconButton, OutlinedInput, InputAdornment } from "@mui/material";
import { NextPage } from "next";
import {
  ShoppingBagOutlined,
  FavoriteBorderOutlined,
  Favorite,
  VisibilityOutlined,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import SearchIcon from "@mui/icons-material/Search";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import CommunityCard from "@/libs/components/community/CommunityCard";
import { useCart } from "@/libs/context/CartContext";
import { GET_BOARD_ARTICLES } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";
import { getViewCount } from "@/libs/viewCountStorage";
import { getDealerByName } from "@/libs/data/dealers";
import { useTranslation } from "@/libs/context/useTranslation";



const COMMUNITY_TAG_KEYS: Record<string, string> = {
  "Free Board": "community.freeBoard",
  "Recommendation": "community.recommendation",
  "News": "community.news",
};

const Community: NextPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const [bestSellerIndex, setBestSellerIndex] = useState(0);
  const [likedWatches, setLikedWatches] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>({});
  const [isHovered, setIsHovered] = useState(false);


  const tags = ["Free Board", "Recommendation", "News"] as const;
  const [selectedArticleType, setSelectedArticleType] = useState<string | null>(null);
  const [communitySearch, setCommunitySearch] = useState("");

  // Open with type from URL (e.g. search tag "News" → /community?type=News)
  useEffect(() => {
    if (!router.isReady) return;
    const type = router.query.type;
    if (typeof type === "string" && type && tags.includes(type as typeof tags[number])) {
      setSelectedArticleType(type);
    }
  }, [router.isReady, router.query.type]);

  const handleFilterReset = () => {
    setSelectedArticleType(null);
    setCommunitySearch("");
  };

  const bestSellers = [
    {
      id: 1,
      image: "/img/watch/rasmm.png",
      title: "Golden Dial Analog",
      price: "$ 3,600.00",
    },
    {
      id: 2,
      image: "/img/watch/rasm1.png",
      title: "Silver Classic Watch",
      price: "$ 2,800.00",
    },
    {
      id: 3,
      image: "/img/watch/rasm3.png",
      title: "Premium Luxury Watch",
      price: "$ 4,500.00",
    },
  ];

  const currentBestSeller = bestSellers[bestSellerIndex];
  const [viewCount, setViewCount] = useState(0);

  useEffect(() => {
    setViewCount(getViewCount(currentBestSeller?.id ?? 0));
  }, [currentBestSeller?.id]);

  const categoryToArticleType: Record<string, string> = {
    FREE: "Free Board",
    RECOMMEND: "Recommendation",
    NEWS: "News",
  };

  const { data: boardArticlesData } = useQuery(GET_BOARD_ARTICLES, {
    variables: {
      input: { page: 1, limit: 500, search: {} },
    },
  });

  const articles = useMemo(() => {
    const list = boardArticlesData?.getBoardArticles?.list ?? [];
    return list.map((a: any) => {
      const content = a.articleContent ?? "";
      const description = content.length > 80 ? content.slice(0, 80).trim() + ".." : content;
      return {
        id: a._id,
        image: watchImageUrl(a.articleImage),
        author: a.memberData?.memberName ?? "",
        memberType: a.memberData?.memberType ?? "",
        date:
          a.createdAt &&
          new Date(a.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
          }),
        comments: a.articleComments ?? 0,
        title: a.articleTitle ?? "",
        description,
        articleType: categoryToArticleType[String(a.articleCategory)] ?? "Free Board",
      };
    });
  }, [boardArticlesData]);

  const typeFilteredArticles = selectedArticleType
    ? articles.filter((a: { articleType?: string; }) => (a as { articleType?: string }).articleType === selectedArticleType)
    : articles;

  // Article title va author (dealer name) bo‘yicha qidiruv
  const searchLower = communitySearch.toLowerCase().trim();
  const filteredArticles = searchLower
    ? typeFilteredArticles.filter((a: { title: any; author: any; }) => {
        const title = (a.title || "").toLowerCase();
        const author = (a.author || "").toLowerCase();
        return title.includes(searchLower) || author.includes(searchLower);
      })
    : typeFilteredArticles;

  const handlePrevBestSeller = () => {
    setBestSellerIndex((prev) =>
      prev === 0 ? bestSellers.length - 1 : prev - 1
    );
  };

  const handleNextBestSeller = () => {
    setBestSellerIndex((prev) =>
      prev === bestSellers.length - 1 ? 0 : prev + 1
    );
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const watchId = currentBestSeller?.id ?? 0;
    const currentlyLiked = likedWatches[watchId] ?? false;
    const nextLiked = !currentlyLiked;
    setLikedWatches((prev) => ({ ...prev, [watchId]: nextLiked }));
    setLikeCounts((counts) => ({
      ...counts,
      [watchId]: nextLiked
        ? (counts[watchId] ?? 0) + 1
        : Math.max(0, (counts[watchId] ?? 0) - 1),
    }));
  };

  const handleBagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (currentBestSeller) {
      addToCart({
        id: currentBestSeller.id,
        name: currentBestSeller.title,
        model: currentBestSeller.title,
        brand: "",
        price: parseFloat(currentBestSeller.price.replace(/[^0-9.-]+/g, "")) || 0,
        image: currentBestSeller.image,
        quantity: 1,
      });
    }
  };

  const handleCardClick = () => {
    if (currentBestSeller) {
      router.push(`/watch/detail?id=${currentBestSeller.id}`);
    }
  };

  // Har 3 sekundda chapdan o'ngga almashish
  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(() => {
      setBestSellerIndex((prev) =>
        prev === bestSellers.length - 1 ? 0 : prev + 1
      );
    }, 3000);
    return () => clearInterval(timer);
  }, [isHovered, bestSellers.length]);

  return (
    <Stack className="community-page">
      <Stack className="community-container">
        {/* Left Sidebar */}
        <Stack className="community-sidebar">

            {/* Tags */}
          <Box className="sidebar-section">
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", marginBottom: 1, flexDirection: "row" }}>
              <Typography className="sidebar-title" sx={{ margin: 0 }}>{t("community.type")}</Typography>
              <IconButton
                onClick={handleFilterReset}
                sx={{
                  padding: "8px",
                  color: "#000000ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  "&:hover": {
                    color: "#f9a63bff",
                    backgroundColor: "rgba(255, 255, 255, 0.1)",
                    borderRadius: "50%",
                  },
                }}
              >
                <RefreshIcon sx={{ fontSize: "30px" }} />
              </IconButton>
            </Box>
            <Stack className="tags-list" direction="row" flexWrap="wrap" gap={1}>
              {tags.map((tag, index) => (
                <Box
                  key={index}
                  className={`tag-item${selectedArticleType === tag ? " tag-item-active" : ""}`}
                  onClick={() => setSelectedArticleType(selectedArticleType === tag ? null : tag)}
                  sx={{ cursor: "pointer" }}
                >
                  {t(COMMUNITY_TAG_KEYS[tag] ?? tag)}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Recent Articles */}
          <Box className="sidebar-section">
            <Typography className="sidebar-title">{t("community.forBusinessPartnership")}</Typography>
            <Stack direction="column" spacing={2} sx={{ width: '100%' }}>
              <Box 
                sx={{ 
                  width: '100%',
                  height: '400px',
                  padding: '15px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(/img/watch/fon1.jpg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(5px)',
                    zIndex: 0,
                  }}
                />
                <Typography className="partnership-box-text" sx={{ position: 'relative', zIndex: 1 }}>
                  {t("community.advertiseHere")}
                </Typography>
              </Box>
              <Box 
                sx={{ 
                  width: '100%',
                  height: '300px',
                  padding: '15px',
                  position: 'relative',
                  overflow: 'hidden',
                  borderRadius: '8px',
                  border: '1px solid #000000',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif'
                }}
              >
                <Box
                  sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'url(/img/watch/lay2.jpeg)',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    filter: 'blur(4px)',
                    zIndex: 0,
                  }}
                />
                <Typography className="partnership-box-text" sx={{ position: 'relative', zIndex: 1 }}>
                  {t("community.advertiseHere")}
                </Typography>
              </Box>
            </Stack>
          </Box>

          

          {/* Best Sellers */}
          <Box className="sidebar-section">
            <Typography className="sidebar-title">{t("community.bestSellers")}</Typography>
            <Box
              className="best-seller-card"
              onClick={handleCardClick}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              sx={{ cursor: "pointer" }}
            >
              <Box className="best-seller-image-wrapper">
                <img
                  src={bestSellers[bestSellerIndex].image}
                  alt={bestSellers[bestSellerIndex].title}
                  className="best-seller-image"
                />
                <Stack className="best-seller-icons">
                  <Box className="icon-wrapper" onClick={handleBagClick}>
                    <ShoppingBagOutlined />
                  </Box>
                  <Box
                    className={`icon-wrapper icon-wrapper-with-count${
                      likedWatches[currentBestSeller?.id ?? 0] ? " icon-wrapper-liked" : ""
                    }`}
                    onClick={handleLikeClick}
                  >
                    {likedWatches[currentBestSeller?.id ?? 0] ? (
                      <Favorite sx={{ fontSize: 28 }} />
                    ) : (
                      <FavoriteBorderOutlined sx={{ fontSize: 28 }} />
                    )}
                    <span className="icon-wrapper-count">{likeCounts[currentBestSeller?.id ?? 0] ?? 0}</span>
                  </Box>
                  <Box className="icon-wrapper icon-wrapper-with-count">
                    <VisibilityOutlined sx={{ fontSize: 28 }} />
                    {viewCount > 0 && (
                      <span className="icon-wrapper-count">{viewCount}</span>
                    )}
                  </Box>
                </Stack>
              </Box>
              <Typography className="best-seller-title">
                {bestSellers[bestSellerIndex].title}
              </Typography>
              <Typography className="best-seller-price">
                {bestSellers[bestSellerIndex].price}
              </Typography>
            </Box>
          </Box>

          {/* Navigation */}
          <Stack className="best-seller-navigation" direction="row" gap={15}>
            <Box
              className="nav-arrow"
              onClick={handlePrevBestSeller}
            >
              <ArrowBackIos sx={{ fontSize: 16 }} />
            </Box>
            <Box
              className="nav-arrow"
              onClick={handleNextBestSeller}
            >
              <ArrowForwardIos sx={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Stack>

        {/* Main Content */}
        <CommunityCard
          articles={filteredArticles}
          onArticleClick={(id) => router.push(`/community/detail?id=${id}`)}
        />
      </Stack>
    </Stack>
  );
};

export default withLayoutBasic(Community);
