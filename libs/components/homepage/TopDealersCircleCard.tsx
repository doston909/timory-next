import { Stack } from "@mui/material";
import RoomRoundedIcon from "@mui/icons-material/RoomRounded";


export type DealerMini = {
  id: number;
  name: string;
  avatar: string;
  city: string;
  rating: number;
};

const TopDealerCircleCard = ({
  dealer,
}: {
  dealer: DealerMini;
}) => {
  return (
    <Stack className="dealer-circle-card">
      <img src={dealer.avatar} className="circle-photo" alt={dealer.name} />

      <p className="circle-name">{dealer.name}</p>

  <p className="circle-city">
  <RoomRoundedIcon   className="city-icon" />
      {dealer.city}
</p>

      <p className="circle-rating">⭐ {dealer.rating}</p>
    </Stack>
  );
};

export default TopDealerCircleCard;