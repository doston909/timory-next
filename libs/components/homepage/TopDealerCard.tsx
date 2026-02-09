import { Box, Stack, Button, Typography } from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

export interface TopDealerCardProps {
  dealerName: string;
  logoUrl: string;
  rating: number;
  like: number;
  reviewCount: number;
  establishedYear: number;
  city: string;
  country: string;
  watches: number;
  responseTime: string;
  verified?: boolean;
  onViewProfile?: () => void;
  onContact?: () => void;
}

const TopDealerCard = ({
  dealerName,
  logoUrl,
  rating,
  like,
  reviewCount,
  city,
  country,
  watches: activeListings,
  responseTime,
  verified = false,
  onViewProfile,
  onContact,
}: TopDealerCardProps) => {
  return (
    <Box className="top-dealer-card-new">
      {/* Image Box */}
      <Box className="dealer-image-box">
        <img src={logoUrl} alt={dealerName} className="dealer-image" />
        
        {/* Hover Overlay with Info */}
        <Box className="dealer-hover-overlay">
          {/* Rating */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <StarBorderOutlinedIcon className="info-icon" />
            <Typography className="info-text">
              {rating.toFixed(1)} ({reviewCount} reviews)
            </Typography>
          </Stack>

           <Stack className="dealer-info-row" direction="row" spacing={1}>
            <FavoriteBorderOutlinedIcon className="info-icon" />
            <Typography className="info-text">
              {like} Likes
            </Typography>
          </Stack>

          {/* Listings */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <WatchLaterIcon className="info-icon" />
            <Typography className="info-text">
              {activeListings} Watches
            </Typography>
          </Stack>

            {/* Location */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <PlaceOutlinedIcon className="info-icon" />
            <Typography className="info-text">
              {city}, {country}
            </Typography>
          </Stack>

          {/* Response Time */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <AccessTimeIcon className="info-icon" />
            <Typography className="info-text">{responseTime}</Typography>
          </Stack>
         
        </Box>
        
      </Box>

      {/* Name Below Image */}
      <Stack className="dealer-name-below" direction="row" spacing={1} alignItems="center" justifyContent="center">
        <Typography className="dealer-name-text">{dealerName}</Typography>
        {verified && <VerifiedIcon className="verified-icon-small" />}
      </Stack>
    </Box>
  );
};

export default TopDealerCard;
