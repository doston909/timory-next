import React, { useState, useEffect } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const AccountLogin: NextPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [stayLoggedIn, setStayLoggedIn] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setEmail("");
    setPassword("");
    setStayLoggedIn(false);
    const t = setTimeout(() => {
      setEmail("");
      setPassword("");
    }, 100);
    return () => clearTimeout(t);
  }, [router.asPath]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: implement real login logic
    console.log("Login:", { email, password, stayLoggedIn });
  };

  return (
    <div id="account-page">
      <div className="account-container">
        <div className="account-card">
          <Typography className="account-title">Log in</Typography>

          <form onSubmit={handleSubmit} className="account-form" autoComplete="off">
            <div className="account-field">
              <Typography className="account-label">Name</Typography>
              <TextField
                fullWidth
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                variant="outlined"
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                InputProps={{ classes: { root: "account-input" } }}
              />
            </div>

            <div className="account-field">
              <Typography className="account-label">Password</Typography>
              <Box className="account-password-wrapper">
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  autoComplete="new-password"
                  inputProps={{ autoComplete: "new-password" }}
                  InputProps={{
                    classes: { root: "account-input" },
                    endAdornment: (
                      <IconButton onClick={() => setShowPassword((p) => !p)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </div>

            <Stack direction="row" justifyContent="space-between" alignItems="center" className="account-options">
              <FormControlLabel
                control={
                  <Checkbox
                    size="large"
                    checked={stayLoggedIn}
                    onChange={(e) => setStayLoggedIn(e.target.checked)}
                  />
                }
                label={<Typography className="account-helper">Stay logged in</Typography>}
              />
              <Button
                type="button"
                className="account-link-button"
                onClick={() => router.push("/account/reset")}
              >
                Forgot your password?
              </Button>
            </Stack>

            <Button type="submit" fullWidth className="account-submit-button">
              Log in
            </Button>

            <div className="account-divider">
              <span></span>
              <span>OR</span>
              <span></span>
            </div>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              className="account-oauth-button"
            >
              <img 
                src="/img/brand/google.png" 
                alt="Google" 
                className="account-oauth-icon"
                style={{ width: "24px", height: "24px", marginRight: "24px" }}
              />
              <span>Continue with Google</span>
            </Button>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              className="account-oauth-button"
            >
                <img 
                src="/img/brand/apple-logo.png" 
                alt="Google" 
                className="account-oauth-icon"
                style={{ width: "24px", height: "24px", marginRight: "24px" }}
              />
              <span>Continue with Apple</span>
            </Button>
          </form>

          <Box className="account-footer">
            <Typography className="account-helper">
              New to Timory?{" "}
              <Button
                type="button"
                className="account-link-button"
                onClick={() => router.push("/account/signup")}
              >
                Create a free account now
              </Button>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default withLayoutBasic(AccountLogin);


