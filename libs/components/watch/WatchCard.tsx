import { Box, Stack, Typography, IconButton } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useRouter } from "next/router";
import { useCart } from "@/libs/context/CartContext";

interface Watch {
  id: number | string;
  name: string;
  price: string;
  image: string;
  brand?: string;
  type?: string;
  caseSize?: string;
  dialColor?: string;
  material?: string;
  likes?: number;
  views?: number;
  comments?: number;
  limitedEdition?: boolean;
}

interface WatchCardProps {
  watch: Watch;
}

const WatchCard = ({ watch }: WatchCardProps) => {
  const router = useRouter();
  const { addToCart } = useCart();
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(watch.likes ?? 0);

  const getSecondImage = (image: string) => {
    if (image.includes("rasm1")) return image.replace("rasm1", "rasm2");
    if (image.includes("rasm2")) return image.replace("rasm2", "rasm3");
    if (image.includes("rasm3")) return image.replace("rasm3", "rasm1");
    if (image.includes("rasmm.png")) return image.replace("rasmm.png", "rasmm2.png");
    if (image.includes("rasmm2")) return image.replace("rasmm2", "rasmm");
    return image; // Agar topilmasa, bir xil rasm
  };

  const images = [watch.image, getSecondImage(watch.image)];
  
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  const handleLikeClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked((prev) => {
      const next = !prev;
      setLikeCount((count) =>
        next ? count + 1 : Math.max((watch.likes ?? 0), count - 1)
      );
      return next;
    });
  };

  const handleBagClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      name: watch.name,
      model: watch.name,
      brand: watch.brand || "",
      price: parseFloat(watch.price.replace(/[^0-9.-]+/g, "") || "0"),
      image: watch.image,
      quantity: 1,
    });
  };

  const goToDetail = (e: React.MouseEvent) => {
    e.preventDefault();
    const id = watch.id != null ? String(watch.id) : "";
    if (id) router.push(`/watch/detail?id=${encodeURIComponent(id)}`);
  };

  return (
    <Box
      className="watch-card"
      onClick={goToDetail}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToDetail(e as unknown as React.MouseEvent);
        }
      }}
      sx={{ cursor: "pointer" }}
    >
      <Box className="watch-image-box">
        {/* Limited Edition Badge */}
        {watch.limitedEdition && (
          <Box
            sx={{
              position: 'absolute',
              top: 10,
              left: 10,
              backgroundColor: '#f09620',
              color: '#ffffff',
              padding: '4px 10px',
              borderRadius: '4px',
              fontSize: '12px',
              fontWeight: 600,
              zIndex: 10,
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Limited Edition
          </Box>
        )}
        
        <img 
          src={images[currentImageIndex]} 
          alt={watch.name} 
          className="watch-image"
          style={{ pointerEvents: 'none' }}
        />
        
        {/* 👉 HOVER ICON ACTIONS */}
        <div className="watch-actions" onClick={handleActionClick}>
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
              <FavoriteBorderIcon sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
            )}
            {likeCount > 0 && <span className="action-count">{likeCount}</span>}
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

        {/* 👉 PAGINATION BUTTONS */}
        {images.length > 1 && (
          <>
            <IconButton
              className="watch-scroll-arrow watch-scroll-arrow-left"
              aria-label="Previous"
              onClick={handlePrev}
            >
              <ChevronLeftIcon />
            </IconButton>
            <IconButton
              className="watch-scroll-arrow watch-scroll-arrow-right"
              aria-label="Next"
              onClick={handleNext}
            >
              <ChevronRightIcon />
            </IconButton>
          </>
        )}
      </Box>
      <Stack className="watch-info">
        <Typography className="watch-name" style={{ pointerEvents: 'none' }}>
          {watch.name}
        </Typography>
        <Typography className="watch-price" style={{ pointerEvents: 'none' }}>{watch.price}</Typography>
      </Stack>
    </Box>
  );
};

export default WatchCard;

