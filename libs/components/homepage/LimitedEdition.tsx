import { Stack, Box } from "@mui/material";
import { useRouter } from "next/router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { useTranslation } from "@/libs/context/useTranslation";

type SpotlightWatch = {
  id: number;
  title: string;
  model: string;
  image: string;
  rarity: string;
  price: string;
  hoverImage: string;
};

const spotlightWatches: SpotlightWatch[] = [
  {
    id: 1,
    title: "Audemars Piguet",
    model: "Royal Oak Frosted Gold",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Ultra-Rare",
    price: "$128,000",
  },
  {
    id: 2,
    title: "Patek Philippe",
    model: "Grand Complications 5204",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Collector Grade",
    price: "$245,000",
  },
  {
    id: 3,
    title: "Rolex",
    model: "Daytona Meteorite Dial",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Discontinued",
    price: "$78,000",
  },
  {
    id: 4,
    title: "Richard Mille",
    model: "RM 65-01",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Boutique-Only",
    price: "$310,000",
  },
  {
    id: 5,
    title: "Richard Mille",
    model: "RM 65-01",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Boutique-Only",
    price: "$310,000",
  },
  {
    id: 6,
    title: "Rolex",
    model: "Daytona Meteorite Dial",
    image: "/img/watch/rasm1.png",
    hoverImage: "/img/watch/rasm3.png",
    rarity: "Discontinued",
    price: "$78,000",
  },
];

const LimitedEdition = () => {
  const router = useRouter();
  const { t } = useTranslation();
  return (
    <Stack className="limited-spotlight-section">
      <h2 className="section-title">Limited Editions Spotlight</h2>

      {spotlightWatches.length === 0 ? (
        <p className="empty-label">{t("home.noLimitedEditions")}</p>
      ) : (
        <Stack
          className="spotlight-grid"
          onClick={(e) => {
            const card = (e.target as HTMLElement).closest(".spotlight-card");
            if (card) {
              const watchId = (card as HTMLElement).getAttribute("data-watch-id");
              if (watchId) {
                saveHomepageSectionBeforeNav("limited-edition");
                router.push(`/watch/detail?id=${watchId}`);
              }
            }
          }}
        >
          {spotlightWatches.map((w) => (
            <Stack key={w.id} className="spotlight-card" data-watch-id={w.id} sx={{ cursor: "pointer" }}>
              <Box className="image-box">
                <img className="main-img" src={w.image} alt={w.model} />
                <img className="hover-img" src={w.hoverImage} alt={w.model} />
              </Box>

              <Stack className="info">
                <p className="model">{w.model}</p>
                <span className="price">{w.title}</span>
              </Stack>
            </Stack>
          ))}
        </Stack>
      )}

      <Box className="dealers-see-all-wrapper">
        <Box
          className="see-all-text"
          onClick={() => {
              saveHomepageSectionBeforeNav("limited-edition");
              router.push("/watch?sort=limited-editions");
            }}
        >
          {t("home.seeAll")} <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default LimitedEdition;



