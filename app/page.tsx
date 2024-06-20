"use client";

import CoinCointainer from "@/components/coinCointainer";
import { RootState } from "@/redux/store";
import Stats from "@/components/stats";
import { useSelector } from "react-redux";

export default function Home() {
  const { error } = useSelector((state: RootState) => state.coins);
  if (error) {
    throw new Error(
      "There was error retriving this webpage try again in a few minutes"
    );
  }
  return (
    <main>
      <Stats />
      <CoinCointainer />
    </main>
  );
}
