import { Stack, Box, Button } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

import "swiper/css";
import "swiper/css/navigation";

type BestSellerWatch = {
  id: number;
  brand: string;
  model: string;
  price: string;
  image: string;
  likes: number;
};

const bestSellers: BestSellerWatch[] = [
  {
    id: 1,
    brand: "Rolex",
    model: "Day-Date 40",
    price: "$42,900",
    image: "/img/watch/rasm3.png",
    likes: 128,
  },
  {
    id: 2,
    brand: "Patek Philippe",
    model: "Nautilus 5711",
    price: "$119,400",
    image: "/img/watch/rasm3.png",
    likes: 96,
  },
  {
    id: 3,
    brand: "Audemars Piguet",
    model: "Royal Oak 15500",
    price: "$38,700",
    image: "/img/watch/rasm3.png",
    likes: 87,
  },
  {
    id: 4,
    brand: "Richard Mille",
    model: "RM 11-03",
    price: "$189,000",
    image: "/img/watch/rasm3.png",
    likes: 103,
  },
  {
    id: 5,
    brand: "Rolex",
    model: "Daytona",
    price: "$32,500",
    image: "/img/watch/rasm3.png",
    likes: 78,
  },
  {
    id: 6,
    brand: "Patek Philippe",
    model: "Aquanaut",
    price: "$59,900",
    image: "/img/watch/rasm3.png",
    likes: 112,
  },
  {
    id: 7,
    brand: "Rolex",
    model: "Day-Date 40",
    price: "$42,900",
    image: "/img/watch/rasm3.png",
    likes: 128,
  },
  {
    id: 8,
    brand: "Patek Philippe",
    model: "Nautilus 5711",
    price: "$119,400",
    image: "/img/watch/rasm3.png",
    likes: 96,
  },
  {
    id: 9,
    brand: "Audemars Piguet",
    model: "Royal Oak 15500",
    price: "$38,700",
    image: "/img/watch/rasm3.png",
    likes: 87,
  },
  {
    id: 10,
    brand: "Richard Mille",
    model: "RM 11-03",
    price: "$189,000",
    image: "/img/watch/rasm3.png",
    likes: 103,
  },
  {
    id: 12,
    brand: "Rolex",
    model: "Daytona",
    price: "$32,500",
    image: "/img/watch/rasm3.png",
    likes: 78,
  },
  {
    id: 13,
    brand: "Patek Philippe",
    model: "Aquanaut",
    price: "$59,900",
    image: "/img/watch/rasm3.png",
    likes: 112,
  },
];

const BestSeller = () => {
  return (
    <Stack className="best-seller-section">
      <h2 className="section-title">Best Sellers</h2>
      <p className="section-subtitle">Most demanded luxury timepieces.</p>

      {/* ▶ SWIPER */}
      <Swiper
        modules={[Navigation]}
        slidesPerView={4} // 4 ta card bir qatorda
        spaceBetween={30}
        navigation={{
          nextEl: ".best-next-btn",
          prevEl: ".best-prev-btn",
        }}
        allowTouchMove={false} // sichqoncha bilan surilmaydi
        speed={500}
        className="best-seller-swiper"
      >
        {bestSellers.map((w) => (
          <SwiperSlide key={w.id}>
            <Box className="best-watch-card">
              <div className="image-box">
                <img src={w.image} alt={w.model} />
              </div>

              <div className="info">
                <p className="brand">{w.brand}</p>
                <p className="model">{w.model}</p>
                <p className="likes">❤️ {w.likes}</p>
              </div>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* ▶ BOTTOM CONTROL BUTTONS */}
      <Stack
        className="bottom-controls"
        direction="row"
        justifyContent="space-between"
      >
        {/* ARROWS */}
        <Stack direction="row" gap={2}>
          <button className="scroll-btn best-prev-btn">
            <ArrowBackIosIcon sx={{  color: "#fff" }} />
          </button>

          <button className="scroll-btn best-next-btn">
            <ArrowForwardIosIcon sx={{  color: "#fff" }} />
          </button>
        </Stack>

        <Button className="see-all-btn">See All Watches <ArrowForwardIosIcon sx={{ fontSize: 22, color: "#fff" }} /></Button>
      </Stack>
    </Stack>
  );
};

export default BestSeller;
