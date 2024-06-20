"use client";
import React, { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { fetchSingleCoin, fetchOHLC } from "@/redux/service/coins";
import Image from "next/image";
import { BiSolidUpArrow } from "react-icons/bi";
import { formatAmount, formatCurrency } from "@/utils/helpers";
import { CiCircleInfo } from "react-icons/ci";
import { MdVerified } from "react-icons/md";
import { FaLink } from "react-icons/fa6";
import ApexChartComponent from "@/components/ApexChartContainer";

interface ISinglecoin {
  params: { singleCoin: ISinglecoin[] };
}

const SingleCoins: FC<ISinglecoin> = ({
  params: {
    singleCoin: [uuid],
  },
}) => {
  const dispatch = useDispatch();
  const { loading, ohlcData, singleCoinData, error } = useSelector(
    (state: RootState) => state.coins
  );

  useEffect(() => {
    dispatch(fetchSingleCoin(uuid));
    dispatch(fetchOHLC(uuid));
  }, [dispatch, uuid]);

  const formattedOhlcData =
    ohlcData?.map((item) => ({
      x: new Date(item.startingAt * 1000).getTime(), // Format the date as needed
      y: [item?.open, item?.high, item?.low, item?.close],
    })) || [];

  console.log(singleCoinData);

  return (
    <main className=" w-full flex flex-col gap-4 lg:flex-row">
      <section className=" px-[1rem]   my-7 py-7  lg:w-[30%] w-full">
        <div className="  pb-5">
          <span className=" pb-3 flex items-center justify-between gap-4">
            <Image
              src={singleCoinData?.iconUrl}
              alt={singleCoinData?.name}
              width={30}
              height={30}
              className="mt-3"
            />
            <h3 className=" font-semibold text-lg">{singleCoinData?.name}</h3>
          </span>
          <main className=" flex pt-3 justify-between gap-3 items-center">
            <p
              className={`${
                singleCoinData?.change?.includes("-")
                  ? "text-red-500"
                  : "text-green-500"
              } float-right`}
            >
              {singleCoinData?.change}%
            </p>
            <p className=" font-bold text-base">
              {formatCurrency(singleCoinData?.price)}
            </p>
          </main>
          <main className=" flex justify-between items-center pt-3">
            <p className="font-bold text-base flex items-center gap-1">
              ATH <BiSolidUpArrow className=" text-green-700" />
            </p>
            <p className="font-bold text-base">
              {formatCurrency(singleCoinData?.allTimeHigh?.price)}
            </p>
          </main>
        </div>
        <div className=" flex flex-col gap-6  pt-6">
          <main className=" flex justify-between items-center gap-7">
            <span className="font-bold text-[12px] pt-2 flex items-center gap-2">
              Market Cap <CiCircleInfo />
            </span>
            <span className="font-bold text-[12px] pt-2 text-right">
              {formatAmount(singleCoinData?.marketCap)}
            </span>{" "}
          </main>
          <main className=" flex justify-between items-center gap-7 ">
            <span className="font-bold text-[12px] pt-2 flex items-center gap-2">
              24hour volume <CiCircleInfo />
            </span>
            <span className="font-bold text-[12px] pt-2 text-right">
              {formatAmount(`${singleCoinData ? ["24hVolume"] : ""}`)}
            </span>
          </main>
          <main className="  flex justify-between items-center gap-7  ">
            <span className="font-bold text-[12px] pt-2 flex items-center gap-2">
              Circulation Supply <CiCircleInfo />{" "}
              <MdVerified className=" text-green-700" />
            </span>
            <span className="font-bold text-[12px] pt-2 text-right">
              {" "}
              {formatAmount(singleCoinData?.supply?.circulating)}{" "}
              {singleCoinData?.symbol}
            </span>
          </main>
          <main className="  flex justify-between items-center gap-7  ">
            <p className="font-bold text-[12px] pt-2 flex items-center gap-2">
              Total Supply <CiCircleInfo />
            </p>
            <p className="font-bold text-[12px] pt-2 text-right ">
              {" "}
              {formatAmount(singleCoinData?.supply?.total)}
            </p>
          </main>
        </div>
        <main className=" pt-10">
          <p className=" font-semibold text-base leading-7 tracking-normal text-gray-300">
            Offical Links
          </p>
          <aside className=" flex flex-wrap gap-3 mt-3">
            {singleCoinData?.links?.map((item: any) => (
              <div className=" grid place-content-center place-items-center px-1 py-1 w-fit  bg-gray-700 rounded">
                <a
                  href={item?.url}
                  target="_blank"
                  className=" flex  items-center gap-1 "
                >
                  <p className="text-[8px] text-gray-50 capitalize">
                    {item?.type}{" "}
                  </p>{" "}
                  <FaLink className=" text-gray-50 text-[8px]" />
                </a>
              </div>
            ))}
          </aside>
        </main>
      </section>
      <ApexChartComponent ohlcData={formattedOhlcData} />
    </main>
  );
};

export default SingleCoins;
