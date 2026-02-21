import { useState } from "react";
import { useRouter } from "next/router";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { Stack, Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCart } from "@/libs/context/CartContext";
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";

import "swiper/css";
import "swiper/css/navigation";

type BestSellerWatch = {
  id: string | number;
  brand: string;
  model: string;
  price: string;
  image: string;
  likes: number;
  views: number;
};

const BestSeller = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const { data } = useQuery(GET_WATCHES, {
    variables: {
      input: {
        page: 1,
        limit: 24,
        sort: "createdAt",
        direction: "ASC",
        search: {},
      },
    },
  });
  const list = data?.getWatches?.list ?? [];
  const mapped = list.map((w: any) => ({
    id: w._id,
    brand: w.watchBrand ?? "",
    model: w.watchModelName ?? "",
    price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "$0.00",
    image: watchImageUrl(w.watchImages?.[0]),
    likes: w.watchLikes ?? 0,
    views: w.watchViews ?? 0,
  }));
  const byLikes = [...mapped].sort((a, b) => b.likes - a.likes);
  const hasAnyLikes = byLikes.length > 0 && byLikes[0].likes > 0;
  const bestSellers: BestSellerWatch[] = hasAnyLikes ? byLikes.slice(0, 8) : mapped.slice(0, 8);
  const [likedWatches, setLikedWatches] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    bestSellers.reduce((acc, w) => ({ ...acc, [String(w.id)]: w.likes }), {})
  );

  const handleCardClick = (watchId: string | number) => {
    saveHomepageSectionBeforeNav("best-seller");
    router.push(`/watch/detail?id=${watchId}`);
  };

  const handleBagClick = (e: React.MouseEvent, watch: BestSellerWatch) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      name: watch.model,
      model: watch.model,
      brand: watch.brand,
      price: parseFloat(String(watch.price).replace(/[^0-9.-]+/g, "")) || 0,
      image: watch.image,
      quantity: 1,
    });
  };

  const handleLikeClick = (e: React.MouseEvent, watchId: string | number, originalLikes: number) => {
    e.stopPropagation();
    const key = String(watchId);
    setLikedWatches((prev) => {
      const isLiked = !prev[key];
      setLikeCounts((counts) => ({
        ...counts,
        [key]: isLiked ? (counts[key] ?? 0) + 1 : Math.max(originalLikes, (counts[key] ?? 0) - 1),
      }));
      return { ...prev, [key]: isLiked };
    });
  };

  const handleSeeAllClick = () => {
    saveHomepageSectionBeforeNav("best-seller");
    router.push("/watch");
  };

  return (
    <Stack className="best-seller-section">
      <h2 className="section-title">{t("home.bestSellers")}</h2>
      <p className="section-subtitle">{t("home.bestSellersSubtitle")}</p>

      <Box className="best-seller-container">
        <IconButton
          className="scroll-arrow scroll-arrow-left best-prev-btn"
          aria-label="Previous watches"
        >
          <ChevronLeftIcon />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          slidesPerView={4} 
          spaceBetween={30}
          navigation={{
            nextEl: ".best-next-btn",
            prevEl: ".best-prev-btn",
          }}
          allowTouchMove={true}
          speed={500}
          className="best-seller-swiper"
        >
          {bestSellers.map((w) => (
            <SwiperSlide key={String(w.id)}>
              <Box
                className="best-watch-card"
                onClick={() => handleCardClick(w.id)}
                sx={{ cursor: "pointer" }}
              >
                <div className="image-box">
                  <img src={w.image} alt={w.model} />

                  <div className="watch-actions">
                    <div className="action-btn" onClick={(e) => handleBagClick(e, w)}>
                      <ShoppingBagOutlinedIcon
                        sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                      />
                    </div>
                    <div
                      className={`action-btn action-btn-with-count${
                        likedWatches[String(w.id)] ? " action-btn-liked" : ""
                      }`}
                      onClick={(e) => handleLikeClick(e, w.id, w.likes)}
                    >
                      {likedWatches[String(w.id)] ? (
                        <FavoriteIcon sx={{ fontSize: 24, fontWeight: 300 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                      )}
                      <span className="action-count">{likeCounts[String(w.id)] ?? w.likes}</span>
                    </div>
                    <div className="action-btn action-btn-with-count">
                      <CheckCircleIcon
                        sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                      />
                      <span className="action-count">{w.views ?? 0}</span>
                    </div>
                  </div>
                </div>

                <div className="info">
                  <p className="brand">{w.brand}</p>
                  <p className="model">{w.model}</p>
                </div>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className="scroll-arrow scroll-arrow-right best-next-btn"
          aria-label="Next watches"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className="dealers-see-all-wrapper" onClick={handleSeeAllClick} sx={{ cursor: "pointer" }}>
        <Box className="see-all-text">
          {t("home.seeAll")} <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default BestSeller;
