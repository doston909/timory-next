import { Box, Stack } from "@mui/material";
import Link from "next/link";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { Logout } from "@mui/icons-material";

const Top = () => {
  return (
    <Stack className={"navbar"}>
      <Stack className={"navbar-main"}>
        <Stack className={"container"}>
          <Box component={"div"} className={"logo-boc"}>
            <Link href={"/"}>
              <img src="/img/logo/logoWhite.svg" alt="" />
            </Link>
          </Box>
          <Box component={"div"} className={"router-box"}>
            <Link href={"/"}>
              <div>Home</div>
            </Link>
            <Link href={"/agent"}>
              <div>Shop</div>
            </Link>
             <Link href={"/agent"}>
              <div>Brands</div>
            </Link>
            <Link href={"/property"}>
              <div>Watches</div>
            </Link>
            <Link href={"/agent"}>
              <div>Agents</div>
            </Link>
            <Link href={"/community?articleCategory=FREE"}>
              <div>Community</div>
            </Link>

            <Link href={"/cs"}>
              <div>Pages</div>
            </Link>
          </Box>
          <Box component={"div"} className={"user-box"}>
            <>
              <div className={"login-user"}>
                <img src={"/img/profile/defaultUser.svg"} alt="" />
              </div>

              <Menu id="basic-menu" sx={{ mt: "5px" }} open={false}>
                <MenuItem>
                  <Logout
                    fontSize="small"
                    style={{ color: "blue", marginRight: "10px" }}
                  />
                  Logout
                </MenuItem>
              </Menu>
            </>
          </Box>
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Top;
