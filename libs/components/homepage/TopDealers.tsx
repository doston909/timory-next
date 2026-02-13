import { Box, Stack, IconButton, Button } from "@mui/material";
import { useRouter } from "next/router";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopDealerCard, { TopDealerCardProps } from "./TopDealerCard";
import "swiper/css";
import "swiper/css/navigation";

// 8 dealers data
const dealersData: TopDealerCardProps[] = [
  {
    id: 1,
    dealerName: "Swiss Prestige House",
    logoUrl: "/img/agent/dos.png",
    rating: 4.9,
    like: 10,
    reviewCount: 1250,
    establishedYear: 2012,
    city: "Zurich",
    country: "Switzerland",
    watches: 132,
    responseTime: "Responds within 4 hours",
    verified: true,
  },
  {
    id: 2,
    dealerName: "Lux Time Gallery",
    logoUrl: "/img/agent/dos.png",
    rating: 4.8,
    like: 10,
    reviewCount: 980,
    establishedYear: 2015,
    city: "Paris",
    country: "France",
    watches: 98,
    responseTime: "Responds within 3 hours",
    verified: true,
  },
  {
    id: 3,
    dealerName: "Tokyo Elite Horology",
    logoUrl: "/img/agent/dos.png",
    rating: 4.7,
    like: 10,
    reviewCount: 856,
    establishedYear: 2018,
    city: "Tokyo",
    country: "Japan",
    watches: 115,
    responseTime: "Responds within 6 hours",
    verified: false,
  },
  {
    id: 4,
    dealerName: "Milano Luxury Trade",
    logoUrl: "/img/agent/dos.png",
    rating: 4.6,
    like: 10,
    reviewCount: 723,
    establishedYear: 2019,
    city: "Milan",
    country: "Italy",
    watches: 76,
    responseTime: "Responds within 5 hours",
    verified: false,
  },
  {
    id: 5,
    dealerName: "Berlin Watch Masters",
    logoUrl: "/img/agent/dos.png",
    rating: 4.8,
    like: 10,
    reviewCount: 1120,
    establishedYear: 2013,
    city: "Berlin",
    country: "Germany",
    watches: 145,
    responseTime: "Responds within 2 hours",
    verified: true,
  },
  {
    id: 6,
    dealerName: "London Timepiece",
    logoUrl: "/img/agent/dos.png",
    rating: 4.9,
    like: 10,
    reviewCount: 1450,
    establishedYear: 2010,
    city: "London",
    country: "United Kingdom",
    watches: 168,
    responseTime: "Responds within 3 hours",
    verified: true,
  },
  {
    id: 7,
    dealerName: "Madrid Watch House",
    logoUrl: "/img/agent/dos.png",
    rating: 4.7,
    like: 10,
    reviewCount: 890,
    establishedYear: 2016,
    city: "Madrid",
    country: "Spain",
    watches: 92,
    responseTime: "Responds within 5 hours",
    verified: false,
  },
  {
    id: 8,
    dealerName: "Warsaw Luxury Watches",
    logoUrl: "/img/agent/dos.png",
    rating: 4.6,
    like: 10,
    reviewCount: 645,
    establishedYear: 2020,
    city: "Warsaw",
    country: "Poland",
    watches: 68,
    responseTime: "Responds within 4 hours",
    verified: false,
  },
];

const TopDealers = () => {
  const router = useRouter();
  const handleViewProfile = (dealerName: string) => {
    console.log(`Viewing profile of ${dealerName}`);
  };

  const handleContact = (dealerName: string) => {
    console.log(`Contacting ${dealerName}`);
  };

  return (
    <Stack className="top-dealers-section">
      {/* TITLE */}
      <h2 className="section-title">Top Dealers</h2>

      {/* Swiper Container - 3 cards visible */}
      <Box className="top-dealers-container">
        <IconButton
          className="scroll-arrow scroll-arrow-left dealer-prev-btn"
          aria-label="Previous dealers"
        >
          <ChevronLeftIcon />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          slidesPerView={3}
          spaceBetween={30}
          navigation={{
            nextEl: ".dealer-next-btn",
            prevEl: ".dealer-prev-btn",
          }}
          allowTouchMove={true}
          speed={500}
          className="top-dealers-swiper"
        >
          {dealersData.map((dealer, index) => (
            <SwiperSlide key={index}>
              <TopDealerCard
                {...dealer}
                onViewProfile={() => handleViewProfile(dealer.dealerName)}
                onContact={() => handleContact(dealer.dealerName)}
              />
            </SwiperSlide>
          ))}
        </Swiper>

        <IconButton
          className="scroll-arrow scroll-arrow-right dealer-next-btn"
          aria-label="Next dealers"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      {/* See All - ostida */}
      <Box className="dealers-see-all-wrapper">
        <Box
          className="see-all-text"
          onClick={() => router.push("/dealer")}
        >
          See All <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default TopDealers;
