import { Stack, Box, Typography, Button } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import StarIcon from "@mui/icons-material/Star";
import PeopleIcon from "@mui/icons-material/People";
import SecurityIcon from "@mui/icons-material/Security";
import StoreIcon from "@mui/icons-material/Store";
import { useTranslation } from "@/libs/context/useTranslation";

const OurGoal = () => {
  const { t } = useTranslation();
  const stats = [
    {
      id: 1,
      icon: (
    <img
      src="/img/flag/tr4.png"
      alt="rating"
      width={280}
      height={190}
    />
  ),
      titleKey: "home.stats1Title",
      descKey: "home.stats1Desc",
    },
    {
      id: 2,
       icon: (
    <img
      src="/img/flag/tr3.png"
      alt="rating"
      width={260}
      height={170}
    />
  ),
      titleKey: "home.stats2Title",
      descKey: "home.stats2Desc",
    },
    {
      id: 3,
       icon: (
    <img
      src="/img/flag/tr2.png"
      alt="rating"
      width={280}
      height={170}
    />
  ),
      titleKey: "home.stats3Title",
      descKey: "home.stats3Desc",
    },
    {
      id: 4,
      icon: (
    <img
      src="/img/flag/tr1.png"
      alt="rating"
      width={280}
      height={170}
    />
  ),
      titleKey: "home.stats4Title",
      descKey: "home.stats4Desc",
    },
  ];

  const featureKeys = ["home.feature1", "home.feature2", "home.feature3", "home.feature4", "home.feature5", "home.feature6"];

  return (
    <Stack className="our-goal-section">
      {/* Top Section: Marketplace Statistics */}
      <Box className="stats-section">
        <Typography className="stats-title">
          {t("home.leadingMarketplace")}
        </Typography>
        <Box className="stats-grid">
          {stats.map((stat) => (
            <Box key={stat.id} className="stat-box">
              <Box className="stat-icon">{stat.icon}</Box>
              <Typography className="stat-title">{t(stat.titleKey)}</Typography>
              <Typography className="stat-description">
                {t(stat.descKey)}
              </Typography>
            </Box>
          ))}
        </Box>
      </Box>

      {/* Bottom Section: Buyer Protection */}
      <Box className="protection-section">
        <Box className="protection-content">
          <Typography className="protection-title">
            {t("home.buyerProtection")}
          </Typography>
          <Box className="features-list">
            {featureKeys.map((key, index) => (
              <Box key={index} className="feature-item">
                <CheckOutlinedIcon className="check-icon" />
                <Typography className="feature-text">{t(key)}</Typography>
              </Box>
            ))}
          </Box>
          <Button className="learn-more-btn" variant="outlined">
            {t("home.learnMoreSecurity")}
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





