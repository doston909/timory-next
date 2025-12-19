import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Stack, Box, Typography } from "@mui/material";
import { NextPage } from "next";
import {
  ShoppingBagOutlined,
  FavoriteBorderOutlined,
  VisibilityOutlined,
  ArrowBackIos,
  ArrowForwardIos,
} from "@mui/icons-material";
import { useState } from "react";
import CommunityCard from "/libs/components/community/CommunityCard";

const Community: NextPage = () => {
  const [bestSellerIndex, setBestSellerIndex] = useState(0);

  const recentArticles = [
    {
      id: 1,
      image: "/img/watch/asosiy1.webp",
      title: "How to build watches by machine",
    },
    {
      id: 2,
      image: "/img/watch/fon1.jpg",
      title: "International best branded watches",
    },
  ];

  const tags = ["Free Board", "Recommendation", "News"];

  const bestSellers = [
    {
      id: 1,
      image: "/img/watch/rasmm.png",
      title: "Golden Dial Analog",
      price: "Rs. 3,600.00",
    },
    {
      id: 2,
      image: "/img/watch/rasm1.png",
      title: "Silver Classic Watch",
      price: "Rs. 2,800.00",
    },
    {
      id: 3,
      image: "/img/watch/rasm3.png",
      title: "Premium Luxury Watch",
      price: "Rs. 4,500.00",
    },
  ];

  const articles = [
    {
      id: 1,
      image: "/img/watch/asosiy1.webp",
      author: "RAM M",
      memberType: "Admin",
      date: "MAY 30, 2022",
      comments: 1,
      title: "HOW TO BUILD WATCHES BY MACHINE",
      description:
        "Crese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,..",
    },
    {
      id: 2,
      image: "/img/watch/rasm3.png",
      author: "RAM M",
      memberType: "Member",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "TRENDING FASHION WHITE WATCHES",
      description:
        "Erese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,..",
    },
    {
      id: 3,
      image: "/img/watch/asosiy1.webp",
      author: "RAM M",
      memberType: "Dealer",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "THE CLASSIC DIAL MEN'S WATCHES",
      description:
        "Wrese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,..",
    },
    {
      id: 4,
      image: "/img/watch/rasmm2.png",
      author: "RAM M",
      memberType: "Member",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "MADE OF 100% RECYCLED PLASTIC",
      description:
        "Prese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,...",
    },
      {
      id: 5,
      image: "/img/watch/rasmm.png",
      author: "RAM M",
      memberType: "Admin",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "THE CLASSIC DIAL MEN'S WATCHES",
      description:
        "Wrese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,..",
    },
    {
      id: 6,
      image: "/img/watch/rasmm2.png",
      author: "RAM M",
      memberType: "Dealer",
      date: "APRIL 2, 2022",
      comments: 1,
      title: "MADE OF 100% RECYCLED PLASTIC",
      description:
        "Prese aenean ut eros et nisl sagittis vestibulum. Nullam nulla eros, ultricies sit amet, nonummy id,...",
    },
  ];

  const handlePrevBestSeller = () => {
    setBestSellerIndex((prev) =>
      prev === 0 ? bestSellers.length - 1 : prev - 1
    );
  };

  const handleNextBestSeller = () => {
    setBestSellerIndex((prev) =>
      prev === bestSellers.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Stack className="community-page">
      <Stack className="community-container">
        {/* Left Sidebar */}
        <Stack className="community-sidebar">
          {/* Recent Articles */}
          <Box className="sidebar-section">
            <Typography className="sidebar-title">Recent Articles</Typography>
            <Stack className="recent-articles-list">
              {recentArticles.map((article) => (
                <Box key={article.id} className="recent-article-item">
                  <Box className="recent-article-image">
                    <img src={article.image} alt={article.title} />
                  </Box>
                  <Typography className="recent-article-title">
                    {article.title}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Tags */}
          <Box className="sidebar-section">
            <Typography className="sidebar-title">Type</Typography>
            <Stack className="tags-list" direction="row" flexWrap="wrap" gap={1}>
              {tags.map((tag, index) => (
                <Box key={index} className="tag-item">
                  {tag}
                </Box>
              ))}
            </Stack>
          </Box>

          {/* Best Sellers */}
          <Box className="sidebar-section">
            <Typography className="sidebar-title">Best Sellers</Typography>
            <Box className="best-seller-card">
              <Box className="best-seller-image-wrapper">
                <img
                  src={bestSellers[bestSellerIndex].image}
                  alt={bestSellers[bestSellerIndex].title}
                  className="best-seller-image"
                />
                <Stack className="best-seller-icons">
                  <Box className="icon-wrapper">
                    <ShoppingBagOutlined />
                  </Box>
                  <Box className="icon-wrapper">
                    <FavoriteBorderOutlined />
                  </Box>
                  <Box className="icon-wrapper">
                    <VisibilityOutlined />
                  </Box>
                </Stack>
              </Box>
              <Typography className="best-seller-title">
                {bestSellers[bestSellerIndex].title}
              </Typography>
              <Typography className="best-seller-price">
                {bestSellers[bestSellerIndex].price}
              </Typography>
            </Box>
          </Box>

          {/* Navigation */}
          <Stack className="best-seller-navigation" direction="row" gap={15}>
            <Box
              className="nav-arrow"
              onClick={handlePrevBestSeller}
            >
              <ArrowBackIos sx={{ fontSize: 16 }} />
            </Box>
            <Box
              className="nav-arrow"
              onClick={handleNextBestSeller}
            >
              <ArrowForwardIos sx={{ fontSize: 16 }} />
            </Box>
          </Stack>
        </Stack>

        {/* Main Content */}
        <CommunityCard articles={articles} />
      </Stack>
    </Stack>
  );
};

export default withLayoutBasic(Community);
