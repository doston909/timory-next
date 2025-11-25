import { Box, Stack } from "@mui/material";

export type PopularWatch = {
  id: number;
  brand: string;
  model: string;
  image: string;
};

type Props = {
  watch: PopularWatch;
};

const PopularWatchesCard = ({ watch }: Props) => {
  return (
    <Stack className="popular-watch-card">
      <Box className="image-box">
        <img src={watch.image} alt={watch.model} />
      </Box>

      <Stack className="text-box">
        <span className="brand">{watch.brand}</span>
        <span className="model">{watch.model}</span>
      </Stack>
    </Stack>
  );
};

export default PopularWatchesCard;

