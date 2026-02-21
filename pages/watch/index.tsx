import { Stack, Box, Select, MenuItem, IconButton, OutlinedInput, InputAdornment, Typography } from "@mui/material";
import { NextPage } from "next";
import { useState, useEffect, useMemo } from "react";
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
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";

interface Watch {
  id: number | string;
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

function mapApiToListWatch(w: any): Watch {
  return {
    id: w._id,
    name: w.watchModelName ?? "",
    price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "",
    image: watchImageUrl(w.watchImages?.[0]),
    brand: w.watchBrand ?? undefined,
    type: w.watchType ?? undefined,
    caseSize: w.watchCaseSize ?? undefined,
    dialColor: w.watchColor ?? undefined,
    material: w.watchMaterial ?? undefined,
    likes: w.watchLikes ?? 0,
    views: w.watchViews ?? 0,
    comments: w.watchComments ?? 0,
    createdAt: w.createdAt ?? undefined,
    limitedEdition: w.watchLimitedEdition ?? false,
  };
}

const WatchList: NextPage = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState("newest");

  const { data: watchesData } = useQuery(GET_WATCHES, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        sort: "createdAt",
        direction: "DESC",
        search: {},
      },
    },
  });
  const watches: Watch[] = useMemo(
    () => (watchesData?.getWatches?.list ?? []).map(mapApiToListWatch),
    [watchesData]
  );

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
  
  // Type filter: Filter uses "Men","Women","Unisex","Sport" but API returns "MEN","WOMEN","UNISEX","ELITE-SPORT"
  const filterTypeToApi = (display: string) => {
    const map: Record<string, string> = {
      Men: "MEN",
      Women: "WOMEN",
      Unisex: "UNISEX",
      Sport: "ELITE-SPORT",
    };
    return map[display] ?? display;
  };
  const typeFiltered = selectedTypes.length > 0
    ? brandFiltered.filter((watch) =>
        selectedTypes.some((sel) => {
          const apiType = filterTypeToApi(sel);
          const wType = watch.type || "";
          return apiType === wType || (sel === "Sport" && (wType === "ELITE_SPORT" || wType === "ELITE-SPORT"));
        })
      )
    : brandFiltered;
  
  // Case Size filter (normalize en-dash – and hyphen - so "37–40mm" matches "37-40mm")
  const norm = (s: string) => (s || "").replace(/\u2013/g, "-").trim();
  const sizeFiltered = selectedSizes.length > 0
    ? typeFiltered.filter((watch) =>
        selectedSizes.some((sel) => norm(sel) === norm(watch.caseSize || ""))
      )
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
                        placeholder={t("watch.searchPlaceholder")}
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
                    <span className="sort-label">{t("watch.sortBy")}</span>
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
                      <MenuItem value="newest">{t("watch.newest")}</MenuItem>
                      <MenuItem value="price-asc">{t("watch.priceLowToHigh")}</MenuItem>
                      <MenuItem value="price-desc">{t("watch.priceHighToLow")}</MenuItem>
                      <MenuItem value="limited-editions">{t("watch.limitedEditions")}</MenuItem>
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
                        ? `${t("watch.noResultsFor")} "${searchText}"`
                        : t("watch.watchNotFound")
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
