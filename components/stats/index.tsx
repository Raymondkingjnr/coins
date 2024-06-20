"use client";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import Image from "next/image";
import { Sparklines, SparklinesLine } from "react-sparklines";
import { numberFormatter } from "@/utils/helpers";

const Stats = () => {
  const { data, error, loading } = useSelector(
    (state: RootState) => state.coins
  );

  if (error) {
    return (
      <p className=" text-center text">
        Opps There was an Error check if you are connected to the internet or
        reload
      </p>
    );
  }

  return (
    <section>
      <div className=" lg:flex hidden px-3 py-10">
        <section className=" w-full h-[400px] bg-gradient-to-t from-gray-950 to-blue-800 rounded-lg">
          <div className="  flex justify-between pt-[4rem] px-16 text-white">
            <h3 className=" text-4xl font-normal w-[600px]">
              Today's Cryptocurrency Prices by Market Cap
            </h3>
            <p className=" w-[450px]">
              Trade more than 500+ cryptocurrency and fiat pairs including
              bitcoin, ethererum and solana
            </p>
            <button className=" btn text-white font-semibold bg-blue-700 rounded-2xl border-transparent">
              start trade now
            </button>
          </div>
          <main className=" text-white px-16 pt-8 flex gap-9 justify-between items-center">
            {data.coins.slice(0, 4).map((coin) => (
              <main
                key={coin.uuid}
                className=" bg-[#202b40] w-[320px] h-[200px] rounded-xl"
              >
                <span className=" flex items-start gap-3 pl-5 pt-4">
                  <Image
                    src={coin.iconUrl}
                    alt=""
                    width={20}
                    height={20}
                    className=" object-contain mt-[0.2rem]"
                  />
                  <p>{coin.name}</p>
                </span>
                <div className=" flex flex-col justify-between items-end">
                  <p
                    className={`${
                      coin?.change?.includes("-")
                        ? "text-red-500"
                        : "text-green-500"
                    } float-right pr-5 `}
                  >
                    {coin?.change}%
                  </p>
                  <Sparklines data={coin?.sparkline} height={100}>
                    <SparklinesLine color="#1e90ff" />
                  </Sparklines>
                </div>
              </main>
            ))}
          </main>
        </section>
      </div>
      <h3 className=" text-left font-bold px-4 pt-5 text-sm md:text-lg flex lg:hidden">
        Today's Cryptocurrency Prices by Market Cap
      </h3>
      <p className="text-left font-normal px-4 py-5 text-xs md:text-base capitalize lg:hidden">
        total market cap: {numberFormatter(data.stats.totalMarketCap)}
      </p>
      <p className=" text-left font-normal px-4 text-xs md:text-base capitalize lg:hidden">
        {" "}
        total 24hour Volume: {numberFormatter(data.stats.total24hVolume)}
      </p>
    </section>
  );
};

42271;

export default Stats;
