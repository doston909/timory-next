import { Stack, Box, Select, MenuItem, IconButton, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import GridViewIcon from "@mui/icons-material/GridView";
import ViewListIcon from "@mui/icons-material/ViewList";
import SearchIcon from "@mui/icons-material/Search";
import CloseIcon from "@mui/icons-material/Close";
import WatchCard from "@/libs/components/watch/WatchCard";
import Filter from "@/libs/components/watch/Filter";
import Top from "@/libs/components/Top";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";

interface Watch {
  id: number;
  name: string;
  price: string;
  image: string;
  brand?: string;
  type?: string;
  caseSize?: string;
  dialColor?: string;
  material?: string;
  likes?: number;
  views?: number;
  comments?: number;
  createdAt?: string;
  limitedEdition?: boolean;
}

const watches: Watch[] = [
  {
    id: 1,
    name: "Analog Strap Watch",
    price: "$ 4,500.00",
    image: "/img/watch/rasm1.png",
    brand: "Rolex",
    type: "Men",
    caseSize: "41–44mm",
    dialColor: "Black",
    material: "Stainless Steel",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-01-10T10:00:00Z",
    limitedEdition: false,
  },
  {
    id: 2,
    name: "Black Dail Strap",
    price: "$ 2,500.00",
    image: "/img/watch/rasm2.png",
    brand: "Omega",
    type: "Women",
    caseSize: "28–32mm",
    dialColor: "White",
    material: "Leather",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-01-15T14:30:00Z",
    limitedEdition: true,
  },
  {
    id: 3,
    name: "Black Dial Classic",
    price: "$ 3,326.00",
    image: "/img/watch/rasm3.png",
    brand: "Patek Philippe",
    type: "Men",
    caseSize: "37–40mm",
    dialColor: "Black",
    material: "Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-01-20T09:15:00Z",
    limitedEdition: false,
  },
  {
    id: 4,
    name: "Rose Gold Mesh",
    price: "$ 5,200.00",
    image: "/img/watch/rasmm.png",
    brand: "Rolex",
    type: "Women",
    caseSize: "33–36mm",
    dialColor: "Silver",
    material: "Rose Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-01-25T16:45:00Z",
    limitedEdition: true,
  },
  {
    id: 5,
    name: "Chronograph Brown",
    price: "$ 6,800.00",
    image: "/img/watch/rasmm2.png",
    brand: "Tag Heuer",
    type: "Sport",
    caseSize: "45mm+",
    dialColor: "Brown",
    material: "Titanium",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-01T11:20:00Z",
    limitedEdition: false,
  },
  {
    id: 6,
    name: "Classic Gold",
    price: "$ 4,100.00",
    image: "/img/watch/rasm3.png",
    brand: "Omega",
    type: "Unisex",
    caseSize: "37–40mm",
    dialColor: "Gold",
    material: "Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-05T13:00:00Z",
    limitedEdition: true,
  },
   {
    id: 7,
    name: "Chronograph Brown",
    price: "$ 6,800.00",
    image: "/img/watch/rasmm2.png",
    brand: "Breitling",
    type: "Men",
    caseSize: "41–44mm",
    dialColor: "Blue",
    material: "Ceramic",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-08T10:30:00Z",
    limitedEdition: false,
  },
  {
    id: 8,
    name: "Classic Gold",
    price: "$ 4,100.00",
    image: "/img/watch/rasm3.png",
    brand: "Cartier",
    type: "Women",
    caseSize: "28–32mm",
    dialColor: "White",
    material: "Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-10T15:00:00Z",
    limitedEdition: true,
  },
   {
    id: 9,
    name: "Classic Gold",
    price: "$ 4,100.00",
    image: "/img/watch/rasm3.png",
    brand: "Rolex",
    type: "Unisex",
    caseSize: "37–40mm",
    dialColor: "Green",
    material: "Stainless Steel",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-12T08:45:00Z",
    limitedEdition: false,
  },
   {
    id: 10,
    name: "Analog Strap Watch",
    price: "$ 4,500.00",
    image: "/img/watch/rasm1.png",
    brand: "IWC",
    type: "Sport",
    caseSize: "45mm+",
    dialColor: "Black",
    material: "Carbon",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-13T12:00:00Z",
    limitedEdition: true,
  },
  {
    id: 11,
    name: "Black Dail Strap",
    price: "$ 2,500.00",
    image: "/img/watch/rasm2.png",
    brand: "Seiko",
    type: "Men",
    caseSize: "37–40mm",
    dialColor: "Blue",
    material: "Rubber",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-14T09:30:00Z",
    limitedEdition: false,
  },
  {
    id: 12,
    name: "Black Dial Classic",
    price: "$ 3,326.00",
    image: "/img/watch/rasm3.png",
    brand: "Tudor",
    type: "Women",
    caseSize: "33–36mm",
    dialColor: "Silver",
    material: "Rose Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-15T14:15:00Z",
    limitedEdition: true,
  },
  {
    id: 13,
    name: "Rose Gold Mesh",
    price: "$ 5,200.00",
    image: "/img/watch/rasmm.png",
    brand: "Panerai",
    type: "Men",
    caseSize: "45mm+",
    dialColor: "Skeleton",
    material: "Titanium",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-16T11:00:00Z",
    limitedEdition: false,
  },
  {
    id: 14,
    name: "Chronograph Brown",
    price: "$ 6,800.00",
    image: "/img/watch/rasmm2.png",
    brand: "Hublot",
    type: "Sport",
    caseSize: "41–44mm",
    dialColor: "Brown",
    material: "Ceramic",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-17T16:30:00Z",
    limitedEdition: true,
  },
  {
    id: 15,
    name: "Classic Gold",
    price: "$ 4,100.00",
    image: "/img/watch/rasm3.png",
    brand: "Audemars Piguet",
    type: "Unisex",
    caseSize: "37–40mm",
    dialColor: "Gold",
    material: "Gold",
    likes: 2,
    views: 35,
    comments: 17,
    createdAt: "2024-02-18T10:00:00Z",
    limitedEdition: false,
  },
  
   
   
];

const WatchList: NextPage = () => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  useEffect(() => {
    if (router.isReady && router.query.sort === "limited-editions") {
      setSortBy("limited-editions");
    }
  }, [router.isReady, router.query.sort]);

  const [searchText, setSearchText] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);

  // Open watch page with brand/watchType from URL (e.g. search tags: Rolex, Omega, Sport Watches)
  useEffect(() => {
    if (!router.isReady) return;
    const brand = router.query.brand;
    const watchType = router.query.watchType;
    if (typeof brand === "string" && brand) {
      setSelectedBrands([decodeURIComponent(brand)]);
    }
    if (typeof watchType === "string" && watchType) {
      setSelectedTypes([decodeURIComponent(watchType)]);
    }
  }, [router.isReady, router.query.brand, router.query.watchType]);

  // Search from URL (e.g. header search → /watch?search=...)
  useEffect(() => {
    if (!router.isReady) return;
    const search = router.query.search;
    if (typeof search === "string" && search) {
      setSearchText(decodeURIComponent(search));
    }
  }, [router.isReady, router.query.search]);

  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDialColors, setSelectedDialColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [watchPrice, setWatchPrice] = useState({
    start: 0,
    end: 10000000,
  });
  
  // Search orqali filter qilingan watchlar (name, brand, type bo‘yicha)
  const searchLower = searchText.toLowerCase().trim();
  const searchedWatches = searchLower
    ? watches.filter((watch) => {
        const name = (watch.name || "").toLowerCase();
        const brand = (watch.brand || "").toLowerCase();
        const type = (watch.type || "").toLowerCase();
        return name.includes(searchLower) || brand.includes(searchLower) || type.includes(searchLower);
      })
    : watches;
  
  // Brand filter
  const brandFiltered = selectedBrands.length > 0
    ? searchedWatches.filter((watch) => selectedBrands.includes(watch.brand || ""))
    : searchedWatches;
  
  // Type filter
  const typeFiltered = selectedTypes.length > 0
    ? brandFiltered.filter((watch) => selectedTypes.includes(watch.type || ""))
    : brandFiltered;
  
  // Case Size filter
  const sizeFiltered = selectedSizes.length > 0
    ? typeFiltered.filter((watch) => selectedSizes.includes(watch.caseSize || ""))
    : typeFiltered;
  
  // Dial Color filter
  const colorFiltered = selectedDialColors.length > 0
    ? sizeFiltered.filter((watch) => selectedDialColors.includes(watch.dialColor || ""))
    : sizeFiltered;
  
  // Material filter
  const materialFiltered = selectedMaterials.length > 0
    ? colorFiltered.filter((watch) => selectedMaterials.includes(watch.material || ""))
    : colorFiltered;
  
  // Price Range filter
  const priceFiltered = materialFiltered.filter((watch) => {
    const price = parseFloat(watch.price.replace(/[^0-9.-]+/g, ""));
    return price >= watchPrice.start && price <= watchPrice.end;
  });
  
  // Limited Edition filter
  const filteredByType = sortBy === "limited-editions"
    ? priceFiltered.filter((watch) => watch.limitedEdition === true)
    : priceFiltered;
  
  // Sort qilish
  const filteredWatches = [...filteredByType].sort((a, b) => {
    if (sortBy === "price-asc") {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      return priceA - priceB;
    }
    if (sortBy === "price-desc") {
      const priceA = parseFloat(a.price.replace(/[^0-9.-]+/g, ""));
      const priceB = parseFloat(b.price.replace(/[^0-9.-]+/g, ""));
      return priceB - priceA;
    }
    if (sortBy === "newest") {
      const dateA = new Date(a.createdAt || "2024-01-01").getTime();
      const dateB = new Date(b.createdAt || "2024-01-01").getTime();
      return dateB - dateA; // Eng yangilarni birinchi
    }
    return 0; // Default - o'zgartirmaslik
  });
  
  const itemsPerPage = viewMode === "list" ? 6 : 9; // List view'da 6 ta, Grid view'da 9 ta
  const totalPages = Math.ceil(filteredWatches.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentWatches = filteredWatches.slice(startIndex, endIndex);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentPage(1); // Search qilganda birinchi sahifaga qaytamiz
  };

  return (
    <>
      <Stack id="pc-wrap">

        <Stack id={"main"}>
          <Stack className="watch-list-page">
            <Box className="watch-list-content">
              {/* Left Side - Filter */}
              <Box className="watch-filter-sidebar">
                <Filter 
                  selectedBrands={selectedBrands}
                  setSelectedBrands={setSelectedBrands}
                  selectedTypes={selectedTypes}
                  setSelectedTypes={setSelectedTypes}
                  selectedSizes={selectedSizes}
                  setSelectedSizes={setSelectedSizes}
                  selectedDialColors={selectedDialColors}
                  setSelectedDialColors={setSelectedDialColors}
                  selectedMaterials={selectedMaterials}
                  setSelectedMaterials={setSelectedMaterials}
                  watchPrice={watchPrice}
                  setWatchPrice={setWatchPrice}
                />
              </Box>

              {/* Right Side - Watch Grid */}
              <Box className="watch-list-main" sx={{ fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>
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

                 
                  <Box className="filter-dropdown">
                    <span className="filter-label"></span>
                    <form onSubmit={handleSearch} style={{ width: "100%" }}>
                      <OutlinedInput
                        value={searchText}
                        type={"text"}
                        className={"filter-search-input"}
                        placeholder={"Search..."}
                        onChange={(e: any) => {
                          setSearchText(e.target.value);
                          setCurrentPage(1); // Search qilganda birinchi sahifaga qaytamiz
                        }}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSearch(e);
                          }
                        }}
                        startAdornment={
                          <InputAdornment position="start">
                            <SearchIcon sx={{ fontSize: 24, color: "rgb(141, 141, 141)" }} />
                          </InputAdornment>
                        }
                        endAdornment={
                          searchText && (
                            <InputAdornment position="end">
                              <IconButton
                                onClick={() => {
                                  setSearchText("");
                                  setCurrentPage(1);
                                }}
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
                    </form>
                  </Box>

                  {/* Sort Dropdown */}
                  <Box className="sort-dropdown">
                    <span className="sort-label">Sort by</span>
                    <Select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="sort-select"
                      MenuProps={{
                        PaperProps: {
                          className: "sort-select-menu",
                          sx: {
                            '& .MuiMenuItem-root': {
                              fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                              '&:hover': {
                                backgroundColor: '#f5f5f5',
                              },
                              '&.Mui-selected': {
                                backgroundColor: '#c1c1c1',
                                '&:hover': {
                                  backgroundColor: '#c7bdbd',
                                }
                              }
                            }
                          }
                        }
                      }}
                    >
                      <MenuItem value="newest">Newest</MenuItem>
                      <MenuItem value="price-asc">Price: Low to High</MenuItem>
                      <MenuItem value="price-desc">Price: High to Low</MenuItem>
                      <MenuItem value="limited-editions">Limited Editions</MenuItem>
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
                    <Typography className="not-found-text">
                      {searchText.trim() 
                        ? `No results found for "${searchText}"`
                        : "Watch Not Found"
                      }
                    </Typography>
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
      </Stack>
    </>
  );
};

export default withLayoutBasic(WatchList);
