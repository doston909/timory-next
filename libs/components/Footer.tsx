import Link from "next/link";
import { Box, Stack } from "@mui/material";
import { useTranslation } from "@/libs/context/useTranslation";
import FacebookIcon from "@mui/icons-material/Facebook";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import AndroidIcon from "@mui/icons-material/Android";
import AppleIcon from "@mui/icons-material/Apple";

const Footer = () => {
  const { t } = useTranslation();
  return (
    <Stack className="footer-wrap">
      <Box className="footer-box footer-box--top">
        <Stack direction="row" className="footer-row">
          <Box className="footer-col footer-col--logo">
            <img src="/img/logo/logoo.png" alt="Logo" className="footer-col-logo" />
          </Box>
          <Box className="footer-col footer-col--tagline"> {t("footer.tagline")}</Box>
          <Box className="footer-col footer-col--social">
            <Box className="footer-social">
              <Box className="footer-social-icon" component="a" href="#" aria-label="Facebook">
                <img src="/img/logo/facebook.png" alt="Facebook" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
              <Box className="footer-social-icon" component="a" href="#" aria-label="LinkedIn">
                <img src="/img/logo/linkedin.png" alt="LinkedIn" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
              <Box className="footer-social-icon" component="a" href="#" aria-label="Instagram">
               <img src="/img/logo/instagram.png" alt="Instagram" style={{ width: "110%", height: "110%", objectFit: "contain" }} />
              </Box>
              <Box className="footer-social-icon" component="a" href="#" aria-label="Telegram">
                <img src="/img/logo/telegram.png" alt="Telegram" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
              </Box>
            </Box>
          </Box>
        </Stack>
      </Box>
      <Box className="footer-box footer-box--middle">
        <Stack direction="row" className="footer-row">
          <Box className="footer-col footer-col--company">
            <Stack className="footer-col-list footer-col-list--company" direction="column" spacing={1}>
              <Box component="span" className="footer-col-list-title">{t("footer.company")}</Box>
              <Link href="/watch" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.watches")}</Link>
              <Link href="/community" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.community")}</Link>
              <Link href="/about" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.aboutUs")}</Link>
              <Link href="/cs" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.cs")}</Link>
            </Stack>
          </Box>
          <Box className="footer-col footer-col--support">
            <Stack className="footer-col-list footer-col-list--support" direction="column" spacing={1}>
              <Box component="span" className="footer-col-list-title">{t("footer.support")}</Box>
              <Link href="/cs#notice" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.notice")}</Link>
              <Link href="/cs#terms" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.termsConditions")}</Link>
              <Link href="/cs#privacy" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.privacyPolicy")}</Link>
              <Link href="/cs#cs-contact-section" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.contactUs")}</Link>
              <Link href="/cs#faq" className="footer-col-list-item" style={{ textDecoration: "none" }}>{t("footer.faq")}</Link>
            </Stack>
          </Box>
          <Box className="footer-col">
            <Stack className="footer-col-list footer-col-list--contact" direction="column" spacing={1}>
              <Box component="span" className="footer-col-list-title">{t("footer.contact")}</Box>
              <Box component="span" className="footer-col-list-item footer-col-list-item--no-hover">Email: timoryapp@gmail.com </Box>
              <Box component="span" className="footer-col-list-item footer-col-list-item--no-hover">Phone: +82 (010) 7640-9293</Box>
            </Stack>
          </Box>
          <Box className="footer-col">
            <Stack className="footer-app" direction="column" spacing={2}>
              <Box component="span" className="footer-col-list-title">
                {t("footer.downloadApp")}
              </Box>
              <Stack className="footer-app-buttons" direction="column" spacing={1.5}>
              <Box
                className="footer-app-button footer-app-button--play"
                component="a"
                href="https://play.google.com/store/apps"
                target="_blank"
                rel="noopener noreferrer"
              >
                  <Box className="footer-app-icon footer-app-icon--play">
                    <img src="/img/logo/playstore.png" alt="Google Play" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </Box>
                  <Box className="footer-app-text">
                    <span className="footer-app-text-small">{t("footer.getItOn")}</span>
                    <span className="footer-app-text-main">{t("footer.googlePlay")}</span>
                  </Box>
                </Box>
                <Box
                  className="footer-app-button footer-app-button--store"
                  component="a"
                  href="https://www.apple.com/app-store/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Box className="footer-app-icon footer-app-icon--store">
                    <img src="/img/logo/app-store.png" alt="App Store" style={{ width: "100%", height: "100%", objectFit: "contain" }} />
                  </Box>
                  <Box className="footer-app-text">
                    <span className="footer-app-text-small">{t("footer.downloadOn")}</span>
                    <span className="footer-app-text-main">{t("footer.appStore")}</span>
                  </Box>
                </Box>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Box>
      <Box className="footer-box footer-box--compact">
        <Stack direction="row" className="footer-row">
          <Box className="footer-col">
            <Stack className="footer-owned-row" direction="row" spacing={1}>
              <Box component="span"><span className="footer-owned-brand"><span className="footer-owned-symbol">&copy;</span> TIMORY</span> <span className="footer-owned-by">{t("footer.ownedBy")}</span></Box>
              <Box component="span" className="footer-owned-name">Ahmadaliev Dostonbek</Box>
            </Stack>
          </Box>
          <Box className="footer-col footer-col--copyright"><span className="footer-copyright-symbol">&copy;</span> {t("footer.copyright")}</Box>
        </Stack>
      </Box>
    </Stack>
  );
};

export default Footer;
