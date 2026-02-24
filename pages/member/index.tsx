import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";

const Member: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/mypage");
  }, [router]);
  return null;
};

export default withLayoutBasic(Member);
