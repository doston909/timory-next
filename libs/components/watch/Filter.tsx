import React, { useState } from "react";
import {
  Stack,
  Typography,
  Checkbox,
  Button,
  OutlinedInput,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tooltip,
  IconButton,
  InputAdornment,
} from "@mui/material";

const priceRanges = [
  0, 100, 250, 500, 1000, 2500, 5000, 10000, 25000, 50000, 100000, 250000,
];

const watchTypes = ["Men", "Women", "Unisex", "Sport"];

const Filter = () => {
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [watchPrice, setWatchPrice] = useState({ start: 0, end: 250000 });

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  return (
    <Stack className="filter-main">

      {/* WATCH TYPE SECTION */}
      <Stack className="find-your-watch" mb="30px">
        <Typography className="title">Watch Type</Typography>

        <Stack className="watch-location">
          {watchTypes.map((type) => (
            <Stack className="input-box" key={type}>
              <Checkbox
                id={type}
                className="watch-checkbox"
                size="small"
                checked={selectedTypes.includes(type)}
                onChange={() => toggleType(type)}
              />

              <label htmlFor={type} style={{ cursor: "pointer" }}>
                <Typography className="watch-type">{type}</Typography>
              </label>
            </Stack>
          ))}
        </Stack>
      </Stack>

      {/* PRICE RANGE */}
      <Stack className="find-your-watch" mb="30px">
        <Typography className="title">Price Range</Typography>

        <Stack className="square-price-input">

          {/* MIN PRICE */}
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

          {/* MAX PRICE */}
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


