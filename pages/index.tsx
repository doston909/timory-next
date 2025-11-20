import { Box, Container, Stack } from "@mui/material";
import { brown, green } from "@mui/material/colors";

export default function Home() {
  return (
    <>
    <Stack sx={{background: "#81c784"}}>Header</Stack>
      <Container>
        <Stack flexDirection={"column"}>
        <Box>Popular Watches</Box>
        <Box>Top Brands</Box>
        <Box>Top Agents</Box>
        <Box>Top Watches</Box>
        <Box>Events</Box>
        </Stack>
      </Container>
      <Stack sx={{background: "#a1887f"}}>Footer</Stack>
    
    </>
  );
}
