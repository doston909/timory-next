import { Stack } from "@mui/material";
import TopBrandsCard, { TopBrand } from "./TopBrandsCard";

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
    logo: "/img/brand/logo4.png",
    founded: "1839",
  },
  {
    id: 3,
    name: "Audemars Piguet",
    country: "Switzerland",
    logo: "/img/brand/logo3.png",
    founded: "1875",
  },
  {
    id: 4,
    name: "Richard Mille",
    country: "Switzerland",
    logo: "/img/brand/logo2.png",
    founded: "2001",
  },
   {
    id: 2,
    name: "Patek Philippe",
    country: "Switzerland",
    logo: "/img/brand/logo4.png",
    founded: "1839",
  },
];

const TopBrands = () => {
  return (
    <Stack className="top-brands-section">
      <h2 className="section-title">Top Luxury Brands</h2>

      {topBrands.length === 0 ? (
        <p className="empty-text">No Brands Available</p>
      ) : (
        <Stack className="top-brands-wrapper">   {/* katta box */}
          <Stack className="top-brands-grid">
            {topBrands.map((brand) => (
              <TopBrandsCard key={brand.id} brand={brand} />
            ))}
          </Stack>
        </Stack>
      )}
    </Stack>
  );
};

export default TopBrands;


