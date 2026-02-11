import React, { useState } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

type Dealer = {
  id: number;
  name: string;
  image: string;
  goal: string;
  original?: boolean;
};

const dealers: Dealer[] = [
  {
    id: 1,
    name: "Seoul Time Boutique",
    image: "/img/profile/ceo.png",
    goal: "A simple, smart way to guide buyers to the right timepiece.",
    original: true,
  },
  {
    id: 2,
    name: "Busan Luxury Watches",
    image: "/img/profile/sardorbek.jpg",
    goal: "A simple, smart way to guide buyers to the right timepiece.",
  },
  {
    id: 3,
    name: "Jeju Island Watch House",
    image: "",
    goal: "Our customers love the transparent information from Timory.",
  },
  {
    id: 4,
    name: "Gangnam Prestige Dealer",
    image: "/img/profile/sardorbek.jpg",
    goal: "Clean design, clear data – perfect for modern collectors.",
  },
  {
    id: 5,
    name: "Daegu Classic Time",
    image: "/img/profile/about1.jpeg",
    goal: "Timory turns complex specs into easy decisions.",
  },
  {
    id: 6,
    name: "Incheon Premium Watches",
    image: "/img/profile/sardorbek.jpg",
    goal: "We trust Timory to educate first‑time buyers.",
  },
  {
    id: 7,
    name: "Hongdae Urban Watch Lab",
    image: "/img/profile/about1.jpeg",
    goal: "Great platform to showcase our curated collections.",
  },
  {
    id: 8,
    name: "Apgujeong Signature Time",
    image: "/img/profile/about1.jpeg",
    goal: "Timory connects stories, specs, and style beautifully.",
  },
  {
    id: 9,
    name: "COEX Elite Dealers",
    image: "/img/profile/about1.jpeg",
    goal: "Our team recommends Timory to every serious enthusiast.",
  },
  {
    id: 10,
    name: "Ulsan Watch Gallery",
    image: "/img/profile/about1.jpeg",
    goal: "A powerful digital assistant for discovering watches.",
  },
  {
    id: 11,
    name: "Gwangju Heritage Time",
    image: "/img/profile/about1.jpeg",
    goal: "Perfect balance of technology and watch culture.",
  },
];

const ITEMS_PER_PAGE = 9;

const DealerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const totalPages = Math.ceil(dealers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDealers = dealers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const topEl = document.getElementById("dealer-list-top");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Stack className="dealer-page">
      <Box id="dealer-list-top" className="dealer-list-header">
        <Typography className="dealer-list-title">
          Our Trusted Dealers
        </Typography>
        <Typography className="dealer-list-subtitle">
          Carefully selected partners from around the world
        </Typography>
      </Box>

      <Box
        className="dealer-grid"
        onClick={() => router.push("/dealer/detail")}
      >
        {currentDealers.map((dealer) => (
          <Box
            key={dealer.id}
            className={dealer.original ? "dealer-card dealer-card-original" : "dealer-card"}
          >
            <Box className="dealer-image-wrapper">
              {dealer.image ? (
                <img
                  src={dealer.image}
                  alt={dealer.name}
                  className={
                    dealer.original
                      ? "dealer-image dealer-image-original"
                      : "dealer-image"
                  }
                />
              ) : (
                <Box className="dealer-image-placeholder">
                  <PersonOutlineIcon className="dealer-user-icon" />
                </Box>
              )}
            </Box>
            <Box className="dealer-card-content">
              <Typography className="dealer-name">{dealer.name}</Typography>
              <Typography className="dealer-label">Dealer</Typography>
              <Typography className="dealer-goal">{dealer.goal}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {totalPages > 1 && (
        <Box className="dealer-pagination">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`dealer-page-number${
                  page === currentPage ? " active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </Box>
      )}
    </Stack>
  );
};

export default withLayoutBasic(DealerPage);


