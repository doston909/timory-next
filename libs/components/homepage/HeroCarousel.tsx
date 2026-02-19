import { Stack, Button, Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectFade } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from "@/libs/context/useTranslation";

const HeroCarousel = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const slides = [
    { id: 1, image: "/img/watch/home7.jpeg" },
    { id: 2, image: "/img/watch/home55.jpg" },
    { id: 3, image: "/img/watch/home11.jpg" },
  ];

  return (
    <Stack className="hero-carousel">
      <Box className="hero-carousel-container">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          spaceBetween={0}
          slidesPerView={1}
          navigation={{
            nextEl: ".hero-next-btn",
            prevEl: ".hero-prev-btn",
          }}
          pagination={{ clickable: true }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          effect="fade"
          loop={true}
          className="hero-swiper"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id} className="hero-slide">
              <div className="slide-background">
                <Image
                  src={slide.image}
                  alt=""
                  fill
                  priority={slide.id === 1}
                  style={{ objectFit: "cover" }}
                />
                <div className="slide-overlay"></div>
              </div>
              <Stack className="slide-content container">
                <Stack className="slide-text">
                  <span className="slide-label">{t(`home.heroSlide${slide.id}Title`)}</span>
                  <h2 className="slide-title">{t(`home.heroSlide${slide.id}Subtitle`)}</h2>
                  <p className="slide-description">{t(`home.heroSlide${slide.id}Desc`)}</p>
                  <Button
                    className="shopping-now-btn"
                    variant="contained"
                    onClick={() => router.push("/watch")}
                  >
                    {t("home.shoppingNow")}
                  </Button>
                </Stack>
              </Stack>
            </SwiperSlide>
          ))}
        </Swiper>

        <Box className="hero-nav-buttons">
          <IconButton
            className="scroll-arrow scroll-arrow-left hero-prev-btn"
            aria-label="Previous slide"
          >
            <ChevronLeftIcon />
          </IconButton>
          <IconButton
            className="scroll-arrow scroll-arrow-right hero-next-btn"
            aria-label="Next slide"
          >
            <ChevronRightIcon />
          </IconButton>
        </Box>
      </Box>
    </Stack>
  );
};

export default HeroCarousel;