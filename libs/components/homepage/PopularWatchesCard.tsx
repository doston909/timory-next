import { Box, Stack } from "@mui/material";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined';

export type PopularWatch = {
  id: number;
  brand: string;
  model: string;
  image: string;
  price?: string;
  likes?: number;
  views?: number;
  comments?: number;
};

type Props = {
  watch: PopularWatch;
};

const PopularWatchesCard = ({ watch }: Props) => {
  return (
    <Stack className="popular-watch-card">
      <Box className="image-box">
        <img src={watch.image} alt={watch.model} />

        {/* 👉 HOVER ICON ACTIONS */}
        <div className="watch-actions">
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
            {watch.comments && <span className="action-count">{watch.views}</span>}
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

