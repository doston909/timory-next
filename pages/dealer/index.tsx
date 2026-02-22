import React, { useState, useMemo } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";
import { GET_DEALERS } from "@/apollo/user/query";
import { watchImageUrl } from "@/libs/utils";

const ITEMS_PER_PAGE = 9;

type DealerItem = {
  id: string;
  name: string;
  image: string;
  goal: string;
  original?: boolean;
};

const DealerPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();

  const { data: dealersData } = useQuery(GET_DEALERS, {
    variables: {
      input: {
        page: 1,
        limit: 500,
        sort: "memberRank",
        direction: "DESC",
        search: {},
      },
    },
  });
  const list = dealersData?.getDealers?.list ?? [];
  const dealers: DealerItem[] = useMemo(
    () =>
      list.map((m: any, index: number) => ({
        id: m._id,
        name: m.memberName ?? "—",
        image: watchImageUrl(m.memberPhoto),
        goal: "Trusted dealer on Timory.",
        original: index === 0,
      })),
    [list]
  );

  const totalPages = Math.ceil(dealers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentDealers = dealers.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handlePageChange = (page: number) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
    if (typeof window !== "undefined") {
      const topEl = document.getElementById("dealer-list-top");
      if (topEl) {
        topEl.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }
  };

  return (
    <Stack className="dealer-page">
      <Box id="dealer-list-top" className="dealer-list-header">
        <Typography className="dealer-list-title">
          Our Trusted Dealers
        </Typography>
        <Typography className="dealer-list-subtitle">
          Carefully selected partners from around the world
        </Typography>
      </Box>

      <Box className="dealer-grid">
        {currentDealers.map((dealer) => (
          <Box
            key={dealer.id}
            className={dealer.original ? "dealer-card dealer-card-original" : "dealer-card"}
            onClick={() => router.push(`/dealer/detail?id=${dealer.id}`)}
            sx={{ cursor: "pointer" }}
          >
            <Box className="dealer-image-wrapper">
              {dealer.image ? (
                <img
                  src={dealer.image}
                  alt={dealer.name}
                  className={
                    dealer.original
                      ? "dealer-image dealer-image-original"
                      : "dealer-image"
                  }
                />
              ) : (
                <Box className="dealer-image-placeholder">
                  <PersonOutlineIcon className="dealer-user-icon" />
                </Box>
              )}
            </Box>
            <Box className="dealer-card-content">
              <Typography className="dealer-name">{dealer.name}</Typography>
              <Typography className="dealer-label">Dealer</Typography>
              <Typography className="dealer-goal">{dealer.goal}</Typography>
            </Box>
          </Box>
        ))}
      </Box>

      {totalPages > 1 && (
        <Box className="dealer-pagination">
          {Array.from({ length: totalPages }).map((_, index) => {
            const page = index + 1;
            return (
              <button
                key={page}
                className={`dealer-page-number${
                  page === currentPage ? " active" : ""
                }`}
                onClick={() => handlePageChange(page)}
              >
                {page}
              </button>
            );
          })}
        </Box>
      )}
    </Stack>
  );
};

export default withLayoutBasic(DealerPage);


