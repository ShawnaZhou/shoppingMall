import Head from "next/head";
import Image from "next/image";
import Home from "./home.jsx";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Home />
    </>
  );
}

