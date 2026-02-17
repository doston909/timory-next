import { useEffect } from "react";
import { Stack, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { NextPage } from "next";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";
import { useTheme } from "@/libs/context/ThemeContext";

const NOTICE_DARK_STYLE_ID = "notice-table-dark-text";

interface Notice {
  id: number;
  number: number;
  title: string;
  date: string;
  hasIcon?: boolean;
}

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

const NoticePage: NextPage = () => {
  const { mode } = useTheme();
  const isDark = mode === "dark";
  const whiteStyle = isDark ? { color: "#fff" } : undefined;

  useEffect(() => {
    const isDarkMode =
      document.documentElement.classList.contains("theme-dark");
    if (!isDarkMode) {
      const el = document.getElementById(NOTICE_DARK_STYLE_ID);
      if (el) el.remove();
      return;
    }
    const css = `.notice-page .notice-content .notice-table-container,
.notice-page .notice-content .notice-table-container * { color: #fff !important; }`;
    let el = document.getElementById(NOTICE_DARK_STYLE_ID);
    if (!el) {
      el = document.createElement("style");
      el.id = NOTICE_DARK_STYLE_ID;
      document.body.appendChild(el);
    }
    el.textContent = css;
    return () => {
      document.getElementById(NOTICE_DARK_STYLE_ID)?.remove();
    };
  }, [mode]);

  return (
    <>
      <Stack id="pc-wrap">
        <Stack id={"main"}>
          <Stack className="notice-page">
            <Box className="notice-content">
              <Typography className="notice-title">Notice</Typography>
              
              <TableContainer component={Paper} className="notice-table-container">
                <Table className="notice-table">
                  <TableHead>
                    <TableRow className="notice-table-header">
                      <TableCell className="notice-header-cell notice-number-header">Number</TableCell>
                      <TableCell className="notice-header-cell notice-title-header">Title</TableCell>
                      <TableCell className="notice-header-cell notice-date-header">Date</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {notices.map((notice) => (
                      <TableRow key={notice.id} className="notice-table-row">
                        <TableCell className="notice-cell notice-number-cell">
                          <span style={whiteStyle}>{notice.number}</span>
                        </TableCell>
                        <TableCell className="notice-cell notice-title-cell">
                          <span style={whiteStyle}>
                            {notice.title}
                            {notice.hasIcon && <span className="notice-icon">🔧</span>}
                          </span>
                        </TableCell>
                        <TableCell className="notice-cell notice-date-cell">
                          <span style={whiteStyle}>{notice.date}</span>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
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

export default withLayoutBasic(NoticePage);



