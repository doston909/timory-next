import { Box, Stack, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { useTranslation } from "@/libs/context/useTranslation";
import VerifiedIcon from "@mui/icons-material/Verified";
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import FavoriteBorderOutlinedIcon from '@mui/icons-material/FavoriteBorderOutlined';
import WatchLaterIcon from '@mui/icons-material/WatchLater';

export interface TopDealerCardProps {
  id?: number;
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
  homepageSectionId?: string;
  onViewProfile?: () => void;
  onContact?: () => void;
}

const TopDealerCard = ({
  id,
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
  homepageSectionId,
  onViewProfile,
  onContact,
}: TopDealerCardProps) => {
  const router = useRouter();
  const { t } = useTranslation();

  const handleCardClick = () => {
    if (id) {
      if (homepageSectionId) saveHomepageSectionBeforeNav(homepageSectionId);
      router.push(`/dealer/detail?id=${id}`);
    }
  };

  return (
    <Box className="top-dealer-card-new" onClick={handleCardClick} sx={{ cursor: "pointer" }}>
      {/* Image Box */}
      <Box className="dealer-image-box">
        <img src="/img/dealer/doston.jpg" alt={dealerName} className="dealer-image" />
        
        {/* Hover Overlay with Info */}
        <Box className="dealer-hover-overlay">
          {/* Rating */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <StarBorderOutlinedIcon className="info-icon" />
            <Typography className="info-text">
              {rating.toFixed(1)} ({reviewCount} {t("home.reviews")})
            </Typography>
          </Stack>

           <Stack className="dealer-info-row" direction="row" spacing={1}>
            <FavoriteBorderOutlinedIcon className="info-icon" />
            <Typography className="info-text">
              {like} {t("home.likes")}
            </Typography>
          </Stack>

          {/* Listings */}
          <Stack className="dealer-info-row" direction="row" spacing={1}>
            <WatchLaterIcon className="info-icon" />
            <Typography className="info-text">
              {activeListings} {t("home.listingsWatches")}
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
