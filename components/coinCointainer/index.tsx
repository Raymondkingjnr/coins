"use client";
import { RootState } from "@/redux/store";
import React from "react";
import { useSelector } from "react-redux";
import CoinTable from "./component/coinTable";

const CoinCointainer = () => {
  const { data } = useSelector((state: RootState) => state.coins);

  return (
    <React.Fragment>
      <CoinTable coins={data?.coins} />
    </React.Fragment>
  );
};

export default CoinCointainer;
