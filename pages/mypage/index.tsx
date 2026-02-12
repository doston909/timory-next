import React, { useState } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { ShoppingBagOutlined, FavoriteBorder, Favorite, VisibilityOutlined, CommentOutlined, ArrowForwardIos, PersonOutline, ArrowUpward, Close, Delete } from "@mui/icons-material";
import { useRouter } from "next/router";
import { useCart } from "@/libs/context/CartContext";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

type Watch = {
  id: number;
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

const watches: Watch[] = [
  {
    id: 1,
    name: "Analog Strap Watch",
    image: "/img/watch/rasm3.png",
    price: "$ 4,500.00",
    brand: "Rolex",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-15 14:30",
    status: "Active",
    limitedEdition: true,
    watchStatus: true,
  },
  {
    id: 2,
    name: "Luxury Watch",
    image: "/img/watch/rasm3.png",
    price: "$ 6,200.00",
    brand: "Omega",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-14 10:20",
    status: "Active",
    limitedEdition: true,
    watchStatus: false,
  },
  {
    id: 3,
    name: "Premium Collection",
    image: "/img/watch/rasm3.png",
    price: "$ 8,900.00",
    brand: "Patek Philippe",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-13 16:45",
    status: "Active",
    watchStatus: true,
  },
  {
    id: 4,
    name: "Elegant Design",
    image: "/img/watch/rasm3.png",
    price: "$ 5,100.00",
    brand: "Cartier",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-12 09:15",
    status: "Active",
    watchStatus: false,
  },
  {
    id: 5,
    name: "Modern Classic",
    image: "/img/watch/rasm3.png",
    price: "$ 7,300.00",
    brand: "Tag Heuer",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-11 13:00",
    status: "Active",
    limitedEdition: true,
    watchStatus: true,
  },
  {
    id: 6,
    name: "Heritage Series",
    image: "/img/watch/rasm3.png",
    price: "$ 9,500.00",
    brand: "Audemars Piguet",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-10 11:30",
    status: "Active",
    watchStatus: false,
  },
  {
    id: 7,
    name: "Signature Model",
    image: "/img/watch/rasm3.png",
    price: "$ 6,800.00",
    brand: "Breitling",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-09 15:20",
    status: "Active",
    watchStatus: true,
  },
  {
    id: 8,
    name: "Elite Edition",
    image: "/img/watch/rasm3.png",
    price: "$ 10,200.00",
    brand: "IWC",
    likes: 2,
    views: 35,
    comments: 17,
    datePosted: "2024-01-08 12:45",
    status: "Active",
    watchStatus: false,
  },
];

const ITEMS_PER_PAGE = 6;
const FOLLOWERS_PER_PAGE = 4;
const ARTICLES_PER_PAGE = 3;

const MyPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  // Asosiy dealer uchun Follow/Unfollow
  const [isDealerFollowing, setIsDealerFollowing] = useState(false);
  // Followers tab uchun umumiy son (asosiy Follow tugmasiga bog'langan)
  const [totalFollowersCount, setTotalFollowersCount] = useState(6);
  // Asosiy Follow bosgan user Followers ro'yxatida ko'rinsinmi-yo'qmi
  const [isCurrentUserFollower, setIsCurrentUserFollower] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Watches");
  const [followersPage, setFollowersPage] = useState(1);
  // Followers / Followings tablari uchun alohida follow holatlari (tab + id bo'yicha)
  const [followersFollowing, setFollowersFollowing] = useState<{ [key: string]: boolean }>({});
  // Har bir box uchun Followers soni (kalit: "followers-1", "followings-1", ...)
  const [followersCounts, setFollowersCounts] = useState<{ [key: string]: number }>(() => {
    const initial: { [key: string]: number } = {};
    for (let i = 1; i <= 6; i += 1) {
      initial[`followers-${i}`] = 10; // Followers tab uchun boshlang'ich qiymat
      initial[`followings-${i}`] = 10; // Followings tab uchun boshlang'ich qiymat
    }
    return initial;
  });
  const [likedWatches, setLikedWatches] = useState<{ [key: number]: boolean }>({});
  const [watchLikes, setWatchLikes] = useState<{ [key: number]: number }>(() => {
    const initialLikes: { [key: number]: number } = {};
    watches.forEach((watch) => {
      initialLikes[watch.id] = watch.likes || 0;
    });
    return initialLikes;
  });
  // Articles uchun like holati va count
  const [articleLiked, setArticleLiked] = useState<{ [key: number]: boolean }>({});
  const [articleLikes, setArticleLikes] = useState<{ [key: number]: number }>({
    1: 12,
    2: 8,
    3: 19,
  });
  const [articlePage, setArticlePage] = useState(1);
  const [favoritesPage, setFavoritesPage] = useState(1);
  const [recentlyVisitedPage, setRecentlyVisitedPage] = useState(1);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profileData, setProfileData] = useState({
    username: "doston",
    phone: "01076409293",
    email: "",
    address: "",
    photo: null as string | null,
  });
  const [displayProfile, setDisplayProfile] = useState({
    username: "Caroline",
    phone: "(010) 123-41234",
    email: "",
    photo: "/img/profile/ceo.png",
  });

  const favorites: Watch[] = [
    {
      id: 101,
      name: "Favorite Watch 1",
      image: "/img/watch/rasm3.png",
      price: "$ 5,500.00",
      brand: "Rolex",
      likes: 5,
      views: 50,
      comments: 20,
      datePosted: "2024-01-20 10:00",
      status: "Active",
      limitedEdition: false,
      watchStatus: true,
    },
    {
      id: 102,
      name: "Favorite Watch 2",
      image: "/img/watch/rasm3.png",
      price: "$ 7,200.00",
      brand: "Omega",
      likes: 3,
      views: 40,
      comments: 15,
      datePosted: "2024-01-19 14:30",
      status: "Active",
      limitedEdition: true,
      watchStatus: true,
    },
  ];

  const recentlyVisited: Watch[] = [
    {
      id: 201,
      name: "Recently Visited Watch 1",
      image: "/img/watch/rasm3.png",
      price: "$ 6,000.00",
      brand: "Patek Philippe",
      likes: 4,
      views: 60,
      comments: 25,
      datePosted: "2024-01-21 09:15",
      status: "Active",
      limitedEdition: false,
      watchStatus: true,
    },
    {
      id: 202,
      name: "Recently Visited Watch 2",
      image: "/img/watch/rasm3.png",
      price: "$ 8,500.00",
      brand: "Cartier",
      likes: 6,
      views: 70,
      comments: 30,
      datePosted: "2024-01-20 16:45",
      status: "Active",
      limitedEdition: true,
      watchStatus: false,
    },
  ];

  const totalPages = Math.ceil(watches.length / ITEMS_PER_PAGE);
  const totalFavoritesPages = Math.ceil(favorites.length / ITEMS_PER_PAGE);
  const totalRecentlyVisitedPages = Math.ceil(recentlyVisited.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWatches = watches.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const favoritesStartIndex = (favoritesPage - 1) * ITEMS_PER_PAGE;
  const currentFavorites = favorites.slice(favoritesStartIndex, favoritesStartIndex + ITEMS_PER_PAGE);

  const recentlyVisitedStartIndex = (recentlyVisitedPage - 1) * ITEMS_PER_PAGE;
  const currentRecentlyVisited = recentlyVisited.slice(recentlyVisitedStartIndex, recentlyVisitedStartIndex + ITEMS_PER_PAGE);

  const followerBoxes = Array.from({ length: 6 }, (_, i) => i + 1);
  const totalFollowersPages = Math.ceil(followerBoxes.length / FOLLOWERS_PER_PAGE);
  const followersStartIndex = (followersPage - 1) * FOLLOWERS_PER_PAGE;
  const currentFollowerBoxes = followerBoxes.slice(
    followersStartIndex,
    followersStartIndex + FOLLOWERS_PER_PAGE
  );

  const articles: any[] = [
    {
      id: 1,
      type: "Free board",
      date: "June 11, 2025",
      title: "Tips for maintaining your luxury watch collection",
      content:
        "Discover essential tips for cleaning, storing, and wearing your luxury watches to preserve their value and beauty over time.",
      views: 35,
      likes: 12,
    },
    {
      id: 2,
      type: "Recommendation",
      date: "November 10, 2025",
      title: "Our recommended dress watches for special occasions",
      content:
        "Explore our curated list of elegant dress watches that perfectly complement formal outfits for weddings, galas, and important meetings.",
      views: 21,
      likes: 8,
    },
    {
      id: 3,
      type: "News",
      date: "November 9, 2025",
      title: "New limited edition releases this season",
      content:
        "Stay up to date with the latest limited edition timepieces from top brands, featuring unique designs, rare materials, and exclusive movements.",
      views: 48,
      likes: 19,
    },
    {
      id: 4,
      type: "News",
      date: "November 9, 2025",
      title: "New limited edition releases this season",
      content:
        "Stay up to date with the latest limited edition timepieces from top brands, featuring unique designs, rare materials, and exclusive movements.",
      views: 48,
      likes: 19,
    },
    {
      id: 5,
      type: "News",
      date: "November 9, 2025",
      title: "New limited edition releases this season",
      content:
        "Stay up to date with the latest limited edition timepieces from top brands, featuring unique designs, rare materials, and exclusive movements.",
      views: 48,
      likes: 19,
    },
    {
      id: 6,
      type: "News",
      date: "November 9, 2025",
      title: "New limited edition releases this season",
      content:
        "Stay up to date with the latest limited edition timepieces from top brands, featuring unique designs, rare materials, and exclusive movements.",
      views: 48,
      likes: 19,
    },
    {
      id: 7,
      type: "News",
      date: "November 9, 2025",
      title: "New limited edition releases this season",
      content:
        "Stay up to date with the latest limited edition timepieces from top brands, featuring unique designs, rare materials, and exclusive movements.",
      views: 48,
      likes: 19,
    },
  ];

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

  const handleArticleLikeClick = (articleId: number) => {
    const isLiked = !!articleLiked[articleId];

    setArticleLiked((prev) => ({
      ...prev,
      [articleId]: !isLiked,
    }));

    setArticleLikes((prev) => ({
      ...prev,
      [articleId]: (prev[articleId] ?? 0) + (isLiked ? -1 : 1),
    }));
  };

  const handleFollowerFollowToggle = (key: string) => {
    const isCurrentlyFollowing = !!followersFollowing[key];

    // Follow / Unfollow holatini almashtirish
    setFollowersFollowing((prev) => ({
      ...prev,
      [key]: !isCurrentlyFollowing,
    }));

    // Followers sonini +1 / -1 ga o'zgartirish
    setFollowersCounts((prev) => ({
      ...prev,
      [key]: (prev[key] ?? 0) + (isCurrentlyFollowing ? -1 : 1),
    }));
  };

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleLikeClick = (watchId: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const isLiked = likedWatches[watchId];
    setLikedWatches((prev) => ({
      ...prev,
      [watchId]: !isLiked,
    }));
    setWatchLikes((prev) => ({
      ...prev,
      [watchId]: isLiked ? prev[watchId] - 1 : prev[watchId] + 1,
    }));
  };

  const handleAddToCart = (watch: Watch, e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      image: watch.image,
      name: watch.name,
      price: watch.price,
    });
  };

  const handleWatchClick = (watchId: number) => {
    router.push(`/watch/detail?id=${watchId}`);
  };

  return (
    <Stack className="mypage-page">
      <Box className="mypage-hero">
        <Box className="mypage-hero-bg" />

        <Box className="mypage-hero-content">
          <Box className="mypage-profile">
            <Box className="mypage-avatar-wrapper">
              <img
                src={displayProfile.photo}
                alt={displayProfile.username}
                className="mypage-avatar"
              />
            </Box>

            <Box className="mypage-profile-text">
              <Typography className="mypage-profile-name">
                {displayProfile.username}
              </Typography>
              <Typography className="mypage-profile-phone">
                {displayProfile.phone}
              </Typography>
              {displayProfile.email && (
                <Typography className="mypage-profile-email">
                  {displayProfile.email}
                </Typography>
              )}
              <Typography className="mypage-profile-role">Dealer</Typography>
            </Box>
          </Box>

          <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "16px", marginTop: "auto", paddingBottom: "40px", marginRight: "-60px" }}>
            <Button
              className="mypage-edit-profile-button"
              onClick={() => setIsEditProfileOpen(true)}
            >
              Edit Profile
            </Button>
            <Button
              className="mypage-logout-button"
              onClick={() => {
                // Logout functionality
                console.log("Logout clicked");
              }}
            >
              Logout
            </Button>
          </Box>
        </Box>
      </Box>

      <Box className="mypage-tabs">
        <Box
          className={`mypage-tab${activeTab === "Watches" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Watches")}
        >
          Watches ({watches.length})
        </Box>
        <Box
          className={`mypage-tab${activeTab === "Favorites" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Favorites")}
        >
          Favorites ({favorites.length})
        </Box>
        <Box
          className={`mypage-tab${activeTab === "Recently Visited" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Recently Visited")}
        >
          Recently Visited ({recentlyVisited.length})
        </Box>
        <Box
          className={`mypage-tab${activeTab === "Followers" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers ({totalFollowersCount})
        </Box>
        <Box
          className={`mypage-tab${activeTab === "Followings" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Followings")}
        >
          Followings ({followerBoxes.length})
        </Box>
        <Box
          className={`mypage-tab${activeTab === "Articles" ? " mypage-tab-active" : ""}`}
          onClick={() => setActiveTab("Articles")}
        >
          Articles ({articles.length})
        </Box>
      </Box>

      {activeTab === "Watches" && (
        <Box className="mypage-watches-container">
          <Box className="mypage-watches-header">
            <Typography className="mypage-watches-container-title">Watches</Typography>
            <Button
              className="mypage-add-watch-button"
              onClick={() => {
                // Add Watch functionality
                console.log("Add Watch clicked");
              }}
            >
              + Add Watch
            </Button>
          </Box>
          {watches.length === 0 ? (
            <Typography className="mypage-watches-empty-message">
              The dealer did not load the watch...
            </Typography>
          ) : (
            <>
              <Box className="mypage-watches-grid">
                {currentWatches.map((watch) => (
                  <Box key={watch.id} className="mypage-watch-item">
                    <Box className="mypage-watch-item-left">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="mypage-watch-item-image"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Box className="mypage-watch-item-icons">
                        <Box className="action-btn" onClick={(e) => handleAddToCart(watch, e)}>
                          <ShoppingBagOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                        </Box>
                        <Box 
                          className={`action-btn action-btn-with-count${likedWatches[watch.id] ? " action-btn-liked" : ""}`}
                          onClick={(e) => handleLikeClick(watch.id, e)}
                        >
                          {likedWatches[watch.id] ? (
                            <Favorite sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          ) : (
                            <FavoriteBorder sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          )}
                          {watchLikes[watch.id] > 0 && (
                            <span className="action-count">{watchLikes[watch.id]}</span>
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
                    <Box className="mypage-watch-item-right">
                      {watch.limitedEdition && (
                        <Typography className="mypage-watch-limited-edition">
                          Limited edition
                        </Typography>
                      )}
                      {watch.brand && (
                        <Typography className="mypage-watch-item-brand">
                          {watch.brand}
                        </Typography>
                      )}
                      <Typography 
                        className="mypage-watch-item-name"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {watch.name}
                      </Typography>
                      <Typography className="mypage-watch-item-price">
                        {watch.price}
                      </Typography>
                      {watch.datePosted && (
                        <Typography className="mypage-watch-item-date">
                          {watch.datePosted}
                        </Typography>
                      )}
                      {watch.watchStatus !== undefined && (
                        <Typography
                          className={`mypage-watch-item-status${
                            !watch.watchStatus ? " mypage-watch-item-status-sold-out" : ""
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
                <Box className="mypage-watches-pagination">
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`mypage-watches-page-number${
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

      {activeTab === "Favorites" && (
        <Box className="mypage-watches-container">
          <Typography className="mypage-watches-container-title">Favorites</Typography>
          {favorites.length === 0 ? (
            <Typography className="mypage-watches-empty-message">
              No favorites yet...
            </Typography>
          ) : (
            <>
              <Box className="mypage-watches-grid">
                {currentFavorites.map((watch) => (
                  <Box key={watch.id} className="mypage-watch-item">
                    <Box className="mypage-watch-item-left">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="mypage-watch-item-image"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Box className="mypage-watch-item-icons">
                        <Box className="action-btn" onClick={(e) => handleAddToCart(watch, e)}>
                          <ShoppingBagOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                        </Box>
                        <Box 
                          className={`action-btn action-btn-with-count${likedWatches[watch.id] ? " action-btn-liked" : ""}`}
                          onClick={(e) => handleLikeClick(watch.id, e)}
                        >
                          {likedWatches[watch.id] ? (
                            <Favorite sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          ) : (
                            <FavoriteBorder sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          )}
                          {watchLikes[watch.id] > 0 && (
                            <span className="action-count">{watchLikes[watch.id]}</span>
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
                    <Box className="mypage-watch-item-right">
                      {watch.limitedEdition && (
                        <Typography className="mypage-watch-limited-edition">
                          Limited edition
                        </Typography>
                      )}
                      {watch.brand && (
                        <Typography className="mypage-watch-item-brand">
                          {watch.brand}
                        </Typography>
                      )}
                      <Typography 
                        className="mypage-watch-item-name"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {watch.name}
                      </Typography>
                      <Typography className="mypage-watch-item-price">
                        {watch.price}
                      </Typography>
                      {watch.datePosted && (
                        <Typography className="mypage-watch-item-date">
                          {watch.datePosted}
                        </Typography>
                      )}
                      {watch.watchStatus !== undefined && (
                        <Typography
                          className={`mypage-watch-item-status${
                            !watch.watchStatus ? " mypage-watch-item-status-sold-out" : ""
                          }`}
                        >
                          {watch.watchStatus ? "on sale" : "sold out"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              {totalFavoritesPages > 1 && (
                <Box className="mypage-watches-pagination">
                  {Array.from({ length: totalFavoritesPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`mypage-watches-page-number${
                          page === favoritesPage ? " active" : ""
                        }`}
                        onClick={() => setFavoritesPage(page)}
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

      {activeTab === "Recently Visited" && (
        <Box className="mypage-watches-container">
          <Typography className="mypage-watches-container-title">Recently Visited</Typography>
          {recentlyVisited.length === 0 ? (
            <Typography className="mypage-watches-empty-message">
              No recently visited watches...
            </Typography>
          ) : (
            <>
              <Box className="mypage-watches-grid">
                {currentRecentlyVisited.map((watch) => (
                  <Box key={watch.id} className="mypage-watch-item">
                    <Box className="mypage-watch-item-left">
                      <img
                        src={watch.image}
                        alt={watch.name}
                        className="mypage-watch-item-image"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      />
                      <Box className="mypage-watch-item-icons">
                        <Box className="action-btn" onClick={(e) => handleAddToCart(watch, e)}>
                          <ShoppingBagOutlined
                            sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                          />
                        </Box>
                        <Box 
                          className={`action-btn action-btn-with-count${likedWatches[watch.id] ? " action-btn-liked" : ""}`}
                          onClick={(e) => handleLikeClick(watch.id, e)}
                        >
                          {likedWatches[watch.id] ? (
                            <Favorite sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          ) : (
                            <FavoriteBorder sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                          )}
                          {watchLikes[watch.id] > 0 && (
                            <span className="action-count">{watchLikes[watch.id]}</span>
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
                    <Box className="mypage-watch-item-right">
                      {watch.limitedEdition && (
                        <Typography className="mypage-watch-limited-edition">
                          Limited edition
                        </Typography>
                      )}
                      {watch.brand && (
                        <Typography className="mypage-watch-item-brand">
                          {watch.brand}
                        </Typography>
                      )}
                      <Typography 
                        className="mypage-watch-item-name"
                        onClick={() => handleWatchClick(watch.id)}
                        style={{ cursor: "pointer" }}
                      >
                        {watch.name}
                      </Typography>
                      <Typography className="mypage-watch-item-price">
                        {watch.price}
                      </Typography>
                      {watch.datePosted && (
                        <Typography className="mypage-watch-item-date">
                          {watch.datePosted}
                        </Typography>
                      )}
                      {watch.watchStatus !== undefined && (
                        <Typography
                          className={`mypage-watch-item-status${
                            !watch.watchStatus ? " mypage-watch-item-status-sold-out" : ""
                          }`}
                        >
                          {watch.watchStatus ? "on sale" : "sold out"}
                        </Typography>
                      )}
                    </Box>
                  </Box>
                ))}
              </Box>
              {totalRecentlyVisitedPages > 1 && (
                <Box className="mypage-watches-pagination">
                  {Array.from({ length: totalRecentlyVisitedPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`mypage-watches-page-number${
                          page === recentlyVisitedPage ? " active" : ""
                        }`}
                        onClick={() => setRecentlyVisitedPage(page)}
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
        <Box className="mypage-followers-container">
          <Typography className="mypage-watches-container-title">Followers</Typography>
          {currentFollowerBoxes.length === 0 ? (
            <Typography className="mypage-watches-empty-message">
              No Followers...
            </Typography>
          ) : (
            <>
              <Box className="mypage-followers-grid">
                {isCurrentUserFollower && (
                  <Box className="mypage-followers-box">
                    <Box className="mypage-followers-box-part part-1">
                      <img
                        src="/img/profile/defaultUser.svg"
                        alt="You"
                        className="mypage-followers-avatar"
                      />
                    </Box>
                    <Box className="mypage-followers-box-part part-2">
                      <Typography className="mypage-followers-name">You</Typography>
                      <Typography className="mypage-followers-role">User</Typography>
                    </Box>
                    <Box className="mypage-followers-box-part part-3">
                      <Typography className="mypage-followers-label">
                        Followers (10)
                      </Typography>
                    </Box>
                    <Box className="mypage-followers-box-part part-4">
                      <Typography className="mypage-followers-label">
                        Followings (5)
                      </Typography>
                    </Box>
                    <Box className="mypage-followers-box-part part-5">
                      <Button
                        className={`mypage-follow-button mypage-follow-button-active`}
                        onClick={() =>
                          setIsDealerFollowing((prev) => {
                            setTotalFollowersCount((count) => count + (prev ? -1 : 1));
                            setIsCurrentUserFollower(!prev);
                            return !prev;
                          })
                        }
                      >
                        Unfollow
                      </Button>
                    </Box>
                  </Box>
                )}
                {currentFollowerBoxes.map((id) => {
                  const key = `followers-${id}`;
                  const isFollowerFollowing = !!followersFollowing[key];
                  const hasAvatar = true; // hozircha hamma uchun rasm bor deb olaylik
                  return (
                    <Box key={id} className="mypage-followers-box">
                      <Box className="mypage-followers-box-part part-1">
                        {hasAvatar ? (
                          <img
                            src="/img/profile/about1.jpeg"
                            alt="Follower"
                            className="mypage-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="mypage-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="mypage-followers-box-part part-2">
                        <Typography className="mypage-followers-name">User name</Typography>
                        <Typography className="mypage-followers-role">Dealer</Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-3">
                        <Typography className="mypage-followers-label">
                          Followers ({followersCounts[key] ?? 0})
                        </Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-4">
                        <Typography className="mypage-followers-label">
                          Followings (5)
                        </Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-5">
                        <Button
                          className={`mypage-follow-button${
                            isFollowerFollowing ? " mypage-follow-button-active" : ""
                          }`}
                          onClick={() => handleFollowerFollowToggle(key)}
                        >
                          {isFollowerFollowing ? "Unfollow" : "Follow"}
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              {totalFollowersPages > 1 && (
                <Box className="mypage-watches-pagination">
                  {Array.from({ length: totalFollowersPages }).map((_, index) => {
                    const page = index + 1;
                    return (
                      <button
                        key={page}
                        className={`mypage-watches-page-number${
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
        <Box className="mypage-followers-container">
          <Typography className="mypage-watches-container-title">Followings</Typography>
          {currentFollowerBoxes.length === 0 ? (
            <Typography className="mypage-watches-empty-message">
              No Followings...
            </Typography>
          ) : (
            <>
              <Box className="mypage-followers-grid">
                {currentFollowerBoxes.map((id) => {
                  const key = `followings-${id}`;
                  const isFollowerFollowing = !!followersFollowing[key];
                  const hasAvatar = true;
                  return (
                    <Box key={id} className="mypage-followers-box">
                      <Box className="mypage-followers-box-part part-1">
                        {hasAvatar ? (
                          <img
                            src="/img/profile/about1.jpeg"
                            alt="Follower"
                            className="mypage-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="mypage-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="mypage-followers-box-part part-2">
                        <Typography className="mypage-followers-name">User name</Typography>
                        <Typography className="mypage-followers-role">Dealer</Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-3">
                        <Typography className="mypage-followers-label">
                          Followers ({followersCounts[key] ?? 0})
                        </Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-4">
                        <Typography className="mypage-followers-label">
                          Followings (5)
                        </Typography>
                      </Box>
                      <Box className="mypage-followers-box-part part-5">
                        <Button
                          className={`mypage-follow-button${
                            isFollowerFollowing ? " mypage-follow-button-active" : ""
                          }`}
                          onClick={() => handleFollowerFollowToggle(key)}
                        >
                          {isFollowerFollowing ? "Unfollow" : "Follow"}
                        </Button>
                      </Box>
                    </Box>
                  );
                })}
              </Box>
              {totalFollowersPages > 1 && (
                <Box className="mypage-watches-pagination">
                  {Array.from({ length: totalFollowersPages }).map((_, index) => {
                    const page = index + 1;
		return (
                      <button
                        key={page}
                        className={`mypage-watches-page-number${
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

      {activeTab === "Articles" && (
        <Box className="mypage-followers-container">
          <Box className="mypage-watches-header">
            <Typography className="mypage-watches-container-title">Articles</Typography>
            <Button
              className="mypage-add-watch-button"
              onClick={() => {
                // Add Article functionality
                console.log("Add Article clicked");
              }}
            >
              + Add Article
            </Button>
          </Box>
          <Box className="mypage-articles-box">
            {articles.length === 0 ? (
              <Typography className="mypage-watches-empty-message">
                The dealer did not load the article...
              </Typography>
            ) : (
              <>
                <Box className="mypage-articles-grid">
                  {currentArticles.map((article) => (
                    <Box key={article.id} className="mypage-article-card">
                      <Box className="mypage-article-header">
                        <Typography className="mypage-article-type">
                          {article.type}
                        </Typography>
                        <Typography className="mypage-article-date">
                          {article.date}
                        </Typography>
                      </Box>

                      <Box className="mypage-article-body">
                        <Box className="mypage-article-title">
                          <Typography className="mypage-article-title-text">
                            {article.title}
                          </Typography>
                        </Box>
                        <Box className="mypage-article-excerpt">
                          <Typography className="mypage-article-excerpt-text">
                            {getArticleExcerpt(article.content, 15)}
                          </Typography>
                        </Box>

                        <Box className="mypage-article-actions">
                          <Box className="mypage-article-read-more">
                            <Typography className="mypage-article-read-more-text">
                              Read more
                            </Typography>
                            <ArrowForwardIos className="mypage-article-read-more-arrow" />
                          </Box>
                          <Box className="mypage-article-actions-right">
                            <Box className="mypage-article-action">
                              <VisibilityOutlined
                                sx={{ fontSize: 22, color: "#000000" }}
                              />
                              {article.views !== undefined && (
                                <Typography className="mypage-article-action-count">
                                  {article.views}
                                </Typography>
                              )}
                            </Box>
                            <Box
                              className="mypage-article-action"
                              onClick={() =>
                                handleArticleLikeClick(article.id)
                              }
                            >
                              {articleLiked[article.id] ? (
                                <Favorite
                                  sx={{ fontSize: 22, color: "#f09620" }}
                                />
                              ) : (
                                <FavoriteBorder
                                  sx={{ fontSize: 22, color: "#000000" }}
                                />
                              )}
                              <Typography className="mypage-article-action-count">
                                {articleLikes[article.id] ??
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
                  <Box className="mypage-watches-pagination">
                    {Array.from({ length: totalArticlePages }).map(
                      (_, index) => {
                        const page = index + 1;
                        return (
                          <button
                            key={page}
                            className={`mypage-watches-page-number${
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

      {isEditProfileOpen && (
        <Box className="mypage-edit-profile-modal">
          <Box className="mypage-edit-profile-modal-overlay" onClick={() => setIsEditProfileOpen(false)} />
          <Box className="mypage-edit-profile-modal-content">
            <Box className="mypage-edit-profile-modal-header">
              <Typography className="mypage-edit-profile-modal-title">Edit Profile</Typography>
              <Button
                className="mypage-edit-profile-modal-close"
                onClick={() => setIsEditProfileOpen(false)}
              >
                <Close />
              </Button>
            </Box>

            <Box className="mypage-edit-profile-form">
              <Box className="mypage-edit-profile-section">
                <Typography className="mypage-edit-profile-section-title">Photo</Typography>
                <Box className="mypage-edit-profile-photo-section">
                  <Box className="mypage-edit-profile-photo-wrapper">
                    <Box className="mypage-edit-profile-photo-placeholder">
                      {profileData.photo ? (
                        <img src={profileData.photo} alt="Profile" className="mypage-edit-profile-photo" />
                      ) : (
                        <PersonOutline className="mypage-edit-profile-photo-icon" />
                      )}
                    </Box>
                    {profileData.photo && (
                      <Button
                        className="mypage-edit-profile-photo-cancel"
                        onClick={() => setProfileData({ ...profileData, photo: null })}
                      >
                        <Delete />
                      </Button>
                    )}
                  </Box>
                  <Box className="mypage-edit-profile-photo-actions">
                    <input
                      type="file"
                      accept="image/jpeg,image/jpg,image/png"
                      style={{ display: "none" }}
                      id="mypage-profile-image-upload"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) {
                          const reader = new FileReader();
                          reader.onloadend = () => {
                            setProfileData({
                              ...profileData,
                              photo: reader.result as string,
                            });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    />
                    <Button
                      className="mypage-edit-profile-upload-button"
                      onClick={() => {
                        const input = document.getElementById("mypage-profile-image-upload");
                        input?.click();
                      }}
                    >
                      Upload Profile Image
                    </Button>
                    <Typography className="mypage-edit-profile-photo-hint">
                      A photo must be in JPG, JPEG or PNG format!
                    </Typography>
                  </Box>
                </Box>
              </Box>

              <Box className="mypage-edit-profile-fields">
                <Box className="mypage-edit-profile-field">
                  <Typography className="mypage-edit-profile-label">Username</Typography>
                  <input
                    type="text"
                    className="mypage-edit-profile-input"
                    value={profileData.username}
                    onChange={(e) => setProfileData({ ...profileData, username: e.target.value })}
                  />
                </Box>

                <Box className="mypage-edit-profile-field">
                  <Typography className="mypage-edit-profile-label">Phone</Typography>
                  <input
                    type="text"
                    className="mypage-edit-profile-input"
                    value={profileData.phone}
                    onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  />
                </Box>

                <Box className="mypage-edit-profile-field">
                  <Typography className="mypage-edit-profile-label">Email</Typography>
                  <input
                    type="email"
                    className="mypage-edit-profile-input"
                    value={profileData.email}
                    placeholder="Your email"
                    onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  />
                </Box>

                <Box className="mypage-edit-profile-field">
                  <Typography className="mypage-edit-profile-label">Address</Typography>
                  <input
                    type="text"
                    className="mypage-edit-profile-input"
                    value={profileData.address}
                    placeholder="Your address"
                    onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                  />
                </Box>
              </Box>

              <Box className="mypage-edit-profile-footer">
                <Button
                  className="mypage-edit-profile-update-button"
                  onClick={() => {
                    // Update profile functionality
                    setDisplayProfile({
                      username: profileData.username || "Caroline",
                      phone: profileData.phone || "(010) 123-41234",
                      email: profileData.email || "",
                      photo: profileData.photo || "/img/profile/ceo.png",
                    });
                    setIsEditProfileOpen(false);
                  }}
                >
                  Update Profile
                  
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      )}

    </Stack>
  );
};

export default withLayoutBasic(MyPage);
