import { Stack, Box, Typography, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { ArrowForward, KeyboardArrowDown } from "@mui/icons-material";
import { NextPage } from "next";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";
import { useTheme } from "@/libs/context/ThemeContext";

interface Notice {
  id: number;
  number: number;
  title: string;
  date: string;
  hasIcon?: boolean;
}

interface FaqItem {
  id: number;
  question: string;
  answer: string;
}

type FaqCategory =
  | "Account"
  | "Order"
  | "Payment"
  | "Shipping"
  | "Returns"
  | "For Dealers"
  | "General";

type CsButtonKey = "notice" | "terms" | "privacy" | "contact" | "faq";

const accountFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Do I need an account to use TIMORY?",
    answer: "No. You can browse watches without creating an account.",
  },
  {
    id: 2,
    question: "What benefits do I get by creating an account?",
    answer:
      "An account allows you to save watches, leave comments, and receive personalized recommendations.",
  },
  {
    id: 3,
    question: "How can I reset my password?",
    answer: "Password reset instructions are available on the login page.",
  },
  {
    id: 4,
    question: "Can I delete my account?",
    answer:
      "Yes. You can request account deletion through the Contact Us page.",
  },
];

const orderFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Can I place orders on TIMORY?",
    answer: "No. TIMORY does not process orders or payments.",
  },
  {
    id: 2,
    question: "Does TIMORY handle payments?",
    answer: "No. All payments are handled by third-party sellers or retailers.",
  },
  {
    id: 3,
    question: "Will I receive an order confirmation from TIMORY?",
    answer: "No. Order confirmations are sent by the seller you purchase from.",
  },
  {
    id: 4,
    question: "Can I track my order through TIMORY?",
    answer:
      "No. Order tracking is managed by the seller or retailer.",
  },
];

const paymentFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Does TIMORY process payments?",
    answer: "No. TIMORY does not process or handle any payments.",
  },
  {
    id: 2,
    question: "Which payment methods are supported on TIMORY?",
    answer:
      "TIMORY does not support payment methods directly. Payments are handled by third-party sellers or retailers.",
  },
  {
    id: 3,
    question: "Is my payment information stored on TIMORY?",
    answer: "No. TIMORY does not collect or store payment information.",
  },
  {
    id: 4,
    question: "Who should I contact for payment-related issues?",
    answer:
      "Please contact the seller or retailer where the payment was made.",
  },
];

const shippingFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Does TIMORY offer shipping services?",
    answer: "No. Shipping is handled by the seller or retailer.",
  },
  {
    id: 2,
    question: "Are shipping costs shown on TIMORY?",
    answer: "Shipping costs are determined by the seller and may vary.",
  },
  {
    id: 3,
    question: "Can I choose shipping options on TIMORY?",
    answer: "No. Shipping options are selected on the seller’s website.",
  },
  {
    id: 4,
    question: "Who should I contact for shipping delays?",
    answer: "Please contact the seller directly regarding shipping issues.",
  },
];

const returnsFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Can I return a product through TIMORY?",
    answer: "No. Returns are managed by the seller or retailer.",
  },
  {
    id: 2,
    question: "Does TIMORY provide refunds?",
    answer: "No. Refund policies are determined by the seller.",
  },
  {
    id: 3,
    question: "Where can I find return policy details?",
    answer: "Return policies are available on the seller’s website.",
  },
  {
    id: 4,
    question: "Who should I contact for return-related issues?",
    answer:
      "Please contact the seller from whom you purchased the product.",
  },
];

const dealerFaqs: FaqItem[] = [
  {
    id: 1,
    question: "Can dealers list their watches on TIMORY?",
    answer: "Listings are currently managed through selected partnerships.",
  },
  {
    id: 2,
    question: "How can a dealer partner with TIMORY?",
    answer: "Dealers can reach out via the Contact Us page.",
  },
  {
    id: 3,
    question: "Is there a fee for dealers to join TIMORY?",
    answer: "Partnership terms are discussed individually.",
  },
  {
    id: 4,
    question: "Does TIMORY promote dealer products?",
    answer:
      "Promotional opportunities may be available through partnerships.",
  },
];

const generalFaqs: FaqItem[] = [
  {
    id: 1,
    question: "What is TIMORY?",
    answer:
      "TIMORY is a digital platform for discovering and comparing watches.",
  },
  {
    id: 2,
    question: "Is TIMORY free to use?",
    answer: "Yes. TIMORY is free, with optional paid features planned.",
  },
  {
    id: 3,
    question: "Does TIMORY sell watches directly?",
    answer: "No. TIMORY does not sell watches.",
  },
  {
    id: 4,
    question: "How does TIMORY protect user data?",
    answer:
      "TIMORY uses standard security measures to protect user data.",
  },
];

const notices: Notice[] = [
  { id: 1, number: 1, title: "New Dealers Added to CarMoa", date: "2025.12.03" },
  { id: 2, number: 2, title: "Return & Exchange Guidelines Updated", date: "2025.12.03" },
  { id: 3, number: 3, title: "Fraud Prevention Notice", date: "2025.12.03" },
  { id: 4, number: 4, title: "Holiday Shipping Schedule", date: "2025.12.03" },
  { id: 5, number: 5, title: "New Feature: QuickView Added", date: "2025.12.03", hasIcon: true },
  { id: 6, number: 6, title: "Payment Processing Update", date: "2025.12.03" },
  { id: 7, number: 7, title: "Dealer Verification Reminder", date: "2025.12.03" },
  { id: 8, number: 8, title: "Delivery Delay Notice (Winter Season)", date: "2025.12.03" },
  { id: 9, number: 9, title: "Scheduled System Maintenance", date: "2025.12.03" },
  { id: 10, number: 10, title: "CarMoa Service Launch Announcement", date: "2025.12.03", hasIcon: true },
];

const CustomerService: NextPage = () => {
  const router = useRouter();
  const { mode } = useTheme();
  const [isDescriptionMode, setIsDescriptionMode] = useState(false);
  const [showNotice, setShowNotice] = useState(true); // Cs ga kirilganda Notice default ochiq
  const [showTerms, setShowTerms] = useState(false);
  const [showPrivacy, setShowPrivacy] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [showFaq, setShowFaq] = useState(false);
  const [activeFaqCategory, setActiveFaqCategory] =
    useState<FaqCategory>("Account");
  const [openFaqItemId, setOpenFaqItemId] = useState<number | null>(null);
  const [activeCsButton, setActiveCsButton] = useState<CsButtonKey | null>("notice");
  const [contactFormKey, setContactFormKey] = useState(0);
  const [contactName, setContactName] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactSubject, setContactSubject] = useState("");
  const [contactMessage, setContactMessage] = useState("");

  // When coming from About page with /cs#cs-contact-section, open Contact tab and scroll
  useEffect(() => {
    if (router.asPath.includes("#cs-contact-section")) {
      setShowNotice(false);
      setShowTerms(false);
      setShowPrivacy(false);
      setShowFaq(false);
      setShowContact(true);
      setActiveCsButton("contact");
    }
  }, [router.asPath]);

  // After Contact section is visible, scroll it into view
  useEffect(() => {
    if (!showContact) return;
    const el = document.getElementById("cs-contact-section");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [showContact]);

  const renderFaqsForCategory = (): FaqItem[] => {
    switch (activeFaqCategory) {
      case "Account":
        return accountFaqs;
      case "Order":
        return orderFaqs;
      case "Payment":
        return paymentFaqs;
      case "Shipping":
        return shippingFaqs;
      case "Returns":
        return returnsFaqs;
      case "For Dealers":
        return dealerFaqs;
      case "General":
        return generalFaqs;
      default:
        return accountFaqs;
    }
  };

  const faqsToRender = renderFaqsForCategory();

  const faqCategories: { key: FaqCategory; label: string; count: number }[] = [
    { key: "Account", label: "Account", count: 4 },
    { key: "Order", label: "Order", count: 4 },
    { key: "Payment", label: "Payment", count: 4 },
    { key: "Shipping", label: "Shipping", count: 4 },
    { key: "Returns", label: "Returns", count: 4 },
    { key: "For Dealers", label: "For Dealers", count: 4 },
    { key: "General", label: "General", count: 4 },
  ];

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"main"}>
          <Stack className="cs-page">
            <Box className="cs-content">
              <Typography className="cs-title">Cs center</Typography>
              <Typography className="cs-subtitle">We will answer your questions</Typography>
              
              <Box
                className={`cs-buttons ${isDescriptionMode ? "description-mode" : ""}`}
                onClick={() => setIsDescriptionMode(!isDescriptionMode)}
                sx={{ cursor: "pointer" }}
              >
                <Button
                  className={`cs-button ${
                    activeCsButton === "notice" ? "cs-button-faq" : "cs-button-notice"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCsButton("notice");
                    setShowNotice((prev) => !prev);
                    setShowTerms(false);
                    setShowPrivacy(false);
                    setShowContact(false);
                    setShowFaq(false);
                  }}
                >
                  {isDescriptionMode ? "Description" : "Notice"}
                </Button>

               
                <Button
                  className={`cs-button ${
                    activeCsButton === "terms" ? "cs-button-faq" : "cs-button-link"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCsButton("terms");
                    setShowTerms((prev) => !prev);
                    setShowNotice(false);
                    setShowPrivacy(false);
                    setShowContact(false);
                    setShowFaq(false);
                  }}
                >
                  {isDescriptionMode ? "Description" : "Terms & Conditions"}
                </Button>
                <Button
                  className={`cs-button ${
                    activeCsButton === "privacy" ? "cs-button-faq" : "cs-button-link"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCsButton("privacy");
                    setShowPrivacy((prev) => !prev);
                    setShowNotice(false);
                    setShowTerms(false);
                    setShowContact(false);
                    setShowFaq(false);
                  }}
                >
                  {isDescriptionMode ? "Description" : "Privacy Policy"}
                </Button>
                 <Button
                  className={`cs-button ${
                    activeCsButton === "contact" ? "cs-button-faq" : "cs-button-link"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCsButton("contact");
                    setShowContact((prev) => !prev);
                    setShowNotice(false);
                    setShowTerms(false);
                    setShowPrivacy(false);
                    setShowFaq(false);
                  }}
                >
                  {isDescriptionMode ? "Description" : "Contact Us"}
                </Button>
                <Button
                  className={`cs-button ${
                    activeCsButton === "faq" ? "cs-button-faq" : "cs-button-link"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveCsButton("faq");
                    setShowFaq((prev) => !prev);
                    setShowNotice(false);
                    setShowTerms(false);
                    setShowPrivacy(false);
                    setShowContact(false);
                    setActiveFaqCategory("Account");
                    setOpenFaqItemId(null);
                  }}
                >
                  {isDescriptionMode ? "Description" : "FAQ"}
                </Button>
              </Box>
            </Box>

            {showNotice && (
              <Box className="cs-notice-section">
                <Typography className="cs-notice-title">Notice</Typography>
                
                <TableContainer component={Paper} className="cs-notice-table-container">
                  <Table className="cs-notice-table">
                    <TableHead>
                      <TableRow className="cs-notice-table-header">
                        <TableCell className="cs-notice-header-cell cs-notice-number-header">Number</TableCell>
                        <TableCell className="cs-notice-header-cell cs-notice-title-header">Title</TableCell>
                        <TableCell className="cs-notice-header-cell cs-notice-date-header">Date</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {notices.map((notice) => (
                        <TableRow key={notice.id} className="cs-notice-table-row">
                          <TableCell className="cs-notice-cell cs-notice-number-cell">{notice.number}</TableCell>
                          <TableCell className="cs-notice-cell cs-notice-title-cell">
                            {notice.title}
                            {notice.hasIcon && <span className="cs-notice-icon"></span>}
                          </TableCell>
                          <TableCell className="cs-notice-cell cs-notice-date-cell">{notice.date}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>
            )}

            {showTerms && (
              <Box className="cs-terms-section">
                <Typography className="cs-terms-title">
                  Terms &amp; Conditions
                </Typography>
                <Typography
                  className="cs-terms-updated"
                  sx={{
                    fontSize: 15,
                    ...(mode === "dark" && { color: "green" }),
                  }}
                >
                  Last Updated: February 2026
                </Typography>

                <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                  Welcome to TIMORY. By accessing or using the TIMORY platform (the
                  &ldquo;Platform&rdquo;), you agree to comply with and be bound by
                  these Terms &amp; Conditions (&ldquo;Terms&rdquo;). If you do not
                  agree to these Terms, please do not use the Platform.
                </Typography>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    1. Definitions
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    <strong>&ldquo;Platform&rdquo;</strong> refers to the TIMORY
                    website and related services.
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    <strong>&ldquo;User&rdquo;</strong> refers to any individual who
                    accesses or uses the Platform.
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    <strong>&ldquo;Content&rdquo;</strong> refers to all text,
                    images, data, designs, and other materials displayed on the
                    Platform.
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    <strong>&ldquo;Services&rdquo;</strong> refers to features and
                    functionalities provided by TIMORY.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    2. Eligibility
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    You must be at least 13 years old to use the Platform. By using
                    TIMORY, you confirm that you meet this requirement and that your
                    use complies with applicable laws and regulations.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    3. Use of the Platform
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    Users agree to use the Platform only for lawful purposes. You
                    agree not to:
                  </Typography>
                  <ul className="cs-terms-list">
                    <li>Use the Platform for illegal or unauthorized activities</li>
                    <li>
                      Post or share abusive, misleading, or harmful content
                    </li>
                    <li>
                      Attempt to interfere with the Platform’s security or
                      functionality
                    </li>
                  </ul>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY reserves the right to restrict or terminate access for
                    violations of these Terms.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    4. User Accounts
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    Some features may require account registration. You are
                    responsible for:
                  </Typography>
                  <ul className="cs-terms-list">
                    <li>Providing accurate information</li>
                    <li>Maintaining the confidentiality of your account</li>
                    <li>All activities conducted under your account</li>
                  </ul>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY may suspend or terminate accounts that violate these
                    Terms.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    5. Content and Intellectual Property
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    All content on the Platform, including logos, designs, text, and
                    software, is the property of TIMORY or its licensors and is
                    protected by intellectual property laws.
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    You may not copy, reproduce, modify, distribute, or use any
                    content without prior written permission.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    6. Third-Party Links
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    The Platform may contain links to third-party websites. TIMORY
                    is not responsible for the content, accuracy, or practices of
                    third-party services and does not endorse them.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    7. Disclaimer
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    The Platform and its content are provided &ldquo;as is&rdquo; and
                    &ldquo;as available.&rdquo; TIMORY makes no warranties regarding
                    accuracy, reliability, or availability of the content or
                    services.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    8. Limitation of Liability
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    To the fullest extent permitted by law, TIMORY shall not be
                    liable for any indirect, incidental, or consequential damages
                    arising from the use of or inability to use the Platform.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    9. Termination
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY reserves the right to suspend or terminate access to the
                    Platform at any time, without prior notice, if these Terms are
                    violated.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    10. Privacy
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    Your use of the Platform is also governed by our Privacy Policy,
                    which explains how we collect and protect your personal
                    information.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    11. Changes to These Terms
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY may update these Terms from time to time. Continued use
                    of the Platform after changes are posted constitutes acceptance
                    of the updated Terms.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    12. Governing Law
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    These Terms shall be governed by and interpreted in accordance
                    with the laws of the Republic of Korea, without regard to
                    conflict of law principles.
                  </Typography>
                </Box>

                <Box className="cs-terms-section-block">
                  <Typography className="cs-terms-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    13. Contact Information
                  </Typography>
                  <Typography className="cs-terms-paragraph" sx={{ fontSize: 20 }}>
                    If you have any questions regarding these Terms, please contact
                    us via the Contact Us page on the Platform.
                  </Typography>
                </Box>
              </Box>
            )}

            {showPrivacy && (
              <Box className="cs-privacy-section">
                <Typography className="cs-privacy-title">
                  Privacy Policy
                </Typography>
                <Typography className="cs-privacy-updated" sx={{ fontSize: 15 }}>
                  Last Updated: February 2026
                </Typography>

                <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                  TIMORY (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) respects your privacy and is committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard information when you use the TIMORY platform (the &ldquo;Platform&rdquo;).
                </Typography>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    1. Information We Collect
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We may collect the following types of information:
                  </Typography>
                  <ul className="cs-privacy-list">
                    <li>
                      <strong>Personal Information:</strong> such as name and email address when you create an account or contact us
                    </li>
                    <li>
                      <strong>Usage Information:</strong> such as pages visited, interactions, device type, and browser information
                    </li>
                  </ul>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    2. How We Use Information
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We use collected information to:
                  </Typography>
                  <ul className="cs-privacy-list">
                    <li>Provide and operate the Platform</li>
                    <li>Improve platform functionality and user experience</li>
                    <li>Respond to inquiries and provide customer support</li>
                  </ul>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    3. Cookies
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY may use cookies and similar technologies to:
                  </Typography>
                  <ul className="cs-privacy-list">
                    <li>Maintain user sessions</li>
                    <li>Analyze platform usage</li>
                  </ul>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    You can control cookie preferences through your browser settings.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    4. Sharing of Information
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We do not sell or rent personal information to third parties.
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    Information may be shared only when necessary to operate the Platform, such as with analytics or hosting service providers.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    5. Data Security
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We take reasonable technical and organizational measures to protect user information. However, no method of transmission or storage is completely secure, and we cannot guarantee absolute security.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    6. Data Retention
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We retain personal information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, unless a longer retention period is required by law.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    7. Children&rsquo;s Privacy
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    TIMORY is not intended for children under the age of 13. We do not knowingly collect personal information from children.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    8. Changes to This Policy
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated revision date.
                  </Typography>
                </Box>

                <Box className="cs-privacy-section-block">
                  <Typography className="cs-privacy-section-title" sx={{ fontSize: 22, fontWeight: 700 }}>
                    9. Contact Us
                  </Typography>
                  <Typography className="cs-privacy-paragraph" sx={{ fontSize: 20 }}>
                    If you have any questions about this Privacy Policy, please contact us through the Contact Us page on the Platform.
                  </Typography>
                </Box>
              </Box>
            )}

            {showContact && (
              <Box id="cs-contact-section" className="cs-contact-section">
                <Typography className="cs-contact-title">
                  Contact Us
                </Typography>

                <Box className="cs-contact-container">
                  <Box key={contactFormKey} className="cs-contact-form">
                    <Typography className="cs-contact-form-title" >
                      Tell Us Your Message
                    </Typography>

                    <Box className="cs-contact-form-group">
                      <Typography className="cs-contact-label">
                        Your Name <span className="cs-contact-required">*</span>
                      </Typography>
                      <input
                        className="cs-contact-input"
                        type="text"
                        placeholder="Full Name..."
                        value={contactName}
                        onChange={(e) => setContactName(e.target.value)}
                      />
                    </Box>

                    <Box className="cs-contact-form-group">
                      <Typography className="cs-contact-label">
                        Your Email <span className="cs-contact-required">*</span>
                      </Typography>
                      <input
                        className="cs-contact-input"
                        type="email"
                        placeholder="Email Address..."
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                      />
                    </Box>

                    <Box className="cs-contact-form-group">
                      <Typography className="cs-contact-label">
                        Subject
                      </Typography>
                      <input
                        className="cs-contact-input"
                        type="text"
                        placeholder="Subject..."
                        value={contactSubject}
                        onChange={(e) => setContactSubject(e.target.value)}
                      />
                    </Box>

                    <Box className="cs-contact-form-group">
                      <Typography className="cs-contact-label">
                        Your Message
                      </Typography>
                      <textarea
                        className="cs-contact-textarea"
                        placeholder="Message..."
                        value={contactMessage}
                        onChange={(e) => setContactMessage(e.target.value)}
                      />
                    </Box>

                    <Button
                      className="cs-contact-submit"
                      onClick={() => {
                        setContactName("");
                        setContactEmail("");
                        setContactSubject("");
                        setContactMessage("");
                        setContactFormKey((k) => k + 1);
                      }}
                    >
                      Send Message
                      <ArrowForward className="cs-contact-submit-icon" />
                    </Button>
                  </Box>

                  <Box className="cs-contact-info">
                    <Typography className="cs-contact-info-title">
                      Contact Us
                    </Typography>
                    <Typography className="cs-contact-info-text">
                      We&rsquo;re here to help.
                     
                      <br />
                      If you have any questions, feedback, or suggestions regarding the TIMORY platform, please feel free to reach out to us. Our team is always open to hearing from you and improving your experience.
                      <br />
                      
                      Please fill out the contact form below with your details and message.
                      We will review your request and get back to you as soon as possible.
                      <br />
                      Thank you for using TIMORY.
                    </Typography>

                    <Box className="cs-contact-info-block">
                      <Typography className="cs-contact-info-heading">
                        <span className="cs-contact-info-icon"></span>
                        Address:
                      </Typography>
                      <Typography className="cs-contact-info-line">
                        29 Banryong-ro 28beongil, Buk-gu, Gwangju, South Korea
                      </Typography>
                    </Box>

                    <Box className="cs-contact-info-block">
                      <Typography className="cs-contact-info-heading">
                        <span className="cs-contact-info-icon"></span>
                        Phone:
                      </Typography>
                      <Typography className="cs-contact-info-line">
                        Mobile: 010-7640-9293
                      </Typography>
                    </Box>

                    <Box className="cs-contact-info-block">
                      <Typography className="cs-contact-info-heading">
                        <span className="cs-contact-info-icon"></span>
                        Email:
                      </Typography>
                      <Typography className="cs-contact-info-line">
                        ahmadalievd382@gmail.com
                      </Typography>
                      <Typography className="cs-contact-info-line">
                        ahmadalievd384@gmail.com
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>
            )}

            {showFaq && (
              <Box className="faq-page">
                <Typography className="faq-title">
                  FAQ
                </Typography>

                <Box className="faq-tabs">
                  {faqCategories.map((cat) => (
                    <button
                      key={cat.key}
                      className={`faq-tab ${
                        activeFaqCategory === cat.key ? "active" : ""
                      }`}
                      onClick={() => {
                        setActiveFaqCategory(cat.key);
                        setOpenFaqItemId(null);
                      }}
                    >
                      <span className="faq-tab-label">{cat.label}</span>
                      <span className="faq-tab-count">({cat.count})</span>
                    </button>
                  ))}
                </Box>

                <Box className="faq-list">
                  {faqsToRender.map((faq) => {
                    const isOpen = openFaqItemId === faq.id;
                    return (
                      <Box
                        key={faq.id}
                        className={`faq-item ${isOpen ? "open" : ""}`}
                        onClick={() =>
                          setOpenFaqItemId((prev) =>
                            prev === faq.id ? null : faq.id
                          )
                        }
                      >
                        <Box className="faq-item-main">
                          <Box className="faq-icon-box">
                            <span className="faq-icon-letter">Q</span>
                          </Box>
                          <Typography className="faq-question">
                            {faq.question}
                          </Typography>
                          <span className="faq-toggle-icon">
                            <KeyboardArrowDown
                              className={`faq-toggle-arrow ${
                                isOpen ? "open" : ""
                              }`}
                            />
                          </span>
                        </Box>
                        <Typography
                          className={`faq-answer ${isOpen ? "open" : ""}`}
                        >
                          <Box className="faq-icon-boxs">
                            <span className="faq-icon-letters">A</span>
                          </Box>
                          <span className="faq-answer-text">{faq.answer}</span>
                        </Typography>
                      </Box>
                    );
                  })}
                </Box>
              </Box>
            )}
          </Stack>
        </Stack>

        <Stack id={"footer"}>
          <Footer />
        </Stack>
      </Stack>
    </>
  );
};

export default withLayoutBasic(CustomerService);

