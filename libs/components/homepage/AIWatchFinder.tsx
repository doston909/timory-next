import { Stack, Box, Typography, Select, MenuItem, Button } from "@mui/material";
import { useState } from "react";
import { useTranslation } from "@/libs/context/useTranslation";

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
  const { t } = useTranslation();
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
    // Require all select fields before calling AI
    if (!form.gender || !form.style || !form.budget || !form.color) {
      setError("Please select gender, style, budget, and color before searching for a watch.");
      return;
    }

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
      setError(t("home.aiError"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Stack className="ai-watch-finder-section">
      <Typography className="ai-watch-finder-title">{t("home.aiWatchFinder")}</Typography>
      <Typography className="ai-watch-finder-subtitle">
        {t("home.aiWatchFinderSubtitle")}
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
              renderValue={(v) => v ? t(`home.${v}`) : t("home.gender")}
            >
              <MenuItem value="men">{t("home.men")}</MenuItem>
              <MenuItem value="women">{t("home.women")}</MenuItem>
              <MenuItem value="unisex">{t("home.unisex")}</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.style}
              onChange={(e) => handleChange("style", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v ? t(`home.${v}`) : t("home.style")}
            >
              <MenuItem value="classic">{t("home.classic")}</MenuItem>
              <MenuItem value="sport">{t("home.sport")}</MenuItem>
              <MenuItem value="luxury">{t("home.luxury")}</MenuItem>
              <MenuItem value="minimal">{t("home.minimal")}</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.budget}
              onChange={(e) => handleChange("budget", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => (v ? (v === "under-5k" ? t("home.under5k") : v === "5k-10k" ? t("home.budget5k10k") : t("home.budget10kPlus")) : t("home.budget"))}
            >
              <MenuItem value="under-5k">{t("home.under5k")}</MenuItem>
              <MenuItem value="5k-10k">{t("home.budget5k10k")}</MenuItem>
              <MenuItem value="10k-plus">{t("home.budget10kPlus")}</MenuItem>
            </Select>
            <Select
              displayEmpty
              value={form.color}
              onChange={(e) => handleChange("color", e.target.value)}
              className="ai-watch-finder-select"
              renderValue={(v) => v ? t(`home.${v === "two-tone" ? "twoTone" : v}`) : t("home.color")}
            >
              <MenuItem value="silver">{t("home.silver")}</MenuItem>
              <MenuItem value="gold">{t("home.gold")}</MenuItem>
              <MenuItem value="black">{t("home.black")}</MenuItem>
              <MenuItem value="two-tone">{t("home.twoTone")}</MenuItem>
            </Select>
            <Box className="ai-watch-finder-thought-wrap">
              <textarea
                className="ai-watch-finder-thought"
                placeholder={t("home.thoughtsPlaceholder")}
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
            {loading ? t("home.loading") : t("home.findMyWatch")}
          </Button>
          {error && (
            <Typography className="ai-watch-finder-error" sx={{ mt: 1 }}>
              {error}
            </Typography>
          )}
        </Box>

        {results.length > 0 && (
          <>
            <Box className="ai-watch-finder-results-header">
              <Button
                className="ai-watch-finder-reset-btn"
                onClick={() => {
                  setResults([]);
                  setError(null);
                  setForm({
                    gender: "",
                    style: "",
                    budget: "",
                    color: "",
                    thought: "",
                  });
                }}
                disabled={loading}
              >
                Reset results
              </Button>
            </Box>
            <Box className="ai-watch-finder-results">
              {results.map((watch, i) => (
                <Box key={i} className="ai-watch-finder-card">
                  <Typography className="ai-watch-finder-card-brand">{watch.brand}</Typography>
                  <Typography className="ai-watch-finder-card-model">{watch.model}</Typography>
                  <Typography className="ai-watch-finder-card-price">{watch.price}</Typography>
                  <Typography className="ai-watch-finder-card-desc">
                    {watch.description}
                  </Typography>
                </Box>
              ))}
            </Box>
          </>
        )}
      </Stack>
    </Stack>
  );
};

export default AIWatchFinder;
