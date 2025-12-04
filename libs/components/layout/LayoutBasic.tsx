import { Stack } from "@mui/material";
import Head from "next/head";
import Footer from "../Footer";
import Top from "../Top";

const withLayoutBasic = (Component: any) => {
  return (props: any) => {
    return (
      <>
        <Head>
          <title>Timory</title>
        </Head>
        <Stack id="pc-wrap">
          <Stack id={"top"}>
            <Top />
          </Stack>

          <Stack
            className={`header-basic`}
            style={{
              backgroundSize: "cover",
              boxShadow: "inser 10px 40px 150px 40px rgb(24 22 36)",
            }}
          >
            <Stack className={"container"}>
              <strong>Watchesckjbjbjkbb</strong>
              <span>We are glad to see you again!</span>
            </Stack>
          </Stack>

          <Stack id={"main"}>
            <Component {...props} />
          </Stack>

          <Stack id={"footer"}>
            <Footer />
          </Stack>
        </Stack>
      </>
    );
  };
};

export default withLayoutBasic;