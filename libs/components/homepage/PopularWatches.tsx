import React, { useRef } from "react";
import { useRouter } from "next/router";
import { Stack, Box } from "@mui/material";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PopularWatchesCard, { PopularWatch } from "./PopularWatchesCard";
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery, useMutation } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import type { ApolloCache } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { LIKE_TARGET_WATCH } from "@/apollo/user/mutation";
import { watchImageUrl } from "@/libs/utils";

const POPULAR_WATCHES_VARS = {
  input: {
    page: 1,
    limit: 20,
    sort: "createdAt",
    direction: "DESC" as const,
    search: {},
  },
};

const BEST_SELLER_VARS = {
  input: {
    page: 1,
    limit: 24,
    sort: "createdAt",
    direction: "ASC" as const,
    search: {},
  },
};

function updateWatchesCacheAfterLike(
  cache: ApolloCache<unknown>,
  watchId: string,
  newLikes: number,
  wasLiked: boolean
) {
  [POPULAR_WATCHES_VARS, BEST_SELLER_VARS].forEach((vars) => {
    try {
      const existing = cache.readQuery({ query: GET_WATCHES, variables: vars }) as {
        getWatches?: { list?: Array<{ _id: string; watchLikes?: number; meLiked?: unknown[] } & Record<string, unknown>> };
      } | null;
      if (!existing?.getWatches?.list) return;
      const newList = existing.getWatches.list.map((w: { _id: string; watchLikes?: number; meLiked?: unknown[] } & Record<string, unknown>) => {
        if (w._id !== watchId) return w;
        return {
          ...w,
          watchLikes: newLikes,
          meLiked: wasLiked ? [{ memberId: "", likeRefId: watchId, myFavorite: true }] : [],
        };
      });
      cache.writeQuery({
        query: GET_WATCHES,
        variables: vars,
        data: { getWatches: { ...existing.getWatches, list: newList } },
      });
    } catch (_) {}
  });
}

const PopularWatches = () => {
  const router = useRouter();
  const { t } = useTranslation();
  const user = useReactiveVar(userVar);
  const { data } = useQuery(GET_WATCHES, { variables: POPULAR_WATCHES_VARS });
  const [likeTargetWatchMutation] = useMutation(LIKE_TARGET_WATCH, {
    update(cache, { data }) {
      const updated = data?.likeTargetWatch;
      if (!updated?._id) return;
      const newLikes = updated.watchLikes ?? 0;
      let wasLiked = true;
      try {
        const q = cache.readQuery({ query: GET_WATCHES, variables: POPULAR_WATCHES_VARS }) as any;
        const prev = q?.getWatches?.list?.find((w: any) => w._id === updated._id);
        wasLiked = prev == null ? true : newLikes > (prev.watchLikes ?? 0);
      } catch (_) {}
      updateWatchesCacheAfterLike(cache, updated._id, newLikes, wasLiked);
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
    meLiked: w.meLiked ?? undefined,
  }));

  const listKey = list.map((w: any) => w._id).sort().join(",");
  const orderRef = useRef<string[]>([]);
  const prevListKeyRef = useRef("");
  if (mapped.length > 0) {
    if (prevListKeyRef.current !== listKey) {
      prevListKeyRef.current = listKey;
      const byPopularity = [...mapped].sort(
        (a, b) => b.likes + b.views - (a.likes + a.views)
      );
      const hasAnyPopular =
        byPopularity.length > 0 && (byPopularity[0].likes > 0 || byPopularity[0].views > 0);
      orderRef.current = (hasAnyPopular ? byPopularity.slice(0, 4) : mapped.slice(0, 4)).map(
        (w: PopularWatch) => String(w.id)
      );
    }
  }
  const popularWatches: PopularWatch[] = orderRef.current
    .map((id) => mapped.find((w: PopularWatch) => String(w.id) === id))
    .filter((w): w is PopularWatch => w != null);

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
            <PopularWatchesCard
              key={String(watch.id)}
              watch={watch}
              homepageSectionId="popular-watches"
              onLike={user?._id ? (watchId: string) => likeTargetWatchMutation({ variables: { input: watchId } }) : undefined}
            />
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

