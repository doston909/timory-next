import { useState, useRef } from "react";
import { useRouter } from "next/router";
import { saveHomepageSectionBeforeNav } from "@/libs/homepageScroll";
import { Stack, Box, IconButton } from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useCart } from "@/libs/context/CartContext";
import { useTranslation } from "@/libs/context/useTranslation";
import { useQuery, useMutation } from "@apollo/client";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import type { ApolloCache } from "@apollo/client";
import { GET_WATCHES } from "@/apollo/user/query";
import { LIKE_TARGET_WATCH } from "@/apollo/user/mutation";
import { watchImageUrl } from "@/libs/utils";
import { sweetToastErrorAlert } from "@/libs/sweetAlert";

import "swiper/css";
import "swiper/css/navigation";

type BestSellerWatch = {
  id: string | number;
  brand: string;
  model: string;
  price: string;
  image: string;
  likes: number;
  views: number;
  meLiked?: { memberId: string; likeRefId: string; myFavorite: boolean }[];
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

const POPULAR_WATCHES_VARS = {
  input: {
    page: 1,
    limit: 20,
    sort: "createdAt",
    direction: "DESC" as const,
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
      const existing = cache.readQuery({ query: GET_WATCHES, variables: vars });
      if (!existing?.getWatches?.list) return;
      const newList = existing.getWatches.list.map((w: any) => {
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

const BestSeller = () => {
  const router = useRouter();
  const { addToCart } = useCart();
  const { t } = useTranslation();
  const user = useReactiveVar(userVar);
  const { data } = useQuery(GET_WATCHES, { variables: BEST_SELLER_VARS });
  const [likeTargetWatchMutation] = useMutation(LIKE_TARGET_WATCH, {
    update(cache, { data }) {
      const updated = data?.likeTargetWatch;
      if (!updated?._id) return;
      const newLikes = updated.watchLikes ?? 0;
      let wasLiked = true;
      try {
        const q = cache.readQuery({ query: GET_WATCHES, variables: BEST_SELLER_VARS }) as any;
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
    price: w.watchPrice != null ? `$ ${Number(w.watchPrice).toLocaleString("en-US", { minimumFractionDigits: 2 })}` : "$0.00",
    image: watchImageUrl(w.watchImages?.[0]),
    likes: w.watchLikes ?? 0,
    views: w.watchViews ?? 0,
    meLiked: w.meLiked ?? undefined,
  }));

  const listKey = list.map((w: any) => w._id).sort().join(",");
  const orderRef = useRef<string[]>([]);
  const prevListKeyRef = useRef("");
  if (mapped.length > 0) {
    if (prevListKeyRef.current !== listKey) {
      prevListKeyRef.current = listKey;
      const byLikes = [...mapped].sort((a, b) => b.likes - a.likes);
      const hasAnyLikes = byLikes.length > 0 && byLikes[0].likes > 0;
      orderRef.current = (hasAnyLikes ? byLikes.slice(0, 8) : mapped.slice(0, 8)).map((w) =>
        String(w.id)
      );
    }
  }
  const bestSellers: BestSellerWatch[] = orderRef.current
    .map((id) => mapped.find((w) => String(w.id) === id))
    .filter(Boolean) as BestSellerWatch[];

  const [likedWatches, setLikedWatches] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    bestSellers.reduce((acc, w) => ({ ...acc, [String(w.id)]: w.likes }), {})
  );

  const handleCardClick = (watchId: string | number) => {
    saveHomepageSectionBeforeNav("best-seller");
    router.push(`/watch/detail?id=${watchId}`);
  };

  const handleBagClick = (e: React.MouseEvent, watch: BestSellerWatch) => {
    e.stopPropagation();
    addToCart({
      id: watch.id,
      name: watch.model,
      model: watch.model,
      brand: watch.brand,
      price: parseFloat(String(watch.price).replace(/[^0-9.-]+/g, "")) || 0,
      image: watch.image,
      quantity: 1,
    });
  };

  const handleLikeClick = (e: React.MouseEvent, w: BestSellerWatch) => {
    e.stopPropagation();
    if (!user?._id) {
      sweetToastErrorAlert("Please log in or sign up to like and comment.").then();
      return;
    }
    likeTargetWatchMutation({ variables: { input: String(w.id) } });
  };

  const handleSeeAllClick = () => {
    saveHomepageSectionBeforeNav("best-seller");
    router.push("/watch");
  };

  return (
    <Stack className="best-seller-section">
      <h2 className="section-title">{t("home.bestSellers")}</h2>
      <p className="section-subtitle">{t("home.bestSellersSubtitle")}</p>

      <Box className="best-seller-container">
        <IconButton
          className="scroll-arrow scroll-arrow-left best-prev-btn"
          aria-label="Previous watches"
        >
          <ChevronLeftIcon />
        </IconButton>

        <Swiper
          modules={[Navigation]}
          slidesPerView={4} 
          spaceBetween={30}
          navigation={{
            nextEl: ".best-next-btn",
            prevEl: ".best-prev-btn",
          }}
          allowTouchMove={true}
          speed={500}
          className="best-seller-swiper"
        >
          {bestSellers.map((w) => {
            const isLiked = user?._id
              ? (w.meLiked != null && w.meLiked.length > 0)
              : likedWatches[String(w.id)];
            return (
              <SwiperSlide key={String(w.id)}>
                <Box
                  className={`best-watch-card${isLiked ? " best-watch-card-actions-visible" : ""}`}
                  onClick={() => handleCardClick(w.id)}
                  sx={{ cursor: "pointer" }}
                >
                  <div className="image-box">
                    <img src={w.image} alt={w.model} />

                    <div className="watch-actions">
                      <div className="action-btn" onClick={(e) => handleBagClick(e, w)}>
                        <ShoppingBagOutlinedIcon
                          sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                        />
                      </div>
                      <div
                        className={`action-btn action-btn-with-count${isLiked ? " action-btn-liked" : ""}`}
                        onClick={(e) => handleLikeClick(e, w)}
                      >
                        {isLiked ? (
                          <FavoriteIcon sx={{ fontSize: 24, fontWeight: 300 }} />
                        ) : (
                          <FavoriteBorderIcon sx={{ fontSize: 24, color: "#000", fontWeight: 300 }} />
                        )}
                        <span className="action-count action-count-badge">
                          {user?._id ? (w.likes ?? 0) : (likeCounts[String(w.id)] ?? w.likes)}
                        </span>
                      </div>
                      <div className="action-btn action-btn-with-count">
                        <CheckCircleIcon
                          sx={{ fontSize: 24, color: "#000", fontWeight: 300 }}
                        />
                        <span className="action-count action-count-badge">{w.views ?? 0}</span>
                      </div>
                    </div>
                  </div>

                  <div className="info">
                    <p className="brand">{w.brand}</p>
                    <p className="model">{w.model}</p>
                  </div>
                </Box>
              </SwiperSlide>
            );
          })}
        </Swiper>

        <IconButton
          className="scroll-arrow scroll-arrow-right best-next-btn"
          aria-label="Next watches"
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>

      <Box className="dealers-see-all-wrapper" onClick={handleSeeAllClick} sx={{ cursor: "pointer" }}>
        <Box className="see-all-text">
          {t("home.seeAll")} <ArrowForwardIcon className="see-all-arrow" />
        </Box>
      </Box>
    </Stack>
  );
};

export default BestSeller;
