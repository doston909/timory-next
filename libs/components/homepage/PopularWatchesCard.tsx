import { Box, Stack } from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import { useCart } from "@/libs/context/CartContext";

export type PopularWatch = {
  id: string | number;
  brand: string;
  model: string;
  image: string;
  price?: string;
  likes?: number;
  views?: number;
  comments?: number;
  meLiked?: { memberId: string; likeRefId: string; myFavorite: boolean }[];
};

type Props = {
  watch: PopularWatch;
  homepageSectionId?: string;
  onLike?: (watchId: string) => void;
};

const PopularWatchesCard = ({ watch, homepageSectionId, onLike }: Props) => {
  const router = useRouter();
  const [isLikedLocal, setIsLikedLocal] = useState(false);
  const [likeCountLocal, setLikeCountLocal] = useState(watch.likes ?? 0);
  const { addToCart } = useCart();
  const isLiked = onLike ? (watch.meLiked != null && watch.meLiked.length > 0) : isLikedLocal;
  const likeCount = onLike ? (watch.likes ?? 0) : likeCountLocal;

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onLike) {
      onLike(String(watch.id));
      return;
    }
    setIsLikedLocal((prev) => {
      const next = !prev;
      setLikeCountLocal((count) =>
        next ? count + 1 : Math.max((watch.likes ?? 0), count - 1)
      );
      return next;
    });
  };

  const handleBagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      name: watch.model,
      model: watch.model,
      brand: watch.brand,
      price: parseFloat(watch.price?.replace(/[^0-9.-]+/g, "") || "0"),
      image: watch.image,
      quantity: 1,
    });
  };

  const handleCardClick = () => {
    if (homepageSectionId) saveHomepageSectionBeforeNav(homepageSectionId);
    router.push(`/watch/detail?id=${watch.id}`);
  };

  return (
    <Stack className="popular-watch-card" onClick={handleCardClick} sx={{ cursor: "pointer" }}>
      <Box className="image-box">
        <img src={watch.image} alt={watch.model} />

        {/* 👉 HOVER ICON ACTIONS */}
        <div className="watch-actions">
          <div className="action-btn" onClick={handleBagClick}>
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
          </div>
          <div
            className={`action-btn action-btn-with-count${
              isLiked ? " action-btn-liked" : ""
            }`}
            onClick={handleLikeClick}
          >
            {isLiked ? (
              <FavoriteIcon sx={{ fontSize: 24, fontWeight: 300 }} />
            ) : (
              <FavoriteBorderIcon
                sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
              />
            )}
            <span className="action-count">{likeCount}</span>
          </div>
          <div className="action-btn action-btn-with-count">
            <VisibilityOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
            <span className="action-count">{watch.views ?? 0}</span>
          </div>
          <div className="action-btn action-btn-with-count">
            <CommentOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
            <span className="action-count">{watch.comments ?? 0}</span>
          </div>
        </div>
      </Box>

      <Stack className="text-box">
        <span className="brand">{watch.brand}</span>
        <span className="model">{watch.model}</span>
        {watch.price && <span className="price">{watch.price}</span>}
      </Stack>
    </Stack>
  );
};

export default PopularWatchesCard;

