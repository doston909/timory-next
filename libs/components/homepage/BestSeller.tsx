import { useState } from "react";
import { useRouter } from "next/router";
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
import SellIcon from '@mui/icons-material/Sell';
import StarRateIcon from '@mui/icons-material/StarRate';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useCart } from "@/libs/context/CartContext";

import "swiper/css";
import "swiper/css/navigation";

type BestSellerWatch = {
  id: number;
  brand: string;
  model: string;
  price: string;
  image: string;
  likes: number;
  views: number;
};

const bestSellers: BestSellerWatch[] = [
  {
    id: 1,
    brand: "Rolex",
    model: "Day-Date 40",
    price: "$42,900",
    image: "/img/watch/rasm3.png",
    likes: 0,
    views: 2450,
  },
  {
    id: 2,
    brand: "Patek Philippe",
    model: "Nautilus 5711",
    price: "$119,400",
    image: "/img/watch/rasm3.png",
    likes: 96,
    views: 1890,
  },
  {
    id: 3,
    brand: "Audemars Piguet",
    model: "Royal Oak 15500",
    price: "$38,700",
    image: "/img/watch/rasm3.png",
    likes: 87,
    views: 1650,
  },
  {
    id: 4,
    brand: "Richard Mille",
    model: "RM 11-03",
    price: "$189,000",
    image: "/img/watch/rasm3.png",
    likes: 103,
    views: 21,
  },
  {
    id: 5,
    brand: "Rolex",
    model: "Daytona",
    price: "$32,500",
    image: "/img/watch/rasm3.png",
    likes: 78,
    views: 1420,
  },
  {
    id: 6,
    brand: "Patek Philippe",
    model: "Aquanaut",
    price: "$59,900",
    image: "/img/watch/rasm3.png",
    likes: 112,
    views: 1980,
  },
  {
    id: 7,
    brand: "Rolex",
    model: "Day-Date 40",
    price: "$42,900",
    image: "/img/watch/rasm3.png",
    likes: 128,
    views: 2450,
  },
  {
    id: 8,
    brand: "Patek Philippe",
    model: "Nautilus 5711",
    price: "$119,400",
    image: "/img/watch/rasm3.png",
    likes: 96,
    views: 1890,
  },
  {
    id: 9,
    brand: "Audemars Piguet",
    model: "Royal Oak 15500",
    price: "$38,700",
    image: "/img/watch/rasm3.png",
    likes: 87,
    views: 1650,
  },
  {
    id: 10,
    brand: "Richard Mille",
    model: "RM 11-03",
    price: "$189,000",
    image: "/img/watch/rasm3.png",
    likes: 103,
    views: 2100,
  },
  {
    id: 12,
    brand: "Rolex",
    model: "Daytona",
    price: "$32,500",
    image: "/img/watch/rasm3.png",
    likes: 78,
    views: 1420,
  },
  {
    id: 13,
    brand: "Patek Philippe",
    model: "Aquanaut",
    price: "$59,900",
    image: "/img/watch/rasm3.png",
    likes: 112,
    views: 1980,
  },
];

const BestSeller = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [likedWatches, setLikedWatches] = useState<Record<number, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<number, number>>(
    bestSellers.reduce((acc, w) => ({ ...acc, [w.id]: w.likes }), {})
  );

  const handleCardClick = (watchId: number) => {
    router.push(`/watch/detail?id=${watchId}`);
  };

  const handleBagClick = (e: React.MouseEvent, watch: BestSellerWatch) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      name: watch.model,
      model: watch.model,
      brand: watch.brand,
      price: parseFloat(watch.price.replace(/[^0-9.-]+/g, "") || "0"),
      image: watch.image,
      quantity: 1,
    });
  };

  const handleLikeClick = (e: React.MouseEvent, watchId: number, originalLikes: number) => {
    e.stopPropagation();
    setLikedWatches((prev) => {
      const isLiked = !prev[watchId];
      setLikeCounts((counts) => ({
        ...counts,
        [watchId]: isLiked ? counts[watchId] + 1 : Math.max(originalLikes, counts[watchId] - 1),
      }));
      return { ...prev, [watchId]: isLiked };
    });
  };

  const handleSeeAllClick = () => {
    router.push("/watch");
  };

  return (
    <Stack className="best-seller-section">
      <h2 className="section-title">Best Sellers</h2>
      <p className="section-subtitle">Most demanded luxury timepieces.</p>

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
            <SwiperSlide key={w.id}>
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
                        likedWatches[w.id] ? " action-btn-liked" : ""
                      }`}
                      onClick={(e) => handleLikeClick(e, w.id, w.likes)}
                    >
                      {likedWatches[w.id] ? (
                        <FavoriteIcon sx={{ fontSize: 24, fontWeight: 300 }} />
                      ) : (
                        <FavoriteBorderIcon sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                      )}
                      <span className="action-count">{likeCounts[w.id]}</span>
                    </div>
                    <div className="action-btn action-btn-with-count">
                      <CheckCircleIcon
                        sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                      />
                      <span className="action-count">{w.views}</span>
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
          See All <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default BestSeller;
