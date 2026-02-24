import { NextPage } from "next";
import { useEffect } from "react";
import { useRouter } from "next/router";
import withLayoutBasic from "@/libs/components/layout/LayoutBasic";

const CsPrivacy: NextPage = () => {
  const router = useRouter();
  useEffect(() => {
    router.replace("/cs#privacy");
  }, [router]);
  return null;
};

export default withLayoutBasic(CsPrivacy);
