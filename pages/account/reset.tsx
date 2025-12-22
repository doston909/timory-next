import React, { useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const AccountReset: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement real reset password logic
    console.log("Reset password:", { email });
  };

  return (
    <div id="account-page">
      <div className="account-container account-container-reset">
        <div className="account-card account-card-reset">
          <Typography className="account-title">Reset password</Typography>

          <Typography 
            className="account-helper" 
            style={{ 
              marginBottom: "24px",
              fontSize: "16px",
              color: "#201f1f",
              lineHeight: "1.5",
              fontFamily: "'Poppins', sans-serif"
            }}
          >
            Please specify your email address and then click on "Reset password." <br/>You will then receive an email with which you can change your password.
          </Typography>

          <form onSubmit={handleSubmit} className="account-form">
            <div className="account-field">
              <Typography className="account-label">Email address</Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                InputProps={{ classes: { root: "account-input" } }}
              />
            </div>

            <Button type="submit" fullWidth className="account-submit-button">
              Reset password
            </Button>
          </form>

          <Box className="account-footer">
            <Typography className="account-helper">
              <Button
                type="button"
                className="account-link-button"
                onClick={() => router.push("/account")}
              >
                Back to log in
              </Button>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default withLayoutBasic(AccountReset);

