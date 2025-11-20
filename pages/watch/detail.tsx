import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Container, Stack } from "@mui/material";

const WatchDetail = () => {
  return (
    <>
      <Stack sx={{ background: "#81c784" }}>Header Basic</Stack>
      <Container>WATCH DETAIL</Container>
      <Stack sx={{ background: "#a1887f" }}>Footer Basic</Stack>
    </>
  );
};

export default withLayoutBasic(WatchDetail);