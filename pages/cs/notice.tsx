import { Stack, Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import { NextPage } from "next";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import Footer from "@/libs/components/Footer";

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
                        <TableCell className="notice-cell notice-number-cell">{notice.number}</TableCell>
                        <TableCell className="notice-cell notice-title-cell">
                          {notice.title}
                          {notice.hasIcon && <span className="notice-icon">🔧</span>}
                        </TableCell>
                        <TableCell className="notice-cell notice-date-cell">{notice.date}</TableCell>
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


