import { Stack, Box, Select, MenuItem, IconButton, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WatchCard from "@/libs/components/watch/WatchCard";
import Filter from "@/libs/components/watch/Filter";
import Top from "@/libs/components/Top";
import Footer from "@/libs/components/Footer";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";

interface Watch {
  id: number;
  name: string;
  price: string;
  image: string;
  likes?: number;
  views?: number;
  comments?: number;
}

const watches: Watch[] = [
  {
    id: 1,
    name: "Analog Strap Watch",
    price: "Rs. 4,500.00",
    image: "/img/watch/rasm1.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 2,
    name: "Black Dail Strap",
    price: "Rs. 2,500.00",
    image: "/img/watch/rasm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 3,
    name: "Black Dial Classic",
    price: "Rs. 3,326.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 4,
    name: "Rose Gold Mesh",
    price: "Rs. 5,200.00",
    image: "/img/watch/rasmm.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 5,
    name: "Chronograph Brown",
    price: "Rs. 6,800.00",
    image: "/img/watch/rasmm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 6,
    name: "Classic Gold",
    price: "Rs. 4,100.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
   {
    id: 7,
    name: "Chronograph Brown",
    price: "Rs. 6,800.00",
    image: "/img/watch/rasmm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 8,
    name: "Classic Gold",
    price: "Rs. 4,100.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
   {
    id: 9,
    name: "Classic Gold",
    price: "Rs. 4,100.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
   {
    id: 10,
    name: "Analog Strap Watch",
    price: "Rs. 4,500.00",
    image: "/img/watch/rasm1.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 11,
    name: "Black Dail Strap",
    price: "Rs. 2,500.00",
    image: "/img/watch/rasm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 12,
    name: "Black Dial Classic",
    price: "Rs. 3,326.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 13,
    name: "Rose Gold Mesh",
    price: "Rs. 5,200.00",
    image: "/img/watch/rasmm.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 14,
    name: "Chronograph Brown",
    price: "Rs. 6,800.00",
    image: "/img/watch/rasmm2.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  {
    id: 15,
    name: "Classic Gold",
    price: "Rs. 4,100.00",
    image: "/img/watch/rasm3.png",
    likes: 2,
    views: 35,
    comments: 17,
  },
  
   
   
];

const WatchList: NextPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  
  const itemsPerPage = viewMode === "list" ? 6 : 9; // List view'da 6 ta, Grid view'da 9 ta
  const totalPages = Math.ceil(watches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWatches = watches.slice(startIndex, endIndex);

  return (
    <>
      <Stack id="pc-wrap">

        <Stack id={"main"}>
          <Stack className="watch-list-page">
            <Box className="watch-list-content">
              {/* Left Side - Filter */}
              <Box className="watch-filter-sidebar">
                <Filter />
              </Box>

              {/* Right Side - Watch Grid */}
              <Box className="watch-list-main">
                {/* Header Controls */}
                <Box className="watch-list-header">
                  {/* View Mode Toggle */}
                  <Box className="view-mode-toggle">
                    <IconButton
                      className={`view-btn ${viewMode === "grid" ? "active" : ""}`}
                      onClick={() => {
                        setViewMode("grid");
                        setCurrentPage(1);
                      }}
                    >
                      <GridViewIcon />
                    </IconButton>
                    <IconButton
                      className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => {
                        setViewMode("list");
                        setCurrentPage(1);
                      }}
                    >
                      <ViewListIcon />
                    </IconButton>
                  </Box>

                  {/* Filter */}
                  <Box className="filter-dropdown">
                    <span className="filter-label"></span>
                    <OutlinedInput
                      value={searchText}
                      type={"text"}
                      className={"filter-search-input"}
                      placeholder={"Search..."}
                      onChange={(e: any) => setSearchText(e.target.value)}
                      startAdornment={
                        <InputAdornment position="start">
                          <SearchIcon sx={{ fontSize: 24, color: "#000000ff" }} />
                        </InputAdornment>
                      }
                      endAdornment={
                        searchText && (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setSearchText("")}
                              edge="end"
                              sx={{
                                padding: "4px",
                                color: "#666666",
                                "&:hover": {
                                  color: "#000000",
                                },
                              }}
                            >
                              <CloseIcon sx={{ fontSize: 20 }} />
                            </IconButton>
                          </InputAdornment>
                        )
                      }
                    />
                  </Box>

                  {/* Sort Dropdown */}
                  <Box className="sort-dropdown">
                    <span className="sort-label">Sort by</span>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                    >
                      <MenuItem value="featured">Featured</MenuItem>
                      <MenuItem value="price-asc">Price: Low to High</MenuItem>
                      <MenuItem value="price-desc">Price: High to Low</MenuItem>
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="newest">Limited Editions</MenuItem>
                    </Select>
                  </Box>
                </Box>

                {/* Watch Grid */}
                {currentWatches.length > 0 ? (
                  <Box className={`watch-grid ${viewMode}`}>
                    {currentWatches.map((watch) => (
                      <WatchCard key={watch.id} watch={watch} />
                    ))}
                  </Box>
                ) : (
                  <Box className="watch-not-found">
                    <Typography className="not-found-text">Watch Not Found</Typography>
                  </Box>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <Box className="watch-pagination">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Box
                        key={page}
                        className={`pagination-number ${currentPage === page ? "active" : ""}`}
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Box>
                    ))}
                  </Box>
                )}
              </Box>
            </Box>
          </Stack>
        </Stack>

        <Stack id={"footer"}>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(WatchList);
