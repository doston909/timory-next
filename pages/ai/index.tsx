import { Stack, Box, Typography } from "@mui/material";

export interface AiWatchResult {
  model: string;
  brand: string;
  price: string;
  image: string;
  reason: string;
  description: string;
}

const AiWatchResultCard = ({ item }: { item?: AiWatchResult }) => {
  if (!item) {
    // When rendered as a standalone /ai page (no props),
    // render nothing instead of crashing during prerender.
    return null;
  }

  return (
    <Stack className="ai-watch-card">
      <Box className="image-box">
        <img src={item.image} alt={item.model} />
      </Box>

      <Stack className="info">
        <Typography className="brand">{item.brand}</Typography>
        <Typography className="model">{item.model}</Typography>
        <Typography className="price">{item.price}</Typography>

        <Typography className="reason-title">Why this fits you</Typography>
        <Typography className="reason-text">{item.reason}</Typography>

        <Typography className="desc">{item.description}</Typography>
      </Stack>
    </Stack>
  );
};

export default AiWatchResultCard;