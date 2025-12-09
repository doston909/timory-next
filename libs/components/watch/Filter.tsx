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

// PRICE LIST
const priceRanges = [
  0, 100, 250, 500, 1000, 2500, 5000,
  10000, 25000, 50000, 100000, 250000,
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

// CATEGORIES
const categories = [
  "Popular",
  "New Arrivals",
  "Limited Edition",
  "Bestsellers",
  "Luxury",
  "Budget",
];

const Filter = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSizes, setSelectedSizes] = useState<string[]>([]);
  const [selectedDialColors, setSelectedDialColors] = useState<string[]>([]);
  const [selectedMaterials, setSelectedMaterials] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const [watchPrice, setWatchPrice] = useState({
    start: 0,
    end: 250000,
  });

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
    // If hovering, keep it open
    if (hoveredSection === sectionKey) return true;
    return false;
  };

  const handleReset = () => {
    setSelectedTypes([]);
    setSelectedSizes([]);
    setSelectedDialColors([]);
    setSelectedMaterials([]);
    setSelectedCategories([]);
    setWatchPrice({
      start: 0,
      end: 250000,
    });
    setHoveredSection(null);
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
        <Typography className="title" sx={{ display: "flex", alignItems: "center" }}>Find Your Watch</Typography>
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
          <RefreshIcon sx={{ fontSize: "25px" }} />
        </IconButton>
      </Stack>

      {/* WATCH TYPE */}
      <Stack 
        className="filter-section" 
        mb="30px"
        onMouseEnter={() => setHoveredSection("watchType")}
        onMouseLeave={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedTypes.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("watchType");
                return newSet;
              });
            }, 200);
          }
        }}
        onClick={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedTypes.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("watchType");
                return newSet;
              });
            }, 200);
          }
        }}
      >
        <Typography 
          className="title"
          onClick={() => closeSection("watchType")}
        >
          Watch Type
        </Typography>
        {isSectionOpen("watchType", selectedTypes) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              setHoveredSection(null);
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
        className="filter-section" 
        mb="30px"
        onMouseEnter={() => setHoveredSection("caseSize")}
        onMouseLeave={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedSizes.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("caseSize");
                return newSet;
              });
            }, 200);
          }
        }}
        onClick={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedSizes.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("caseSize");
                return newSet;
              });
            }, 200);
          }
        }}
      >
        <Typography className="title">Case Size</Typography>
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
        className="filter-section" 
        mb="30px"
        onMouseEnter={() => setHoveredSection("dialColor")}
        onMouseLeave={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedDialColors.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("dialColor");
                return newSet;
              });
            }, 200);
          }
        }}
        onClick={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedDialColors.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("dialColor");
                return newSet;
              });
            }, 200);
          }
        }}
      >
        <Typography className="title">Dial Color</Typography>
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
        className="filter-section" 
        mb="30px"
        onMouseEnter={() => setHoveredSection("material")}
        onMouseLeave={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedMaterials.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("material");
                return newSet;
              });
            }, 200);
          }
        }}
        onClick={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedMaterials.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("material");
                return newSet;
              });
            }, 200);
          }
        }}
      >
        <Typography className="title">Material</Typography>
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

      {/* CATEGORY */}
      <Stack 
        className="filter-section" 
        mb="30px"
        onMouseEnter={() => setHoveredSection("category")}
        onMouseLeave={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedCategories.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("category");
                return newSet;
              });
            }, 200);
          }
        }}
        onClick={() => {
          setHoveredSection(null);
          // Close if no checkboxes are selected
          if (selectedCategories.length === 0) {
            setTimeout(() => {
              setOpenSections((prev) => {
                const newSet = new Set(prev);
                newSet.delete("category");
                return newSet;
              });
            }, 200);
          }
        }}
      >
        <Typography className="title">Category</Typography>
        {isSectionOpen("category", selectedCategories) && (
          <Stack 
            className="filter-list"
            onClick={() => {
              if (selectedCategories.length === 0) {
                closeSection("category");
              }
            }}
          >
            {categories.map((cat) => (
              <Stack 
                key={cat} 
                className="input-box"
                onClick={(e) => e.stopPropagation()}
              >
                <Checkbox
                  checked={selectedCategories.includes(cat)}
                  onChange={() =>
                    toggleItem(selectedCategories, setSelectedCategories, cat)
                  }
                  size="small"
                />
                <Typography className="label">{cat}</Typography>
              </Stack>
            ))}
          </Stack>
        )}
      </Stack>

      {/* PRICE RANGE */}
      <Stack className="filter-section" mb="30px">
        <Typography className="title">Price Range</Typography>

        <Stack className="price-row">
          <FormControl>
            <InputLabel>Min</InputLabel>
            <Select
              value={watchPrice.start}
              onChange={(e) =>
                setWatchPrice({ ...watchPrice, start: Number(e.target.value) })
              }
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
            <InputLabel>Max</InputLabel>
            <Select
              value={watchPrice.end}
              onChange={(e) =>
                setWatchPrice({ ...watchPrice, end: Number(e.target.value) })
              }
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


