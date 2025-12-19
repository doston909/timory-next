import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";

import PopularWatchesCard, { PopularWatch } from "@/libs/components/homepage/PopularWatchesCard";
import { 
  Stack, 
  Box, 
  Typography, 
  Button, 
  IconButton,
  TextField,
  Tabs,
  Tab
} from "@mui/material";
import { useState } from "react";
import { useRouter } from "next/router";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ReplyIcon from "@mui/icons-material/Reply";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";


const WatchDetail = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isReviewBoxOpen, setIsReviewBoxOpen] = useState(false);
  const [reviewText, setReviewText] = useState("");
  const [isReviewsExpanded, setIsReviewsExpanded] = useState(false);
  const [likedReviews, setLikedReviews] = useState<number[]>([]);

  const watch = {
    id: 1,
    brand: "Rolex",
    name: "Black Dail Strap",
    price: "$ 2,500.00",
    image: "/img/watch/rasmm2.png",
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

  // 2 ta rasm array - birinchi rasm watch.image, ikkinchi rasm boshqa rasm
  const getSecondImage = (image: string) => {
    if (image.includes("rasm1")) return image.replace("rasm1", "rasm2");
    if (image.includes("rasm2")) return image.replace("rasm2", "rasm3");
    if (image.includes("rasm3")) return image.replace("rasm3", "rasm1");
    if (image.includes("rasmm.png")) return image.replace("rasmm.png", "rasmm2.png");
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

  if (device === "mobile") {
    return <Stack>WATCH DETAIL MOBILE</Stack>;
  }

  return (
    <Stack className="watch-detail-page">
      <Box className="watch-detail-main">
        {/* Product Image Section */}
        <Box className="watch-image-section">
          <img src={images[currentImageIndex]} alt={watch.name} className="watch-main-image" />
          
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
              <Typography className="detail-value">{watch.caseShape}</Typography>
            </Box>
            <Box className="detail-item">
              <Typography className="detail-label">Water Resistance:</Typography>
              <Typography className="detail-value">{watch.waterResistance}</Typography>
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
              <Typography className="detail-value availability">{watch.availability}</Typography>
            </Box>   <Box className="detail-item">
              <Typography className="detail-label">Dealer:</Typography>
              <Typography className="detail-value availability">Elit Watch</Typography>
            </Box>
          </Box>

         

          {/* Action Buttons */}
          <Box className="action-buttons">
            <Button className="action-btn add-to-cart-btn">
              Add to Wishlist <ArrowForwardIcon sx={{ ml: 1 }} />
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
              Back <ArrowForwardIcon className="see-all-arrow" />
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Tabs Section */}
      <Tabs
        value={activeTab}
        onChange={handleTabChange}
        className="watch-tabs"
      >
        <Tab label="Description" />
        <Tab label="Shipping Information" />
        <Tab label="Reviews" />
      </Tabs>

      {/* Description/Reviews Section */}
      <Box className="watch-tabs-section">
        <Box className="tab-content">
          {activeTab === 0 && (
            <Box className="description-content">
              <Typography className="description-text">
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
               
               
              </Typography>
            
            </Box>
          )}
          {activeTab === 1 && (
            <Box className="shipping-content">
              <Typography className="description-text">
                Shipping information will be displayed here.      Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
                Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis. Nam tempus turpis at metus scelerisque placerat nulla deumantos solicitud felis.
              </Typography>
            </Box>
          )}
          {activeTab === 2 && (
            <Box className="reviews-content">
              <Typography className="reviews-title">Customer Reviews</Typography>
              <Box className="reviews-divider" />
              <Typography 
                className="reviews-count"
                onClick={() => setIsReviewsExpanded(!isReviewsExpanded)}
                sx={{ cursor: "pointer", userSelect: "none" }}
              >
                Based on 2 reviews
              </Typography>
              <Box className="reviews-divider" />
              
              {isReviewsExpanded && (
                <Box className="reviews-list">
                  <Box className="review-item">
                    <Box className="review-item-content">
                      <Typography className="review-author">John Doe</Typography>
                      <Typography className="review-date">2024-01-15</Typography>
                      <Typography className="review-content">
                        Great watch! Very satisfied with the quality and design. Highly recommend!
                      </Typography>
                    </Box>
                    <Box className="review-actions">
                      <Box className="review-reply-btn">
                        <ReplyIcon className="reply-icon" />
                      </Box>
                      <Box 
                        className={`review-like-btn ${likedReviews.includes(1) ? 'liked' : ''}`}
                        onClick={() => {
                          if (likedReviews.includes(1)) {
                            setLikedReviews(likedReviews.filter(id => id !== 1));
                          } else {
                            setLikedReviews([...likedReviews, 1]);
                          }
                        }}
                      >
                        <FavoriteBorderIcon className="like-icon" />
                        <Box className="like-badge">2</Box>
                      </Box>
                    </Box>
                  </Box>
                  <Box className="review-item">
                    <Box className="review-item-content">
                      <Typography className="review-author">Jane Smith</Typography>
                      <Typography className="review-date">2024-01-10</Typography>
                      <Typography className="review-content">
                        Excellent product. The watch looks exactly as shown in the pictures. Fast shipping too!
                      </Typography>
                    </Box>
                    <Box className="review-actions">
                      <Box className="review-reply-btn">
                        <ReplyIcon className="reply-icon" />
                      </Box>
                      <Box 
                        className={`review-like-btn ${likedReviews.includes(2) ? 'liked' : ''}`}
                        onClick={() => {
                          if (likedReviews.includes(2)) {
                            setLikedReviews(likedReviews.filter(id => id !== 2));
                          } else {
                            setLikedReviews([...likedReviews, 2]);
                          }
                        }}
                      >
                        <FavoriteBorderIcon className="like-icon" />
                        <Box className="like-badge">2</Box>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              )}

              {!isReviewBoxOpen && (
                <Button 
                  className="write-review-btn"
                  onClick={() => setIsReviewBoxOpen(true)}
                >
                  Write a review
                </Button>
              )}

              {isReviewBoxOpen && (
                <Box className="review-form-container">
                  <Typography className="review-title">Review</Typography>
                  <TextField
                    multiline
                    rows={8}
                    placeholder="vjhjhjgj"
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="review-textarea"
                    fullWidth
                  />
                  <Box className="review-form-actions">
                    <Button 
                      className="review-cancel-btn"
                      onClick={() => {
                        setReviewText("");
                        setIsReviewBoxOpen(false);
                      }}
                    >
                      Cancel
                    </Button>
                    <Button 
                      className="review-submit-btn"
                      onClick={() => {
                        if (reviewText.trim()) {
                          // Handle review submission here
                          console.log("Review submitted:", reviewText);
                          setReviewText("");
                          setIsReviewBoxOpen(false);
                        }
                      }}
                      disabled={!reviewText.trim()}
                    >
                      Submit Review <ArrowForwardIcon sx={{ ml: 1 }} />
                    </Button>
                  </Box>
                </Box>
              )}
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
