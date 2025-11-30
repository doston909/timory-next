import { Box, Stack } from "@mui/material";
import { useState } from "react";
import TopDealersCard, { TopDealer } from "./TopDealersCard";
import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";

// Simple box data (left side 3 boxes)
const simpleBoxes = [
  {
    id: 1,
    name: "Daniel Müller",
    avatar: "/img/agent/dos.png",
    city: "Zurich",
    rating: 4.9,
  },
  {
    id: 2,
    name: "Sophie Laurent",
    avatar: "/img/agent/dos.png",
    city: "Paris",
    rating: 4.8,
  },
  {
    id: 3,
    name: "Kenji Yamamoto",
    avatar: "/img/agent/dos.png",
    city: "Tokyo",
    rating: 4.7,
  },
];

// Full dealer info (right side large card)
const fullDealers: TopDealer[] = [
  {
    id: 1,
    name: "Swiss Prestige House",
    avatar: "/img/agent/dos.png",
    city: "Zurich",
    country: "Switzerland",
    brands: ["Rolex", "Patek Philippe", "AP"],
    rating: 4.9,
    sold: 420,
    totalWatches: 128,
    yearsActive: 22,
    dealerType: "Authorized Dealer",
    isFeatured: true,
  },
  {
    id: 2,
    name: "Lux Time Gallery",
    avatar: "/img/agent/dos.png",
    city: "Paris",
    country: "France",
    brands: ["Richard Mille", "AP", "Vacheron"],
    rating: 4.8,
    sold: 360,
    totalWatches: 90,
    yearsActive: 17,
    dealerType: "Exclusive Boutique",
    isFeatured: true,
  },
  {
    id: 3,
    name: "Tokyo Elite Horology",
    avatar: "/img/agent/dos.png",
    city: "Tokyo",
    country: "Japan",
    brands: ["Grand Seiko", "Rolex", "Richard Mille"],
    rating: 4.7,
    sold: 295,
    totalWatches: 112,
    yearsActive: 14,
    dealerType: "Independent Dealer",
  },
];

const TopDealers = () => {
  // DEFAULT: birinchi dealer o'ng tomonda turadi
  const [selectedDealerId, setSelectedDealerId] = useState<number>(1);

  const activeDealer = fullDealers.find((d) => d.id === selectedDealerId)!;

  return (
    <Stack className="top-dealers-section">
      {/* TITLE */}
      <h2 className="section-title">Top Dealers</h2>

      {/* ROW */}
      <Stack className="top-dealers-row" direction="row">
        {/* LEFT — 3 ta box (60%) */}
        <Box className="dealer-box-left">
          <Stack className="dealer-left-inner" direction="row">
            {simpleBoxes.map((box) => (
              <Box
                key={box.id}
                className={`dealer-simple-box ${
                  selectedDealerId === box.id ? "active" : ""
                }`}
                onClick={() => setSelectedDealerId(box.id)}
              >
                <img
                  src={box.avatar}
                  alt={box.name}
                  className="dealer-simple-avatar"
                />
                <h3 className="dealer-simple-name">{box.name}</h3>
                <p className="dealer-simple-location">
                  <PlaceOutlinedIcon className="dealer-simple-icon" />
                  {box.city}
                </p>
                <p className="dealer-simple-rating">⭐ {box.rating}</p>
              </Box>
            ))}
          </Stack>
        </Box>

        {/* RIGHT — Katta box (40%) */}
        <Box className="dealer-box-right">
          <TopDealersCard dealer={activeDealer} />
        </Box>
      </Stack>
    </Stack>
  );
};

export default TopDealers;
