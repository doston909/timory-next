import { Stack, Box, Typography, Select, MenuItem, Button } from "@mui/material";
import { useState } from "react";

export type AIWatchResult = {
  model: string;
  brand: string;
  price: string;
  image: string;
  reason: string;
  description: string;
};

const DEFAULT_IMAGE = "/img/watch/rasm1.png";
const BRAND_IMAGES: Record<string, string> = {
  rolex: "/img/watch/rasm1.png",
  omega: "/img/brand/watch2.png",
  "audemars piguet": "/img/brand/watch3.png",
  cartier: "/img/watch/rasm3.png",
  patek: "/img/watch/rasmm.png",
};

function getImageForWatch(brand: string, _model: string): string {
  const key = brand.toLowerCase().trim();
  return BRAND_IMAGES[key] || DEFAULT_IMAGE;
}

const AIWatchFinder = () => {
  const [form, setForm] = useState({
    gender: "",
    style: "",
    budget: "",
    color: "",
    thought: "",
  });
  const [results, setResults] = useState<AIWatchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setError(null);
  };

  const handleFind = async () => {
    setLoading(true);
    setError(null);
    setResults([]);
    try {
      const res = await fetch("/api/ai-watch-recommend", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json().catch(() => ({}));
      const watches = data.watches || [];
      const errMsg = data.error || null;
      if (errMsg) setError(errMsg);
      const mapped: AIWatchResult[] = watches.map((w: { brand: string; model: string; price: string; reason: string; description: string }) => ({
        brand: w.brand,
        model: w.model,
        price: w.price,
        image: getImageForWatch(w.brand, w.model),
        reason: w.reason,
        description: w.description,
      }));
      setResults(mapped);
    } catch {
      setError("Tavsiyalar yuklanmadi. Keyinroq urinib ko‘ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className="ai-watch-finder-section">
      <Typography className="ai-watch-finder-title">AI Watch Finder</Typography>
      <Typography className="ai-watch-finder-subtitle">
        Tell us your style — our AI will pick the perfect watch for you.
      </Typography>

      <Stack className="ai-watch-finder-row" direction="row" flexWrap="wrap">
        <Box className="ai-watch-finder-left-box">
          <video
            className="ai-watch-finder-video"
            src="/video/ai.mp4"
            autoPlay
            muted
            loop
            playsInline
          />
        </Box>
        <Box className="ai-watch-finder-form-wrap">
          <Stack className="ai-watch-finder-form">
            <Select
              displayEmpty
              value={form.gender}
              onChange={(e) => handleChange("gender", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v || "Gender"}
            >
              <MenuItem value="men">Men</MenuItem>
              <MenuItem value="women">Women</MenuItem>
              <MenuItem value="unisex">Unisex</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.style}
              onChange={(e) => handleChange("style", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v || "Style"}
            >
              <MenuItem value="classic">Classic</MenuItem>
              <MenuItem value="sport">Sport</MenuItem>
              <MenuItem value="luxury">Luxury</MenuItem>
              <MenuItem value="minimal">Minimal</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v || "Budget"}
            >
              <MenuItem value="under-5k">Under $5,000</MenuItem>
              <MenuItem value="5k-10k">$5,000 – $10,000</MenuItem>
              <MenuItem value="10k-plus">$10,000+</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v || "Color"}
            >
              <MenuItem value="silver">Silver</MenuItem>
              <MenuItem value="gold">Gold</MenuItem>
              <MenuItem value="black">Black</MenuItem>
              <MenuItem value="two-tone">Two-tone</MenuItem>
            </Select>
            <Box className="ai-watch-finder-thought-wrap">
              <textarea
                className="ai-watch-finder-thought"
                placeholder="Write your thoughts — what kind of watch are you looking for?"
                value={form.thought}
                onChange={(e) => handleChange("thought", e.target.value)}
                rows={5}
                aria-label="Your thoughts about the watch you want"
              />
            </Box>
          </Stack>
          <Button
            className="ai-watch-finder-btn"
            onClick={handleFind}
            disabled={loading}
          >
            {loading ? "Loading…" : "Find my watch"}
          </Button>
          {error && (
            <Typography className="ai-watch-finder-error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>

        {results.length > 0 && (
          <Box className="ai-watch-finder-results">
            {results.map((watch, i) => (
              <Box key={i} className="ai-watch-finder-card">
                <Box className="ai-watch-finder-card-image">
                  <img src={watch.image} alt={watch.model} />
                </Box>
                <Typography className="ai-watch-finder-card-brand">{watch.brand}</Typography>
                <Typography className="ai-watch-finder-card-model">{watch.model}</Typography>
                <Typography className="ai-watch-finder-card-price">{watch.price}</Typography>
                <Typography className="ai-watch-finder-card-reason">{watch.reason}</Typography>
              </Box>
            ))}
          </Box>
        )}
      </Stack>
    </Stack>
  );
};

export default AIWatchFinder;
