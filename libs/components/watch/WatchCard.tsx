import { Box, Stack, Typography, IconButton } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useState } from "react";
import { useRouter } from "next/router";

interface Watch {
  id: number;
  name: string;
  price: string;
  image: string;
  likes?: number;
  views?: number;
  comments?: number;
}

interface WatchCardProps {
  watch: Watch;
}

const WatchCard = ({ watch }: WatchCardProps) => {
  const router = useRouter();

  // 2 ta rasm array - birinchi rasm watch.image, ikkinchi rasm boshqa rasm
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

  const handleCardClick = () => {
    router.push(`/watch/detail?id=${watch.id}`);
  };

  return (
    <Box className="watch-card" onClick={handleCardClick}>
      <Box className="watch-image-box">
        <img src={images[currentImageIndex]} alt={watch.name} className="watch-image" />
        
        {/* 👉 HOVER ICON ACTIONS */}
        <div className="watch-actions" onClick={handleActionClick}>
          <div className="action-btn">
            <ShoppingBagOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
          </div>
          <div className="action-btn action-btn-with-count">
            <FavoriteBorderIcon sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
            {watch.likes && <span className="action-count">{watch.likes}</span>}
          </div>
          <div className="action-btn action-btn-with-count">
            <VisibilityOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
            {watch.views && <span className="action-count">{watch.views}</span>}
          </div>
          <div className="action-btn action-btn-with-count">
            <CommentOutlinedIcon
              sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
            />
            {watch.comments && <span className="action-count">{watch.comments}</span>}
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
        <Typography className="watch-name">{watch.name}</Typography>
        <Typography className="watch-price">{watch.price}</Typography>
      </Stack>
    </Box>
  );
};

export default WatchCard;

