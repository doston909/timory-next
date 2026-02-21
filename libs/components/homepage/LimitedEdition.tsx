import { Stack, Box } from "@mui/material";
import { useRouter } from "next/router";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";

type SpotlightWatch = {
  id: string | number;
  title: string;
  model: string;
  image: string;
  rarity: string;
  price: string;
  hoverImage: string;
};

const LimitedEdition = () => {
  const router = useRouter();
  const { t } = useTranslation();
  // Faqat limited edition true, eng oxirgi yaratilgan 6 ta soat
  const { data } = useQuery(GET_WATCHES, {
    variables: {
      input: {
        page: 1,
        limit: 6,
        sort: "createdAt",
        direction: "DESC",
        search: { watchLimitedEdition: true },
      },
    },
  });
  const list = data?.getWatches?.list ?? [];
  const spotlightWatches: SpotlightWatch[] = list.map((w: any) => ({
    id: w._id,
    title: w.watchBrand ?? "",
    model: w.watchModelName ?? "",
    image: watchImageUrl(w.watchImages?.[0]),
    hoverImage: watchImageUrl(w.watchImages?.[1] ?? w.watchImages?.[0]),
    rarity: "Limited Edition",
    price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "",
  }));

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
            <Stack key={String(w.id)} className="spotlight-card" data-watch-id={String(w.id)} sx={{ cursor: "pointer" }}>
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



