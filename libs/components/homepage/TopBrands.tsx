import { Stack } from "@mui/material";
import { useState } from "react";
import TopBrandsCard, { TopBrand } from "./TopBrandsCard";
import { useTranslation } from "@/libs/context/useTranslation";

const topBrands: TopBrand[] = [
  {
    id: 1,
    name: "Rolex",
    country: "Switzerland",
    logo: "/img/brand/logor.png",
    founded: "1905",
  },
  {
    id: 2,
    name: "Patek Philippe",
    country: "Switzerland",
    logo: "/img/brand/logo1.png",
    founded: "1839",
  },
  {
    id: 3,
    name: "Audemars Piguet",
    country: "Switzerland",
    logo: "/img/brand/logo2.png",
    founded: "1875",
  },
  {
    id: 4,
    name: "Richard Mille",
    country: "Switzerland",
    logo: "/img/brand/logo3.png",
    founded: "2001",
  },
  {
    id: 5,
    name: "Omega",
    country: "Switzerland",
    logo: "/img/brand/logo4.png",
    founded: "1848",
  },
  {
    id: 6,
    name: "Cartier",
    country: "France",
    logo: "/img/brand/logor.png",
    founded: "1847",
  },
  {
    id: 7,
    name: "Breitling",
    country: "Switzerland",
    logo: "/img/brand/logo1.png",
    founded: "1884",
  },
  {
    id: 8,
    name: "Tag Heuer",
    country: "Switzerland",
    logo: "/img/brand/logo2.png",
    founded: "1860",
  },
  {
    id: 9,
    name: "IWC",
    country: "Switzerland",
    logo: "/img/brand/logo3.png",
    founded: "1868",
  },
  {
    id: 10,
    name: "Jaeger-LeCoultre",
    country: "Switzerland",
    logo: "/img/brand/logo4.png",
    founded: "1833",
  },
  {
    id: 11,
    name: "Vacheron Constantin",
    country: "Switzerland",
    logo: "/img/brand/logor.png",
    founded: "1755",
  },
  {
    id: 12,
    name: "Blancpain",
    country: "Switzerland",
    logo: "/img/brand/logo1.png",
    founded: "1735",
  },
];

const TopBrands = () => {
  const [isPaused, setIsPaused] = useState(false);
  const { t } = useTranslation();

  // Duplicate brands 2 times for seamless infinite scroll
  const duplicatedBrands = [...topBrands, ...topBrands];

  return (
    <Stack className="top-brands-section">
      {topBrands.length === 0 ? (
        <p className="empty-text">{t("home.noBrandsAvailable")}</p>
      ) : (
        <div
          className="top-brands-wrapper"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            className={`top-brands-scroll ${isPaused ? "paused" : ""}`}
          >
            {duplicatedBrands.map((brand, index) => (
              <TopBrandsCard
                key={`brand-${brand.id}-${index}`}
                brand={brand}
              />
            ))}
          </div>
        </div>
      )}
    </Stack>
  );
};

export default TopBrands;


