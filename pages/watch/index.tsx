import { Stack, Box, Select, MenuItem, IconButton, OutlinedInput, InputAdornment } from "@mui/material";
import { NextPage } from "next";
import { useState } from "react";
import Head from "next/head";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
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
}

const watches: Watch[] = [
  {
    id: 1,
    name: "Analog Strap Watch",
    price: "Rs. 4,500.00",
    image: "/img/watch/rasm1.png",
  },
  {
    id: 2,
    name: "Black Dail Strap",
    price: "Rs. 2,500.00",
    image: "/img/watch/rasm2.png",
  },
  {
    id: 3,
    name: "Black Dial Classic",
    price: "Rs. 3,326.00",
    image: "/img/watch/rasm3.png",
  },
  {
    id: 4,
    name: "Rose Gold Mesh",
    price: "Rs. 5,200.00",
    image: "/img/watch/rasmm.png",
  },
  {
    id: 5,
    name: "Chronograph Brown",
    price: "Rs. 6,800.00",
    image: "/img/watch/rasmm2.png",
  },
  {
    id: 6,
    name: "Classic Gold",
    price: "Rs. 4,100.00",
    image: "/img/watch/rasm3.png",
  },
];

const WatchList: NextPage = () => {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("featured");
  const [searchText, setSearchText] = useState<string>("");

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"top"}>
          <Top />
        </Stack>

        <Stack
          className={`header-basic`}
          style={{
            backgroundSize: "cover",
            boxShadow: "inser 10px 40px 150px 40px rgb(24 22 36)",
          }}
        >
          <Stack className={"container"}>
            <strong>Watch Search</strong>
            <span>We are glad to see you again!</span>
          </Stack>
        </Stack>

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
                      onClick={() => setViewMode("grid")}
                    >
                      <GridViewIcon />
                    </IconButton>
                    <IconButton
                      className={`view-btn ${viewMode === "list" ? "active" : ""}`}
                      onClick={() => setViewMode("list")}
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
                    </Select>
                  </Box>
                </Box>

                {/* Watch Grid */}
                <Box className={`watch-grid ${viewMode}`}>
                  {watches.map((watch) => (
                    <WatchCard key={watch.id} watch={watch} />
                  ))}
                </Box>
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

export default WatchList;
