import { Box, Stack, IconButton } from "@mui/material";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useQuery } from "@apollo/client";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import TopDealerCard, { TopDealerCardProps } from "./TopDealerCard";
import { useTranslation } from "@/libs/context/useTranslation";
import { GET_DEALERS } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";
import "swiper/css";
import "swiper/css/navigation";

const TOP_DEALERS_VARS = {
  input: {
    page: 1,
    limit: 6,
    sort: "memberRank",
    direction: "DESC" as const,
    search: {},
  },
};

const TopDealers = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data: dealersData } = useQuery(GET_DEALERS, {
    variables: TOP_DEALERS_VARS,
  });
  const dealersList = dealersData?.getDealers?.list ?? [];
  const dealers: TopDealerCardProps[] = useMemo(() => {
    return dealersList.map((m: any) => ({
      id: m._id,
      dealerName: m.memberName ?? "—",
      logoUrl: m.memberPhoto ? watchImageUrl(m.memberPhoto) : "",
      rating: 0,
      like: m.memberLikes ?? 0,
      reviewCount: m.memberComments ?? 0,
      establishedYear: m.createdAt ? new Date(m.createdAt).getFullYear() : 0,
      city: "",
      country: "",
      watches: m.memberWatches ?? 0,
      responseTime: "",
      verified: false,
    }));
  }, [dealersList]);

  const handleViewProfile = (dealerName: string) => {
    console.log(`Viewing profile of ${dealerName}`);
  };

  const handleContact = (dealerName: string) => {
    console.log(`Contacting ${dealerName}`);
  };

  return (
    <Stack className="top-dealers-section">
      {/* TITLE */}
      <h2 className="section-title">{t("home.topDealers")}</h2>

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
          {dealers.map((dealer, index) => (
            <SwiperSlide key={dealer.id ?? index}>
              <TopDealerCard
                {...dealer}
                homepageSectionId="top-dealers"
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
      <Box
        className="dealers-see-all-wrapper"
        onClick={() => {
          saveHomepageSectionBeforeNav("top-dealers");
          router.push("/dealer");
        }}
        sx={{ cursor: "pointer" }}
      >
        <Box className="see-all-text">
          {t("home.seeAll")} <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default TopDealers;
