import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";

import PopularWatchesCard, {
  PopularWatch,
} from "@/libs/components/homepage/PopularWatchesCard";
import {
  Stack,
  Box,
  Typography,
  Button,
  IconButton,
  TextField,
  Tabs,
  Tab,
  Menu,
  MenuItem,
} from "@mui/material";
import { useState, useRef, useLayoutEffect, useEffect } from "react";
import { useRouter } from "next/router";
import { useReactiveVar } from "@apollo/client";
import { userVar } from "@/apollo/store";
import { useCart } from "@/libs/context/CartContext";
import {
  getWatchStatus,
  isWatchDeletedForVisitor,
} from "@/libs/watchStatusStorage";
import { incrementViewCount } from "@/libs/viewCountStorage";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import { ArrowForward } from "@mui/icons-material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Comment from "@mui/icons-material/Comment";
import CalendarToday from "@mui/icons-material/CalendarToday";
import Person from "@mui/icons-material/Person";
import MoreHoriz from "@mui/icons-material/MoreHoriz";
import Close from "@mui/icons-material/Close";

const WatchDetail = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const user = useReactiveVar(userVar);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);
  const [likeCounts, setLikeCounts] = useState<{ [key: number]: number }>({});
  const [newReviewText, setNewReviewText] = useState("");
  const [extraReviews, setExtraReviews] = useState<{ id: number; date: string; author: string; text: string }[]>([]);
  const [menuAnchorEl, setMenuAnchorEl] = useState<null | HTMLElement>(null);
  const [openMenuReviewId, setOpenMenuReviewId] = useState<number | null>(null);
  const [deletedReviewIds, setDeletedReviewIds] = useState<number[]>([]);
  const [editingReviewId, setEditingReviewId] = useState<number | null>(null);
  const [editedReviewTexts, setEditedReviewTexts] = useState<Record<number, string>>({});
  const { addToCart } = useCart();

  const reviewsListRef = useRef<HTMLDivElement>(null);
  const reviewItemsRef = useRef<(HTMLDivElement | null)[]>([]);

  const watchId = router.query.id ? parseInt(router.query.id as string, 10) : null;

  const allWatchesData = [
    { id: 1, name: "Analog Strap Watch", price: "Rs. 4,500.00", image: "/img/watch/rasm1.png", comments: 17 },
    { id: 2, name: "Black Dail Strap", price: "Rs. 2,500.00", image: "/img/watch/rasm2.png", comments: 17 },
    { id: 3, name: "Black Dial Classic", price: "Rs. 3,326.00", image: "/img/watch/rasm3.png", comments: 17 },
    { id: 4, name: "Rose Gold Mesh", price: "Rs. 5,200.00", image: "/img/watch/rasmm.png", comments: 17 },
    { id: 5, name: "Chronograph Brown", price: "Rs. 6,800.00", image: "/img/watch/rasmm2.png", comments: 17 },
    { id: 6, name: "Classic Gold", price: "Rs. 4,100.00", image: "/img/watch/rasm3.png", comments: 17 },
    { id: 7, name: "Chronograph Brown", price: "Rs. 6,800.00", image: "/img/watch/rasmm2.png", comments: 17 },
    { id: 8, name: "Classic Gold", price: "Rs. 4,100.00", image: "/img/watch/rasm3.png", comments: 17 },
    { id: 9, name: "Classic Gold", price: "Rs. 4,100.00", image: "/img/watch/rasm3.png", comments: 17 },
    { id: 10, name: "Analog Strap Watch", price: "Rs. 4,500.00", image: "/img/watch/rasm1.png", comments: 17 },
    { id: 11, name: "Black Dail Strap", price: "Rs. 2,500.00", image: "/img/watch/rasm2.png", comments: 17 },
    { id: 12, name: "Black Dial Classic", price: "Rs. 3,326.00", image: "/img/watch/rasm3.png", comments: 17 },
    { id: 13, name: "Rose Gold Mesh", price: "Rs. 5,200.00", image: "/img/watch/rasmm.png", comments: 17 },
    { id: 14, name: "Chronograph Brown", price: "Rs. 6,800.00", image: "/img/watch/rasmm2.png", comments: 17 },
    { id: 15, name: "Classic Gold", price: "Rs. 4,100.00", image: "/img/watch/rasm3.png", comments: 17 },
  ];

  const watchCommentsCount = watchId ? (allWatchesData.find((w: { id: number }) => w.id === watchId)?.comments ?? 4) : 4;

  const reviewPool = [
    { id: 1, author: "John Doe", date: "2024-01-15", text: "Great watch! Very satisfied with the quality and design. Highly recommend!" },
    { id: 2, author: "Jane Smith", date: "2024-01-10", text: "Excellent product. The watch looks exactly as shown in the pictures. Fast shipping too!" },
    { id: 3, author: "Mike Johnson", date: "2024-01-08", text: "Amazing quality and craftsmanship. Worth every penny!" },
    { id: 4, author: "Sarah Williams", date: "2024-01-05", text: "Beautiful watch, perfect for daily wear. Very comfortable and stylish." },
    { id: 5, author: "David Brown", date: "2024-01-04", text: "Outstanding quality. Exceeded my expectations." },
    { id: 6, author: "Emily Davis", date: "2024-01-03", text: "Love it! Perfect gift for my husband." },
    { id: 7, author: "James Wilson", date: "2024-01-02", text: "Classic design, great value for money." },
    { id: 8, author: "Lisa Anderson", date: "2024-01-01", text: "Very elegant and well-made watch." },
    { id: 9, author: "Robert Taylor", date: "2023-12-30", text: "Fast delivery, exactly as described." },
    { id: 10, author: "Maria Garcia", date: "2023-12-29", text: "Highly recommend this brand. Great quality." },
    { id: 11, author: "Thomas Martinez", date: "2023-12-28", text: "Beautiful timepiece. Very impressed." },
    { id: 12, author: "Jennifer Lee", date: "2023-12-27", text: "Perfect for everyday wear. Love the style." },
    { id: 13, author: "Christopher Harris", date: "2023-12-26", text: "Excellent craftsmanship. Worth every penny." },
    { id: 14, author: "Amanda Clark", date: "2023-12-25", text: "Great watch! Exceeded expectations." },
    { id: 15, author: "Daniel Lewis", date: "2023-12-24", text: "Classic and elegant. Very satisfied." },
    { id: 16, author: "Jessica Walker", date: "2023-12-23", text: "Beautiful design, comfortable to wear." },
    { id: 17, author: "Matthew Hall", date: "2023-12-22", text: "Outstanding quality. Highly recommend!" },
  ];

  const baseReviews = reviewPool.slice(0, watchCommentsCount);

  const allReviews = [...baseReviews, ...extraReviews].filter((r) => !deletedReviewIds.includes(r.id));
  const sortedReviews = [...allReviews].reverse();
  const reviewsCount = allReviews.length;

  const handleReviewMenuOpen = (event: React.MouseEvent<HTMLElement>, reviewId: number) => {
    event.stopPropagation();
    setMenuAnchorEl(event.currentTarget);
    setOpenMenuReviewId(reviewId);
  };

  const handleReviewMenuClose = () => {
    setMenuAnchorEl(null);
    setOpenMenuReviewId(null);
  };

  const handleEditReview = (reviewId: number) => {
    handleReviewMenuClose();
    const review = allReviews.find((r) => r.id === reviewId);
    if (review) {
      setNewReviewText(editedReviewTexts[reviewId] ?? review.text);
      setEditingReviewId(reviewId);
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setNewReviewText("");
  };

  const handleDeleteReview = (reviewId: number) => {
    setDeletedReviewIds((prev) => [...prev, reviewId]);
    setExtraReviews((prev) => prev.filter((r) => r.id !== reviewId));
    handleReviewMenuClose();
  };

  const handleSubmitReview = () => {
    const text = newReviewText.trim();
    if (!text) return;
    if (editingReviewId !== null) {
      const allReviewsList = [...baseReviews, ...extraReviews].filter((r) => !deletedReviewIds.includes(r.id));
      const review = allReviewsList.find((r) => r.id === editingReviewId);
      const originalText = review?.text ?? "";
      if (text !== originalText) {
        setEditedReviewTexts((prev) => ({ ...prev, [editingReviewId]: text }));
      } else {
        setEditedReviewTexts((prev) => {
          const next = { ...prev };
          delete next[editingReviewId];
          return next;
        });
      }
      setExtraReviews((prev) =>
        prev.map((r) => (r.id === editingReviewId ? { ...r, text } : r))
      );
      setEditingReviewId(null);
      setNewReviewText("");
    } else {
      setExtraReviews((prev) => [
        ...prev,
        {
          id: Date.now(),
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
          author: "You",
          text,
        },
      ]);
      setNewReviewText("");
    }
  };

  // Calculate height for last 2 reviews dynamically
  useLayoutEffect(() => {
    if (reviewsListRef.current && reviewItemsRef.current.length >= 2) {
      const firstReview = reviewItemsRef.current[0];
      const secondReview = reviewItemsRef.current[1];

      if (firstReview && secondReview) {
        const totalHeight =
          firstReview.offsetHeight + secondReview.offsetHeight + 50;
        reviewsListRef.current.style.maxHeight = `${totalHeight}px`;
      }
    } else if (reviewsListRef.current && reviewItemsRef.current.length === 1) {
      const firstReview = reviewItemsRef.current[0];
      if (firstReview) {
        reviewsListRef.current.style.maxHeight = `${
          firstReview.offsetHeight + 25
        }px`;
      }
    }
  }, [sortedReviews, reviewsCount]);

  const allWatches = allWatchesData.map(({ comments, ...w }) => w);
  const foundWatch = watchId ? allWatchesData.find((w: { id: number }) => w.id === watchId) : null;
  
  // Default watch data with additional properties
  const defaultWatchData = {
    brand: "Rolex",
    color: "Green",
    caseShape: "Square",
    waterResistance: "20m",
    vendor: "Delxa",
    type: "Men Watch",
    data: 2007,
    country: "Sweden",
    availability: 30,
    viewers: 188,
    sold: 69,
    soldHours: 16,
  };

  // Combine found watch with default data, or use default if not found
  const watch = foundWatch 
    ? {
        ...foundWatch,
        price: foundWatch.price.replace("Rs. ", "$ "), // Convert price format
        ...defaultWatchData,
      }
    : {
        id: 1,
        name: "Black Dail Strap",
        price: "$ 2,500.00",
        image: "/img/watch/rasmm2.png",
        ...defaultWatchData,
      };

  const storedStatus = watchId != null ? getWatchStatus(watchId) : undefined;
  const isDeletedForVisitor =
    watchId != null && isWatchDeletedForVisitor(watchId, user?._id);
  const availabilityText =
    storedStatus?.status === "sold_out" ? "sold out" : String(watch.availability);

  // View count: sahifaga kirilganda 1ga oshirish
  useEffect(() => {
    if (watchId != null && !Number.isNaN(watchId)) {
      incrementViewCount(watchId);
    }
  }, [watchId]);

  // 2 ta rasm array - birinchi rasm watch.image, ikkinchi rasm boshqa rasm
  const getSecondImage = (image: string) => {
    if (image.includes("rasm1")) return image.replace("rasm1", "rasm2");
    if (image.includes("rasm2")) return image.replace("rasm2", "rasm3");
    if (image.includes("rasm3")) return image.replace("rasm3", "rasm1");
    if (image.includes("rasmm.png"))
      return image.replace("rasmm.png", "rasmm2.png");
    if (image.includes("rasmm2")) return image.replace("rasmm2", "rasmm");
    return image; // Agar topilmasa, bir xil rasm
  };

  const images = [watch.image, getSecondImage(watch.image)];

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleQuantityChange = (delta: number) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const popularWatches: PopularWatch[] = [
    {
      id: 1,
      brand: "Rolex",
      model: "Datejust",
      image: "/img/watch/rasmm.png",
      price: "$ 2,500.00",
      likes: 2,
      views: 35,
      comments: 17,
    },
    {
      id: 2,
      brand: "Rolex",
      model: "Submariner",
      image: "/img/watch/rasm1.png",
      price: "$ 3,200.00",
      likes: 2,
      views: 35,
      comments: 17,
    },
    {
      id: 3,
      brand: "Rolex",
      model: "Daytona",
      image: "/img/watch/rasmm2.png",
      price: "$ 4,500.00",
      likes: 2,
      views: 35,
      comments: 17,
    },
    {
      id: 4,
      brand: "Omega",
      model: "Speedmaster",
      image: "/img/watch/rasm3.png",
      price: "$ 2,800.00",
      likes: 2,
      views: 35,
      comments: 17,
    },
  ];

  if (isDeletedForVisitor) {
    return (
      <Stack className="watch-detail-page">
        <Box className="watch-detail-main" sx={{ p: 3, textAlign: "center" }}>
          <Typography variant="h6">This watch is no longer available.</Typography>
          <Button onClick={() => router.back()} sx={{ mt: 2 }}>
            Go back
          </Button>
        </Box>
      </Stack>
    );
  }

  if (device === "mobile") {
    return <Stack>WATCH DETAIL MOBILE</Stack>;
  }

  return (
    <Stack className="watch-detail-page">
      <Box className="watch-detail-main">
        {/* Product Image Section */}
        <Box className="watch-image-section">
          <img
            src={images[currentImageIndex]}
            alt={watch.name}
            className="watch-main-image"
          />

          {/* Pagination Buttons */}
          {images.length > 1 && (
            <>
              <IconButton
                className="watch-scroll-arrow watch-scroll-arrow-left"
                aria-label="Previous"
                onClick={handlePrev}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                className="watch-scroll-arrow watch-scroll-arrow-right"
                aria-label="Next"
                onClick={handleNext}
              >
                <ChevronRightIcon />
              </IconButton>
            </>
          )}
        </Box>

        {/* Product Info Section */}
        <Box className="watch-info-section">
          {/* Product Name & Price */}
          <Typography className="watch-detail-name">{watch.name}</Typography>

          {/* Product Details */}
          <Box className="watch-details">
            <Box className="detail-item">
              <Typography className="detail-label">Brand:</Typography>
              <Typography className="detail-value">{watch.brand}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Price:</Typography>
              <Typography className="detail-value">{watch.price}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Color:</Typography>
              <Box className="color-preview" />
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Case Shape:</Typography>
              <Typography className="detail-value">
                {watch.caseShape}
              </Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">
                Water Resistance:
              </Typography>
              <Typography className="detail-value">
                {watch.waterResistance}
              </Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Type:</Typography>
              <Typography className="detail-value">{watch.type}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Data:</Typography>
              <Typography className="detail-value">{watch.data}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Made in:</Typography>
              <Typography className="detail-value">{watch.country}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Availability:</Typography>
              <Typography className="detail-value availability">
                {availabilityText}
              </Typography>
            </Box>{" "}
            <Box className="detail-item">
              <Typography className="detail-label">Dealer:</Typography>
              <Typography className="detail-value availability">
                Elit Watch
              </Typography>
            </Box>
          </Box>

          {/* Action Buttons */}
          <Box className="action-buttons">
            <Button 
              className="action-btn add-to-cart-btn"
              onClick={() => {
                addToCart({
                  id: watch.id,
                  image: watch.image,
                  name: watch.name,
                  model: watch.name,
                  brand: "",
                  price: parseFloat(String(watch.price).replace(/[^0-9.-]+/g, "")) || 0,
                  quantity: 1,
                });
              }}
            >
              Add to Wishlist <ArrowForward sx={{ ml: 1 }} />
            </Button>
            <Button className="action-btn contact-dealer-btn">
              Contact Dealer <ArrowForward sx={{ ml: 1 }} />
            </Button>
          </Box>

          {/* Engagement Metrics */}
          <Box className="engagement-metrics">
            <Box className="metric-item">
              <VisibilityIcon className="metric-icon" />
              <Typography className="metric-text">
                {watch.viewers} People are viewing this right now
              </Typography>
            </Box>
            <Box className="metric-item">
              <LocalFireDepartmentIcon className="metric-icon" />
              <Typography className="metric-text">
                Sold {watch.sold} Products in last {watch.soldHours} Hours
              </Typography>
            </Box>
          </Box>

          {/* Back Link */}
          <Box className="watch-back-wrapper">
            <Box className="see-all-text" onClick={() => router.push("/watch")}>
              Back <ArrowForward className="see-all-arrow" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        className="watch-tabs"
        sx={{
          display: "flex",
          gap: "40px",
          "& .MuiTab-root": {
            fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
            fontWeight: 400,
            fontSize: "24px !important",
            color: "#1a1a1a",
            textTransform: "none",
            padding: "12px 24px",
            minHeight: "50px",
            backgroundColor: "#ffffff",
            border: "1px solid #1a1a1a",
            borderRadius: "8px",
            marginRight: "10px !important",
            "&:last-of-type": {
              marginRight: "0 !important",
            },
            position: "relative",
            flex: "0 0 auto",
            "&:first-of-type": {
              borderTopLeftRadius: "8px",
              borderBottomLeftRadius: "8px",
            },

            "&.Mui-selected": {
              color: "#D4B890 !important",
              backgroundColor: "#8C7360 !important",
              borderColor: "#8C7360 !important",
              fontWeight: 400,
              zIndex: 1,
            },
            "&:hover:not(.Mui-selected)": {
              backgroundColor: "#ffffff",
              color: "#1a1a1a",
              borderColor: "#1a1a1a",
            },
          },
          "& .MuiTabs-indicator": {
            display: "none !important",
          },
        }}
      >
        <Tab label="Description" />
        <Tab label="Shopping Information" />
        <Tab label="Reviews" />
      </Tabs>

      {/* Description/Reviews Section */}
      <Box
        className={`watch-tabs-section ${
          activeTab === 2 ? "reviews-active" : ""
        }`}
      >
        <Box className="tab-content">
          {activeTab === 0 && (
            <Box className="description-content">
              <Typography className="description-text">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos
                solicitud felis. Nam tempus turpis at metus scelerisque placerat
                nulla deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis. Nam tempus turpis at metus
                scelerisque placerat nulla deumantos solicitud felis. Nam tempus
                turpis at metus scelerisque placerat nulla deumantos solicitud
                felis. Nam tempus turpis at metus scelerisque placerat nulla
                deumantos solicitud felis.
              </Typography>
            </Box>
          )}
          {activeTab === 1 && (
            <Box className="shipping-content">
              <Typography className="description-text">
                Returns Policy <br />
                You may return most new, unopened items within 30 days of
                delivery for a full refund. We'll also pay the return shipping
                costs if the return is a result of our error (you received an
                incorrect or defective item, etc.).<br /> You should expect to receive
                your refund within four weeks of giving your package to the
                return shipper, however, in many cases you will receive a refund
                more quickly. This time period includes the transit time for us
                to receive your return from the shipper (5 to 10 business days),
                the time it takes us to process your return once we receive it
                (3 to 5 business days), and the time it takes your bank to
                process our refund request (5 to 10 business days).<br /> If you need
                to return an item, simply login to your account, view the order
                using the 'Complete Orders' link under the My Account menu and
                click the Return Item(s) button. We'll notify you via e-mail of
                your refund once we've received and processed the returned item
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box className="reviews-content">
              <Box className="reviews-title-wrapper">
                <Comment className="reviews-title-icon" />
                <Typography className="reviews-title">
                  {reviewsCount} Review{reviewsCount !== 1 ? "s" : ""}
                </Typography>
              </Box>

              {/* Existing Reviews */}
              <Box className="reviews-list" ref={reviewsListRef}>
                {reviewsCount === 0 ? (
                  <Box className="no-reviews">
                    <Typography className="no-reviews-text">
                      No review...
                    </Typography>
                  </Box>
                ) : (
                  sortedReviews.map((review, index) => (
                    <Box
                      key={review.id}
                      className="review-item"
                      ref={(el: HTMLDivElement | null) => {
                        reviewItemsRef.current[index] = el;
                      }}
                    >
                      <Typography className="review-number">
                        {reviewsCount - index}.
                      </Typography>
                      <Box className="review-content">
                        <Box className="review-meta">
                          <Box sx={{ display: "flex", alignItems: "center", gap: "20px" }}>
                            <Box component="span" className="review-meta-item">
                              <CalendarToday className="review-meta-icon" />
                              <Typography component="span" className="review-meta-text">
                                {review.date}
                              </Typography>
                            </Box>
                            <Box component="span" className="review-meta-item">
                              <Person className="review-meta-icon" />
                              <Typography component="span" className="review-meta-text">
                                {review.author}
                              </Typography>
                            </Box>
                          </Box>
                          {editingReviewId !== review.id && review.author === "You" && (
                            <IconButton
                              className="review-more-btn"
                              size="small"
                              onClick={(e) => handleReviewMenuOpen(e, review.id)}
                              sx={{ padding: "4px" }}
                            >
                              <MoreHoriz sx={{ fontSize: 22, color: "#8c6f5a" }} />
                            </IconButton>
                          )}
                        </Box>
                        <Box className="review-text-wrapper">
                          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", gap: "20px", width: "100%" }}>
                            <Typography className="review-text">
                              {editedReviewTexts[review.id] ?? review.text}
                            </Typography>
                          <Box className="review-actions">
                            <Box className="review-reply-btn">
                              <ReplyIcon className="reply-icon" />
                            </Box>
                            <Box
                              className={`review-like-btn ${
                                likedReviews.includes(review.id) ? "liked" : ""
                              }`}
                              onClick={() => {
                                if (likedReviews.includes(review.id)) {
                                  setLikedReviews(
                                    likedReviews.filter(
                                      (id) => id !== review.id
                                    )
                                  );
                                  setLikeCounts((prev) => ({
                                    ...prev,
                                    [review.id]: (prev[review.id] || 2) - 1,
                                  }));
                                } else {
                                  setLikedReviews([...likedReviews, review.id]);
                                  setLikeCounts((prev) => ({
                                    ...prev,
                                    [review.id]: (prev[review.id] || 2) + 1,
                                  }));
                                }
                              }}
                            >
                              {likedReviews.includes(review.id) ? (
                                <FavoriteIcon className="like-icon" />
                              ) : (
                                <FavoriteBorderIcon className="like-icon" />
                              )}
                              <Box className="like-badge">
                                {likeCounts[review.id] || 2}
                              </Box>
                            </Box>
                          </Box>
                          </Box>
                          {editedReviewTexts[review.id] && (
                            <Typography className="review-edited">
                              edited
                            </Typography>
                          )}
                        </Box>
                      </Box>
                    </Box>
                  ))
                )}
              </Box>

              <Menu
                anchorEl={menuAnchorEl}
                open={Boolean(menuAnchorEl)}
                onClose={handleReviewMenuClose}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                transformOrigin={{ vertical: "top", horizontal: "right" }}
                PaperProps={{
                  sx: {
                    "& .MuiMenuItem-root": {
                      fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif",
                    },
                  },
                }}
              >
                <MenuItem
                  onClick={() => {
                    if (openMenuReviewId !== null) handleEditReview(openMenuReviewId);
                  }}
                >
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    if (openMenuReviewId !== null) handleDeleteReview(openMenuReviewId);
                  }}
                >
                  Delete
                </MenuItem>
              </Menu>

              {/* Review Form */}
              <Box className="review-form">
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 1 }}>
                  <Typography className="review-form-title">
                    {editingReviewId !== null ? "Edit review" : "Leave a review"}
                  </Typography>
                  {editingReviewId !== null && (
                    <IconButton
                      size="small"
                      onClick={handleCancelEdit}
                      sx={{ color: "#8c6f5a" }}
                      aria-label="Cancel edit"
                    >
                      <Close sx={{ fontSize: 24 }} />
                    </IconButton>
                  )}
                </Box>
                <Box className="review-form-row"></Box>
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  placeholder="Message..."
                  className="review-textarea"
                  value={newReviewText}
                  onChange={(e) => setNewReviewText(e.target.value)}
                  sx={{
                    mb: 2,
                    "& .MuiInputBase-input": {
                      paddingTop: "16px !important",
                    },
                    "& textarea": {
                      paddingTop: "16px !important",
                      resize: "none !important",
                      overflowY: "auto !important",
                      overflowX: "hidden !important",
                    },
                    "& .MuiOutlinedInput-root": {
                      overflow: "hidden !important",
                    },
                  }}
                />
                <Box className="review-submit-wrapper">
                  <Button className="review-submit-btn" onClick={handleSubmitReview}>
                    Post comment
                    <ArrowForward sx={{ ml: 1, fontSize: 22 }} />
                  </Button>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
      </Box>

      {/* Popular Watches Section */}
      <Box className="popular-watches-section">
        <h2 className="section-title">Recommended products</h2>

        <Box className="popular-watches-grid">
          {popularWatches.map((watch) => (
            <PopularWatchesCard key={watch.id} watch={watch} />
          ))}
        </Box>
      </Box>
    </Stack>
  );
};

export default withLayoutBasic(WatchDetail);
