import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";

const Protection: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cs");
  }, [router]);
  return null;
};

export default withLayoutBasic(Protection);
