import React, { useState } from "react";
import {
  Stack,
  Typography,
  Checkbox,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Box,
} from "@mui/material";
import RefreshIcon from "@mui/icons-material/Refresh";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { useTranslation } from "@/libs/context/useTranslation";

// PRICE LIST
const priceRanges = [
  0, 100, 250, 500, 1000, 2500, 5000,
  10000, 25000, 50000, 100000, 250000, 1000000, 2000000, 10000000
];

// WATCH TYPE
const watchTypes = ["Men", "Women", "Unisex", "Sport"];

// CASE SIZE
const caseSizes = ["28–32mm", "33–36mm", "37–40mm", "41–44mm", "45mm+"];

// DIAL COLORS
const dialColors = [
  "Black",
  "White",
  "Blue",
  "Green",
  "Silver",
  "Gold",
  "Brown",
  "Skeleton",
];

// MATERIALS
const materials = [
  "Stainless Steel",
  "Gold",
  "Rose Gold",
  "Titanium",
  "Ceramic",
  "Carbon",
  "Leather",
  "Rubber",
];

// BRANDS
const brands = [
  "Rolex",
  "Omega",
  "Patek Philippe",
  "Audemars Piguet",
  "Tag Heuer",
  "Breitling",
  "Cartier",
  "IWC",
  "Panerai",
  "Hublot",
  "Tudor",
  "Seiko",
];

interface FilterProps {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
  selectedTypes: string[];
  setSelectedTypes: (types: string[]) => void;
  selectedSizes: string[];
  setSelectedSizes: (sizes: string[]) => void;
  selectedDialColors: string[];
  setSelectedDialColors: (colors: string[]) => void;
  selectedMaterials: string[];
  setSelectedMaterials: (materials: string[]) => void;
  watchPrice: { start: number; end: number };
  setWatchPrice: (price: { start: number; end: number }) => void;
}

const Filter = ({ 
  selectedBrands, 
  setSelectedBrands, 
  selectedTypes, 
  setSelectedTypes,
  selectedSizes,
  setSelectedSizes,
  selectedDialColors,
  setSelectedDialColors,
  selectedMaterials,
  setSelectedMaterials,
  watchPrice,
  setWatchPrice
}: FilterProps) => {
  const { t } = useTranslation();
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);
  const [openSections, setOpenSections] = useState<Set<string>>(new Set());

  const toggleItem = (list: string[], setter: any, value: string) => {
    setter(
      list.includes(value)
        ? list.filter((i) => i !== value)
        : [...list, value]
    );
  };

  const closeSection = (sectionKey: string) => {
    setOpenSections((prev) => {
      const newSet = new Set(prev);
      newSet.delete(sectionKey);
      return newSet;
    });
  };

  const isSectionOpen = (sectionKey: string, selectedItems: string[]) => {
    // If any checkbox is checked, keep it open
    if (selectedItems.length > 0) return true;
    // If manually opened (clicked), keep it open
    if (openSections.has(sectionKey)) return true;
    return false;
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedDialColors([]);
    setSelectedMaterials([]);
    setSelectedBrands([]);
    setWatchPrice({
      start: 0,
      end: priceRanges[priceRanges.length - 1], // Doim oxirgi narx
    });
    setOpenSections(new Set());
  };

  return (
    <Stack className="filter-main">
      {/* Find Your Watch */}
      <Stack 
        className="find-your-watch" 
        mb="30px"
        direction="row"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography className="title" sx={{ display: "flex", alignItems: "center" }}>{t("filter.findYourWatch")}</Typography>
        <IconButton
          onClick={handleReset}
          sx={{
            padding: "8px",
            paddingBottom:"20px",
            color: "#000000ff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: "50%",
            "&:hover": {
              color: "#f9a63bff",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
              borderRadius: "50%",
            },
          }}
        >
          <RefreshIcon sx={{ fontSize: "30px" }} />
        </IconButton>
      </Stack>

      {/* BRAND */}
      <Stack 
        className={`filter-section ${isSectionOpen("brand", selectedBrands) ? "open" : ""}`}
        mb="30px"
        onClick={() => {
          // Toggle section open/close
          setOpenSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has("brand")) {
              // If open and no items selected, close it
              if (selectedBrands.length === 0) {
                newSet.delete("brand");
              }
            } else {
              // If closed, open it
              newSet.add("brand");
            }
            return newSet;
          });
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography className="title">{t("filter.brand")}</Typography>
          {isSectionOpen("brand", selectedBrands) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowUpIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowDownIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          )}
        </Stack>
        {isSectionOpen("brand", selectedBrands) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedBrands.length === 0) {
                closeSection("brand");
              }
            }}
          >
            {brands.map((brand) => (
              <Stack 
                key={brand} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedBrands.includes(brand)}
                  onChange={() =>
                    toggleItem(selectedBrands, setSelectedBrands, brand)
                  }
                  size="small"
                />
                <Typography className="label">{brand}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* WATCH TYPE */}
      <Stack 
        className={`filter-section ${isSectionOpen("watchType", selectedTypes) ? "open" : ""}`}
        mb="30px"
        onClick={() => {
          // Toggle section open/close
          setOpenSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has("watchType")) {
              // If open and no items selected, close it
              if (selectedTypes.length === 0) {
                newSet.delete("watchType");
              }
            } else {
              // If closed, open it
              newSet.add("watchType");
            }
            return newSet;
          });
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography className="title">{t("filter.watchType")}</Typography>
          {isSectionOpen("watchType", selectedTypes) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' , marginBottom: '10px'}}>
              <KeyboardArrowUpIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%' , marginBottom: '10px'}}>
              <KeyboardArrowDownIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          )}
        </Stack>
        {isSectionOpen("watchType", selectedTypes) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedTypes.length === 0) {
                closeSection("watchType");
              }
            }}
          >
            {watchTypes.map((type) => (
              <Stack 
                key={type} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedTypes.includes(type)}
                  onChange={() => toggleItem(selectedTypes, setSelectedTypes, type)}
                  size="small"
                />
                <Typography className="label">{type}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* CASE SIZE */}
      <Stack 
        className={`filter-section ${isSectionOpen("caseSize", selectedSizes) ? "open" : ""}`}
        mb="30px"
        onClick={() => {
          // Toggle section open/close
          setOpenSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has("caseSize")) {
              // If open and no items selected, close it
              if (selectedSizes.length === 0) {
                newSet.delete("caseSize");
              }
            } else {
              // If closed, open it
              newSet.add("caseSize");
            }
            return newSet;
          });
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography className="title">{t("filter.caseSize")}</Typography>
          {isSectionOpen("caseSize", selectedSizes) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowUpIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px'}}>
              <KeyboardArrowDownIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          )}
        </Stack>
        {isSectionOpen("caseSize", selectedSizes) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedSizes.length === 0) {
                closeSection("caseSize");
              }
            }}
          >
            {caseSizes.map((size) => (
              <Stack 
                key={size} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedSizes.includes(size)}
                  onChange={() => toggleItem(selectedSizes, setSelectedSizes, size)}
                  size="small"
                />
                <Typography className="label">{size}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* DIAL COLOR */}
      <Stack 
        className={`filter-section ${isSectionOpen("dialColor", selectedDialColors) ? "open" : ""}`}
        mb="30px"
        onClick={() => {
          // Toggle section open/close
          setOpenSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has("dialColor")) {
              // If open and no items selected, close it
              if (selectedDialColors.length === 0) {
                newSet.delete("dialColor");
              }
            } else {
              // If closed, open it
              newSet.add("dialColor");
            }
            return newSet;
          });
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography className="title">{t("filter.dialColor")}</Typography>
          {isSectionOpen("dialColor", selectedDialColors) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowUpIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowDownIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          )}
        </Stack>
        {isSectionOpen("dialColor", selectedDialColors) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedDialColors.length === 0) {
                closeSection("dialColor");
              }
            }}
          >
            {dialColors.map((color) => (
              <Stack 
                key={color} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedDialColors.includes(color)}
                  onChange={() =>
                    toggleItem(selectedDialColors, setSelectedDialColors, color)
                  }
                  size="small"
                />
                <Typography className="label">{color}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* MATERIAL */}
      <Stack 
        className={`filter-section ${isSectionOpen("material", selectedMaterials) ? "open" : ""}`}
        mb="30px"
        onClick={() => {
          // Toggle section open/close
          setOpenSections((prev) => {
            const newSet = new Set(prev);
            if (newSet.has("material")) {
              // If open and no items selected, close it
              if (selectedMaterials.length === 0) {
                newSet.delete("material");
              }
            } else {
              // If closed, open it
              newSet.add("material");
            }
            return newSet;
          });
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ width: '100%' }}>
          <Typography className="title">{t("filter.material")}</Typography>
          {isSectionOpen("material", selectedMaterials) ? (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowUpIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', height: '100%', marginBottom: '10px' }}>
              <KeyboardArrowDownIcon 
                sx={{ 
                  fontSize: '35px', 
                  color: '#333333',
                  cursor: 'pointer',
                  transition: 'color 0.2s ease',
                  '&:hover': {
                    color: '#f9a63bff',
                  }
                }} 
              />
            </Box>
          )}
        </Stack>
        {isSectionOpen("material", selectedMaterials) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedMaterials.length === 0) {
                closeSection("material");
              }
            }}
          >
            {materials.map((mat) => (
              <Stack 
                key={mat} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedMaterials.includes(mat)}
                  onChange={() =>
                    toggleItem(selectedMaterials, setSelectedMaterials, mat)
                  }
                  size="small"
                />
                <Typography className="label">{mat}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* PRICE RANGE */}
      <Stack className="filter-section" mb="30px">
        <Typography className="title">{t("filter.priceRange")}</Typography>

        <Stack className="price-row">
          <FormControl>
            <InputLabel>{t("filter.min")}</InputLabel>
            <Select
              value={watchPrice.start}
              onChange={(e) =>
                setWatchPrice({ ...watchPrice, start: Number(e.target.value) })
              }
              sx={{
                '& .MuiSelect-select': {
                  fontSize: '18px !important',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                },
                '& .MuiInputBase-input': {
                  marginTop: '10px',
                  fontSize: '19px !important',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                },
              }}
            >
              {priceRanges.map((p) => (
                <MenuItem key={p} value={p}>
                  ${p.toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <div className="central-divider"></div>

          <FormControl>
            <InputLabel>{t("filter.max")}</InputLabel>
            <Select
              value={watchPrice.end}
              onChange={(e) =>
                setWatchPrice({ ...watchPrice, end: Number(e.target.value) })
              }
              sx={{
                '& .MuiSelect-select': {
                  fontSize: '18px !important',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                },
                '& .MuiInputBase-input': {
                  marginTop: '10px',
                  fontSize: '19px !important',
                  fontFamily: "'Poppins', sans-serif",
                  fontWeight: 500,
                },
              }}
            >
              {priceRanges.map((p) => (
                <MenuItem key={p} value={p}>
                  ${p.toLocaleString()}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Filter;


