import { Box, Stack } from "@mui/material";

type PopularWatch = {
  id: number;
  brand: string;
  model: string;
  price: string;
  image: string;
  badge?: string;
  specs: string[];
};

const PopularWatchesCard = ({ watch }: { watch: PopularWatch }) => (
  <Stack className="popular-watch-card">
    <Box className="preview">
      <img src={watch.image} alt={`${watch.brand} ${watch.model}`} />
      {watch.badge && <span className="badge">{watch.badge}</span>}
    </Box>
    <Stack className="details">
      <span className="brand">{watch.brand}</span>
      <h3>{watch.model}</h3>
      <p className="price">{watch.price}</p>

      <div className="specs">
        {watch.specs.map((spec) => (
          <span key={spec}>{spec}</span>
        ))}
      </div>
    </Stack>
  </Stack>
);

export default PopularWatchesCard;
