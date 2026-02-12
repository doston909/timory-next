import { Stack, Box, Typography } from "@mui/material";
import { NextPage } from "next";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";

const TermsPage: NextPage = () => {
  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"main"}>
          <Stack className="terms-page">
            <Box className="terms-content">
              <Typography className="terms-title">Terms &amp; Conditions</Typography>
              <Typography className="terms-updated">
                Last Updated: February 2026
              </Typography>

              <Typography className="terms-intro">
                Welcome to TIMORY. By accessing or using the TIMORY platform (the
                &ldquo;Platform&rdquo;), you agree to comply with and be bound by these
                Terms &amp; Conditions (&ldquo;Terms&rdquo;). If you do not agree to
                these Terms, please do not use the Platform.
              </Typography>

              <Box className="terms-section">
                <Typography className="terms-section-title">1. Definitions</Typography>
                <Typography className="terms-paragraph">
                  <strong>&ldquo;Platform&rdquo;</strong> refers to the TIMORY website
                  and related services.
                </Typography>
                <Typography className="terms-paragraph">
                  <strong>&ldquo;User&rdquo;</strong> refers to any individual who
                  accesses or uses the Platform.
                </Typography>
                <Typography className="terms-paragraph">
                  <strong>&ldquo;Content&rdquo;</strong> refers to all text, images,
                  data, designs, and other materials displayed on the Platform.
                </Typography>
                <Typography className="terms-paragraph">
                  <strong>&ldquo;Services&rdquo;</strong> refers to features and
                  functionalities provided by TIMORY.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">2. Eligibility</Typography>
                <Typography className="terms-paragraph">
                  You must be at least 13 years old to use the Platform. By using
                  TIMORY, you confirm that you meet this requirement and that your use
                  complies with applicable laws and regulations.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  3. Use of the Platform
                </Typography>
                <Typography className="terms-paragraph">
                  Users agree to use the Platform only for lawful purposes. You agree
                  not to:
                </Typography>
                <ul className="terms-list">
                  <li>
                    Use the Platform for illegal or unauthorized activities
                  </li>
                  <li>
                    Post or share abusive, misleading, or harmful content
                  </li>
                  <li>
                    Attempt to interfere with the Platform’s security or functionality
                  </li>
                </ul>
                <Typography className="terms-paragraph">
                  TIMORY reserves the right to restrict or terminate access for
                  violations of these Terms.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">4. User Accounts</Typography>
                <Typography className="terms-paragraph">
                  Some features may require account registration. You are responsible
                  for:
                </Typography>
                <ul className="terms-list">
                  <li>Providing accurate information</li>
                  <li>Maintaining the confidentiality of your account</li>
                  <li>All activities conducted under your account</li>
                </ul>
                <Typography className="terms-paragraph">
                  TIMORY may suspend or terminate accounts that violate these Terms.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  5. Content and Intellectual Property
                </Typography>
                <Typography className="terms-paragraph">
                  All content on the Platform, including logos, designs, text, and
                  software, is the property of TIMORY or its licensors and is protected
                  by intellectual property laws.
                </Typography>
                <Typography className="terms-paragraph">
                  You may not copy, reproduce, modify, distribute, or use any content
                  without prior written permission.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  6. Third-Party Links
                </Typography>
                <Typography className="terms-paragraph">
                  The Platform may contain links to third-party websites. TIMORY is not
                  responsible for the content, accuracy, or practices of third-party
                  services and does not endorse them.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">7. Disclaimer</Typography>
                <Typography className="terms-paragraph">
                  The Platform and its content are provided &ldquo;as is&rdquo; and
                  &ldquo;as available.&rdquo; TIMORY makes no warranties regarding
                  accuracy, reliability, or availability of the content or services.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  8. Limitation of Liability
                </Typography>
                <Typography className="terms-paragraph">
                  To the fullest extent permitted by law, TIMORY shall not be liable for
                  any indirect, incidental, or consequential damages arising from the
                  use of or inability to use the Platform.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">9. Termination</Typography>
                <Typography className="terms-paragraph">
                  TIMORY reserves the right to suspend or terminate access to the
                  Platform at any time, without prior notice, if these Terms are
                  violated.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">10. Privacy</Typography>
                <Typography className="terms-paragraph">
                  Your use of the Platform is also governed by our Privacy Policy,
                  which explains how we collect and protect your personal information.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  11. Changes to These Terms
                </Typography>
                <Typography className="terms-paragraph">
                  TIMORY may update these Terms from time to time. Continued use of the
                  Platform after changes are posted constitutes acceptance of the
                  updated Terms.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  12. Governing Law
                </Typography>
                <Typography className="terms-paragraph">
                  These Terms shall be governed by and interpreted in accordance with
                  the laws of the Republic of Korea, without regard to conflict of law
                  principles.
                </Typography>
              </Box>

              <Box className="terms-section">
                <Typography className="terms-section-title">
                  13. Contact Information
                </Typography>
                <Typography className="terms-paragraph">
                  If you have any questions regarding these Terms, please contact us via
                  the Contact Us page on the Platform.
                </Typography>
              </Box>
            </Box>
          </Stack>
        </Stack>

        <Stack id={"footer"}>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(TermsPage);




