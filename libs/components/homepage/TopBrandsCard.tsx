import { Stack, Box } from "@mui/material";

export type TopBrand = {
  id: number;
  name: string;
  country: string;
  logo: string;
  founded: string;
};

const TopBrandsCard = ({ brand }: { brand: TopBrand }) => {
  return (
    <Stack className="brand-card">
      <Box className="logo-box">
        <img src={brand.logo} alt={brand.name} />
      </Box>
    </Stack>
  );
};

export default TopBrandsCard;





