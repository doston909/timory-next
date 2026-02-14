import { Box, Stack, TextField, Button } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useState } from "react";
import Image from "next/image";

const News = () => {
  const [email, setEmail] = useState("");

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
        <h2 className="news-title">Newsletter Signup</h2>

        {/* Description */}
        <p className="news-description">
          Join our list and get 15% off your first purchase! Don't worry we don't spam
        </p>

        {/* Email Form */}
        <form onSubmit={handleSubmit} className="news-form">
          <TextField
            variant="standard"
            type="email"
            placeholder="Enter your email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="news-email-input"
            InputProps={{
              disableUnderline: false,
            }}
            required
          />
          <Button type="submit" className="news-subscribe-btn">
            SUBMIT <ArrowForwardIcon className="news-subscribe-arrow" />
          </Button>
        </form>
      </Box>
    </Stack>
  );
};

export default News;

