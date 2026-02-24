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
import { GoogleLogin } from "@react-oauth/google";
import withLayoutBasic from "../../libs/components/layout/LayoutBasic";

const AccountSignup: NextPage = () => {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [registrationType, setRegistrationType] = useState<"user" | "agent" | null>(null);

  useEffect(() => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setAgreeToTerms(false);
    setRegistrationType(null);
    const t = setTimeout(() => {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
    }, 100);
    return () => clearTimeout(t);
  }, [router.asPath]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { sweetMixinErrorAlert } = await import("../../libs/sweetAlert");

    if (!name.trim()) {
      await sweetMixinErrorAlert("Please enter your name");
      return;
    }
    if (!email.trim()) {
      await sweetMixinErrorAlert("Please enter your email");
      return;
    }
    if (password.length < 5 || password.length > 50) {
      await sweetMixinErrorAlert("Password must be 5–50 characters long");
      return;
    }
    if (password !== confirmPassword) {
      await sweetMixinErrorAlert("Password and confirmation must match");
      return;
    }
    if (!agreeToTerms) {
      await sweetMixinErrorAlert("You must agree to the terms and conditions");
      return;
    }
    if (registrationType !== "user" && registrationType !== "agent") {
      await sweetMixinErrorAlert("Please select User or Dealer");
      return;
    }

    try {
      const { signUp } = await import("../../libs/auth");
      await signUp(
        name.trim(),
        email.trim(),
        password,
        confirmPassword,
        registrationType === "user" ? "USER" : "DEALER"
      );
      if (typeof window !== "undefined") window.location.href = "/";
    } catch {
      // Error already shown by auth lib
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    if (registrationType !== "user" && registrationType !== "agent") {
      const { sweetMixinErrorAlert } = await import("../../libs/sweetAlert");
      await sweetMixinErrorAlert("Please select User or Dealer first");
      return;
    }
    try {
      const { loginWithGoogle } = await import("../../libs/auth");
      const memberType = registrationType === "agent" ? "DEALER" : "USER";
      await loginWithGoogle(credential, memberType);
      if (typeof window !== "undefined") window.location.href = "/";
    } catch {
      // Error already shown by auth lib
    }
  };

  return (
    <div id="account-page">
      <div className="account-container account-container-signup">
        <div className="account-card account-card-signup">
          <Typography className="account-title">Create Account</Typography>

          <form onSubmit={handleSubmit} className="account-form" autoComplete="off">
            <div className="account-field">
              <Typography className="account-label">Name</Typography>
              <TextField
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                variant="outlined"
                autoComplete="off"
                inputProps={{ autoComplete: "off" }}
                InputProps={{ classes: { root: "account-input" } }}
              />
            </div>

            <div className="account-field">
              <Typography className="account-label">Email address</Typography>
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

            <div className="account-field">
              <Typography className="account-label">Confirm Password</Typography>
              <Box className="account-password-wrapper">
                <TextField
                  fullWidth
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  variant="outlined"
                  autoComplete="new-password"
                  inputProps={{ autoComplete: "new-password" }}
                  InputProps={{
                    classes: { root: "account-input" },
                    endAdornment: (
                      <IconButton onClick={() => setShowConfirmPassword((p) => !p)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    ),
                  }}
                />
              </Box>
            </div>

            <div className="account-field">
              <Stack direction="row" spacing={3} alignItems="center" style={{ flexWrap: "wrap" }}>
                <Typography className="account-label" style={{ fontSize: "18px",fontWeight: 500, marginBottom: 0, marginRight: "68px", marginLeft: "40px" }}>
                  I want to be registered as:
                </Typography>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={registrationType === "user"}
                      onChange={() => setRegistrationType("user")}
                      sx={{
                        color: "#4f4f4f",
                        "&.Mui-checked": {
                          color: "#000000",
                        },
                      }}
                    />
                  }
                  label={<Typography className="account-helper" style={{ fontSize: "18px",marginLeft: 0, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>User</Typography>}
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={registrationType === "agent"}
                      onChange={() => setRegistrationType("agent")}
                      sx={{
                        color: "#4f4f4f",
                        "&.Mui-checked": {
                          color: "#000000",
                        },
                      }}
                    />
                  }
                  label={<Typography className="account-helper" style={{ fontSize: "18px",marginLeft: 0, fontFamily: "'Helvetica Neue', Helvetica, Arial, sans-serif" }}>Dealer</Typography>}
                />
              </Stack>
            </div>

            <Stack direction="row" justifyContent="flex-start" alignItems="center" className="account-options">
              <FormControlLabel
                control={
                  <Checkbox
                    size="large"
                    checked={agreeToTerms}
                    onChange={(e) => setAgreeToTerms(e.target.checked)}
                  />
                }
                label={<Typography className="account-helper">I agree to the terms and conditions</Typography>}
              />
            </Stack>

            <Button type="submit" fullWidth className="account-submit-button">
              Register for free
            </Button>

            <div className="account-divider">
              <span></span>
              <span>OR</span>
              <span></span>
            </div>

            <Box
              sx={{
                position: "relative",
                width: "100%",
                display: "block",
                minWidth: 0,
                overflow: "hidden",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0,
                  zIndex: 1,
                  "& > div": { width: "100% !important", height: "100% !important" },
                  "& iframe": { width: "100% !important", height: "100% !important" },
                }}
              >
                <GoogleLogin
                  onSuccess={(res) => res.credential && handleGoogleSuccess(res.credential)}
                  onError={() => {}}
                  useOneTap={false}
                  theme="outlined"
                  size="large"
                  width="100%"
                  text="continue_with"
                  shape="rectangular"
                />
              </Box>
              <Button
                fullWidth
                variant="outlined"
                className="account-oauth-button"
                sx={{ pointerEvents: "none", width: "100%", boxSizing: "border-box" }}
              >
                <img
                  src="/img/brand/google.png"
                  alt="Google"
                  className="account-oauth-icon"
                  style={{ width: "24px", height: "24px", marginRight: "24px" }}
                />
                <span>Continue with Google</span>
              </Button>
            </Box>

            <Button
              type="button"
              fullWidth
              variant="outlined"
              className="account-oauth-button"
            >
              <img 
                src="/img/brand/apple-logo.png" 
                alt="Apple" 
                className="account-oauth-icon"
                style={{ width: "24px", height: "24px", marginRight: "24px" }}
              />
              <span>Continue with Apple</span>
            </Button>
          </form>

          <Box className="account-footer">
            <Typography className="account-helper">
              Already have an account?{" "}
              <Button
                type="button"
                className="account-link-button"
                onClick={() => router.push("/account")}
              >
                Log in
              </Button>
            </Typography>
          </Box>
        </div>
      </div>
    </div>
  );
};

export default withLayoutBasic(AccountSignup);

