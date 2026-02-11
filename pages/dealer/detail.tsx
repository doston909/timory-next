import React, { useState } from "react";
import { Box, Stack, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import { ShoppingBagOutlined, FavoriteBorder, Favorite, VisibilityOutlined, CommentOutlined, ArrowForwardIos, PersonOutline, ArrowForward } from "@mui/icons-material";
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

const DealerDetailPage = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  // Asosiy dealer uchun Follow/Unfollow
  const [isDealerFollowing, setIsDealerFollowing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [activeTab, setActiveTab] = useState("Watches");
  const [followersPage, setFollowersPage] = useState(1);
  // Followers listidagi har bir user uchun alohida Follow/Unfollow holati
  const [followersFollowing, setFollowersFollowing] = useState<{ [key: number]: boolean }>({});
  // Har bir follower uchun Followers soni (bosilganda +1 / -1 bo'ladi)
  const [followersCounts, setFollowersCounts] = useState<{ [key: number]: number }>(() => {
    const initial: { [key: number]: number } = {};
    for (let i = 1; i <= 6; i += 1) {
      initial[i] = 10; // boshlang'ich qiymat
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

  const totalPages = Math.ceil(watches.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentWatches = watches.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
      id: 3,
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

  const handleFollowerFollowToggle = (id: number) => {
    const isCurrentlyFollowing = !!followersFollowing[id];

    // Follow / Unfollow holatini almashtirish
    setFollowersFollowing((prev) => ({
      ...prev,
      [id]: !isCurrentlyFollowing,
    }));

    // Followers sonini +1 / -1 ga o'zgartirish
    setFollowersCounts((prev) => ({
      ...prev,
      [id]: (prev[id] ?? 0) + (isCurrentlyFollowing ? -1 : 1),
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
    <Stack className="dealer-detail-page">
      <Box className="dealer-detail-hero">
        <Box className="dealer-detail-hero-bg" />

        <Box className="dealer-detail-hero-content">
          <Box className="dealer-detail-profile">
            <Box className="dealer-avatar-wrapper">
              <img
                src="/img/profile/ceo.png"
                alt="Caroline"
                className="dealer-avatar"
              />
            </Box>

            <Box className="dealer-profile-text">
              <Typography className="dealer-profile-name">
                Caroline
              </Typography>
              <Typography className="dealer-profile-phone">
                (010) 123-41234
              </Typography>
              <Typography className="dealer-profile-role">Dealer</Typography>
            </Box>
          </Box>

          <Button
            className={`dealer-follow-button${
              isDealerFollowing ? " dealer-follow-button-active" : ""
            }`}
            onClick={() => setIsDealerFollowing((prev) => !prev)}
          >
            {isDealerFollowing ? "Unfollow" : "Follow"}
          </Button>
        </Box>
      </Box>

      <Box className="dealer-detail-tabs">
        <Box
          className={`dealer-tab${activeTab === "Watches" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Watches")}
        >
          Watches
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Followers" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Followers")}
        >
          Followers
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Followings" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Followings")}
        >
          Followings
        </Box>
        <Box
          className={`dealer-tab${activeTab === "Articles" ? " dealer-tab-active" : ""}`}
          onClick={() => setActiveTab("Articles")}
        >
          Articles
        </Box>
        <Box
          className={`dealer-tab${
            activeTab === "Contact Dealer" ? " dealer-tab-active" : ""
          }`}
          onClick={() => setActiveTab("Contact Dealer")}
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
          {currentFollowerBoxes.length === 0 ? (
            <Typography className="dealer-watches-empty-message">
              No Followers...
            </Typography>
          ) : (
            <>
              <Box className="dealer-followers-grid">
                {currentFollowerBoxes.map((id) => {
                  const isFollowerFollowing = !!followersFollowing[id];
                  const hasAvatar = true; // hozircha hamma uchun rasm bor deb olaylik
                  return (
                    <Box key={id} className="dealer-followers-box">
                      <Box className="dealer-followers-box-part part-1">
                        {hasAvatar ? (
                          <img
                            src="/img/profile/about1.jpeg"
                            alt="Follower"
                            className="dealer-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="dealer-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="dealer-followers-box-part part-2">
                        <Typography className="dealer-followers-name">User name</Typography>
                        <Typography className="dealer-followers-role">Dealer</Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-3">
                        <Typography className="dealer-followers-label">
                          Followers ({followersCounts[id] ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-4">
                        <Typography className="dealer-followers-label">
                          Followings (5)
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-5">
                        <Button
                          className={`dealer-follow-button${
                            isFollowerFollowing ? " dealer-follow-button-active" : ""
                          }`}
                          onClick={() => handleFollowerFollowToggle(id)}
                        >
                          {isFollowerFollowing ? "Unfollow" : "Follow"}
                        </Button>
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
          {currentFollowerBoxes.length === 0 ? (
            <Typography className="dealer-watches-empty-message">
              No Followings...
            </Typography>
          ) : (
            <>
              <Box className="dealer-followers-grid">
                {currentFollowerBoxes.map((id) => {
                  const isFollowerFollowing = !!followersFollowing[id];
                  const hasAvatar = true;
                  return (
                    <Box key={id} className="dealer-followers-box">
                      <Box className="dealer-followers-box-part part-1">
                        {hasAvatar ? (
                          <img
                            src="/img/profile/about1.jpeg"
                            alt="Follower"
                            className="dealer-followers-avatar"
                          />
                        ) : (
                          <PersonOutline className="dealer-followers-avatar-icon" />
                        )}
                      </Box>
                      <Box className="dealer-followers-box-part part-2">
                        <Typography className="dealer-followers-name">User name</Typography>
                        <Typography className="dealer-followers-role">Dealer</Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-3">
                        <Typography className="dealer-followers-label">
                          Followers ({followersCounts[id] ?? 0})
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-4">
                        <Typography className="dealer-followers-label">
                          Followings (5)
                        </Typography>
                      </Box>
                      <Box className="dealer-followers-box-part part-5">
                        <Button
                          className={`dealer-follow-button${
                            isFollowerFollowing ? " dealer-follow-button-active" : ""
                          }`}
                          onClick={() => handleFollowerFollowToggle(id)}
                        >
                          {isFollowerFollowing ? "Unfollow" : "Follow"}
                        </Button>
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
                        <Box className="dealer-article-title">
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
                          <Box className="dealer-article-read-more">
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
                              {articleLiked[article.id] ? (
                                <Favorite
                                  sx={{ fontSize: 22, color: "#f09620" }}
                                />
                              ) : (
                                <FavoriteBorder
                                  sx={{ fontSize: 22, color: "#000000" }}
                                />
                              )}
                              <Typography className="dealer-article-action-count">
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

                <Button className="cs-contact-submit">
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


