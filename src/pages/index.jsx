import Head from "next/head";
import Login from "./Login.jsx";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function Index() {
  return (
    <>
      <Login />
    </>
  );
}

