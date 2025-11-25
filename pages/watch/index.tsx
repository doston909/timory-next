import withLayoutBasic from "@/libs/components/layout/LayoutBasic";
import { Stack } from "@mui/material";
import {NextPage} from "next";

const WatchList: NextPage = () => {
  return (
   <div style={{ margin: "20px 0" }}>
    <Stack className={"container"}>WATCH LIST</Stack>
   </div>
  );
};

export default withLayoutBasic(WatchList);
