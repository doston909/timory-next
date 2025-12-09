import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
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
import RemoveIcon from "@mui/icons-material/Remove";
import AddIcon from "@mui/icons-material/Add";
import VisibilityIcon from "@mui/icons-material/Visibility";
import LocalFireDepartmentIcon from "@mui/icons-material/LocalFireDepartment";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

const WatchDetail = () => {
  const device = useDeviceDetect();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

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
        </Box>
      </Box>

      {/* Back Link */}
      <Box className="watch-back-wrapper">
        <Box className="see-all-text" onClick={() => router.push("/watch")}>
          Back <ArrowForwardIcon className="see-all-arrow" />
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
              <Typography className="reviews-count">Based on 2 reviews</Typography>
              <Box className="reviews-divider" />
              <Button className="write-review-btn">
                Write a review
              </Button>
            </Box>
          )}
        </Box>
      </Box>
    </Stack>
  );
};

export default withLayoutBasic(WatchDetail);
