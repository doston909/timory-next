import React from "react";
import { useRouter } from "next/router";
import { Stack, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PopularWatchesCard, { PopularWatch } from "./PopularWatchesCard";

const popularWatches: PopularWatch[] = [
  {
    id: 1,
    brand: "Rolex",
    model: "Datejust",
    image: "/img/watch/rasmm.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 2,
    brand: "Rolex",
    model: "Submariner",
    image: "/img/watch/rasm1.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 3,
    brand: "Rolex",
    model: "Daytona",
    image: "/img/watch/rasmm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 4,
    brand: "Omega",
    model: "Speedmaster",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
];

const PopularWatches = () => {
  const router = useRouter();

  const handleSeeAllClick = () => {
    router.push("/watch");
  };

  return (
    <Stack className="popular-watches-section">
      <h2 className="section-title">Our Most Popular Models</h2>

      <Box className="popular-watches-grid">
        {popularWatches.length === 0 ? (
          <p className="empty-text">Popular Watches Not Found</p>
        ) : (
          popularWatches.map((watch) => (
            <PopularWatchesCard key={watch.id} watch={watch} />
          ))
        )}
      </Box>

      <Box className="dealers-see-all-wrapper" onClick={handleSeeAllClick} sx={{ cursor: "pointer" }}>
        <Box className="see-all-text">
          See All <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default PopularWatches;

