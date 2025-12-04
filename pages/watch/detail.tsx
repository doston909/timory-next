import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import useDeviceDetect from "@/libs/hooks/useDeviceDetect";
import { Container, Stack } from "@mui/material";

const WatchDetail = () => {
  const device = useDeviceDetect();

  if (device === "mobile") {
    return <Stack>WATCH DETAIL MOBILE</Stack>;
  } else {
    return <Container>WATCH DETAIL</Container>;
  }
};

export default withLayoutBasic(WatchDetail);
