import { Box, Stack, TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Image from "next/image";
import { useTranslation } from "@/libs/context/useTranslation";

const News = () => {
  const [email, setEmail] = useState("");
  const { t } = useTranslation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      console.log("Subscribed:", email);
      setEmail("");
    }
  };

  return (
    <Stack className="news-section">
      <Box className="news-container">
        {/* Icon */}
        <Box className="news-icon-wrapper">
          <Image
            src="/img/dealer/email.png"
            alt="Email Icon"
            width={50}
            height={50}
            className="news-envelope-icon"
          />
        </Box>

        {/* Title */}
        <h2 className="news-title">{t("home.newsletterSignup")}</h2>

        {/* Description */}
        <p className="news-description">
          {t("home.joinOurList")}
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="news-form">
          <TextField
            variant="standard"
            type="email"
            placeholder={t("home.enterYourEmail")}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="news-email-input"
            InputProps={{
              disableUnderline: false,
            }}
            required
          />
          <Button type="submit" className="news-subscribe-btn">
            {t("home.submit")} <ArrowForwardIcon className="news-subscribe-arrow" />
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default News;

