import React from "react";
import DetailModule from "@/modules/Detail";
import { useRouter } from "next/router";
const Detail = () => {
  const router = useRouter();
  const { pid } = router.query;
  return <DetailModule pid={pid} />;
};

export default Detail;

