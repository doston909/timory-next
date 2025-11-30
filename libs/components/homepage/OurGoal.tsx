import { Stack, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import StoreIcon from "@mui/icons-material/Store";

const OurGoal = () => {
  const stats = [
    {
      id: 1,
      icon: <StarIcon sx={{ fontSize: 50, color: "#000" }} />,
      title: "4.7 out of 5 stars",
      description: "from 186,000 reviews worldwide",
    },
    {
      id: 2,
      icon: <PeopleIcon sx={{ fontSize: 50, color: "#000" }} />,
      title: "9 million",
      description: "watch enthusiasts use Timory each month",
    },
    {
      id: 3,
      icon: <SecurityIcon sx={{ fontSize: 50, color: "#000" }} />,
      title: "Over 200,000",
      description: "customers choose Buyer Protection annually",
    },
    {
      id: 4,
      icon: <StoreIcon sx={{ fontSize: 50, color: "#000" }} />,
      title: "More than 25,000",
      description: "trustworthy sellers",
    },
  ];

  const features = [
    "Payment via the Escrow Service",
    "Commitment to Authenticity",
    "Global money-back guarantee",
    "Strict dealer guidelines",
    "Insured shipments",
    "Timory's quality & security team",
  ];

  return (
    <Stack className="our-goal-section">
      {/* Top Section: Marketplace Statistics */}
      <Box className="stats-section">
        <Typography className="stats-title">
          The Leading Marketplace for TIMORY Since 2003
        </Typography>
        <Box className="stats-grid">
          {stats.map((stat) => (
            <Box key={stat.id} className="stat-box">
              <Box className="stat-icon">{stat.icon}</Box>
              <Typography className="stat-title">{stat.title}</Typography>
              <Typography className="stat-description">
                {stat.description}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Section: Buyer Protection */}
      <Box className="protection-section">
        <Box className="protection-content">
          <Typography className="protection-title">
            Timory Buyer Protection
          </Typography>
          <Box className="features-list">
            {features.map((feature, index) => (
              <Box key={index} className="feature-item">
                <CheckCircleIcon className="check-icon" />
                <Typography className="feature-text">{feature}</Typography>
              </Box>
            ))}
          </Box>
          <Button className="learn-more-btn" variant="outlined">
            Learn more about security on Timory
          </Button>
        </Box>
        <Box className="protection-image">
          <img
            src="/img/watch/ourgoal.jpeg"
            alt="Lifestyle"
            className="lifestyle-img"
          />
        </Box>
      </Box>
    </Stack>
  );
};

export default OurGoal;

