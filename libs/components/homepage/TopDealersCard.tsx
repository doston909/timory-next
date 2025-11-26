import { Box, Stack } from "@mui/material";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

export type TopDealer = {
  id: number;
  name: string;
  avatar: string;
  city: string;
  country: string;
  brands: string[];
  rating: number;
  sold: number;
  totalWatches: number;
  yearsActive: number;
  dealerType: string;
  isFeatured?: boolean;
};

const TopDealersCard = ({ dealer }: { dealer: TopDealer }) => {
  return (
    <Stack className="top-dealer-card" direction="row">

      {/* LEFT — IMAGE */}
      <Box className="dealer-card-left">
        <img src={dealer.avatar} alt={dealer.name} className="dealer-card-photo" />

        {dealer.isFeatured && (
          <span className="dealer-card-badge">Top Dealer</span>
        )}
      </Box>

      {/* RIGHT — INFO */}
      <Stack className="dealer-card-right">
        <h3 className="dealer-card-name">{dealer.name}</h3>

        <p className="dealer-card-location">
          <PlaceOutlinedIcon className="loc-icon" />
          {dealer.city}, {dealer.country}
        </p>

        <p className="dealer-card-type"><strong>{dealer.dealerType}</strong></p>

        <p className="dealer-card-brands">
          <strong>Brands:</strong> {dealer.brands.join(", ")}
        </p>

        <p className="dealer-card-rating">
          ⭐ {dealer.rating} • {dealer.sold} sold
        </p>

        <p className="dealer-card-inventory">
          Inventory: <strong>{dealer.totalWatches}</strong> watches
        </p>

        <p className="dealer-card-years">
          Active: {dealer.yearsActive} years
        </p>
      </Stack>

    </Stack>
  );
};

export default TopDealersCard;



