import { Box, Stack, Typography } from "@mui/material";

interface Watch {
  id: number;
  name: string;
  price: string;
  image: string;
}

interface WatchCardProps {
  watch: Watch;
}

const WatchCard = ({ watch }: WatchCardProps) => {
  return (
    <Box className="watch-card">
      <Box className="watch-image-box">
        <img src={watch.image} alt={watch.name} className="watch-image" />
      </Box>
      <Stack className="watch-info">
        <Typography className="watch-name">{watch.name}</Typography>
        <Typography className="watch-price">{watch.price}</Typography>
      </Stack>
    </Box>
  );
};

export default WatchCard;

