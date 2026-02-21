import React from "react";
import { useRouter } from "next/router";
import { Stack, Box } from "@mui/material";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PopularWatchesCard, { PopularWatch } from "./PopularWatchesCard";
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";

const PopularWatches = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const { data } = useQuery(GET_WATCHES, {
    variables: {
      input: {
        page: 1,
        limit: 20,
        sort: "createdAt",
        direction: "DESC",
        search: {},
      },
    },
  });
  const list = data?.getWatches?.list ?? [];
  const mapped = list.map((w: any) => ({
    id: w._id,
    brand: w.watchBrand ?? "",
    model: w.watchModelName ?? "",
    image: watchImageUrl(w.watchImages?.[0]),
    price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : undefined,
    likes: w.watchLikes ?? 0,
    views: w.watchViews ?? 0,
    comments: w.watchComments ?? 0,
  }));
  const byPopularity = [...mapped].sort(
    (a, b) => b.likes + b.views - (a.likes + a.views)
  );
  const hasAnyPopular =
    byPopularity.length > 0 && (byPopularity[0].likes > 0 || byPopularity[0].views > 0);
  const popularWatches: PopularWatch[] = hasAnyPopular
    ? byPopularity.slice(0, 4)
    : mapped.slice(0, 4);

  const handleSeeAllClick = () => {
    saveHomepageSectionBeforeNav("popular-watches");
    router.push("/watch");
  };

  return (
    <Stack className="popular-watches-section">
      <h2 className="section-title">{t("home.ourMostPopularModels")}</h2>

      <Box className="popular-watches-grid">
        {popularWatches.length === 0 ? (
          <p className="empty-text">{t("home.popularWatchesNotFound")}</p>
        ) : (
          popularWatches.map((watch) => (
            <PopularWatchesCard key={String(watch.id)} watch={watch} homepageSectionId="popular-watches" />
          ))
        )}
      </Box>

      <Box className="dealers-see-all-wrapper" onClick={handleSeeAllClick} sx={{ cursor: "pointer" }}>
        <Box className="see-all-text">
          {t("home.seeAll")} <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default PopularWatches;

