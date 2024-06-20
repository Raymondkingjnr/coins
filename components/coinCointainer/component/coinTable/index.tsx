import { Icoins } from "@/redux/service/interface";
import { formatCurrency } from "@/utils/helpers";
import Image from "next/image";
import { fetchCoins } from "@/redux/service/coins";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { Table } from "antd";
import { useEffect, useMemo, useState } from "react";
import { setQuery, setTags, setTime } from "@/redux/service/coins";
import { tagsfilter, TimeFilter } from "../data";
import { useRouter } from "next/navigation";
import { Sparklines, SparklinesLine } from "react-sparklines";

interface IconsProps {
  coins: Icoins[];
}

const CoinTable = ({ coins }: IconsProps) => {
  const { loading, search, tags, limit, offset, timeFrame } = useSelector(
    (state: RootState) => state.coins
  );
  const { push } = useRouter();
  const dispatch = useDispatch();
  const [activeTime, setActiveTime] = useState("");
  const [activeTag, setActiveTag] = useState("");
  const [searchPrompt, setSearchPrompt] = useState(search);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [search, tags, offset, limit, timeFrame, dispatch]);

  const handleSearch = (event: any) => {
    setSearchPrompt(event.target.value);
    dispatch(setQuery(event.target.value));
  };

  const handleTagType = (type: string) => {
    dispatch(setTags(type));
    setActiveTag(type);
  };

  const handelTimeFilter = (type: string) => {
    dispatch(setTime(type));
    setActiveTime(type);
  };

  const handleViewCoin = (coinId: string) => {
    push(`/coins/${coinId}`);
  };

  interface ITableAction {
    key: number;
    rank: number;
    name: string;
    iconUrl: string;
    price: string;
    marketCap: string;
    volume: string;
    action: string;
  }
  const tableData = useMemo(() => {
    return (
      coins?.map((coin, index) => {
        let key = index + 1;

        return {
          key: key,
          rank: coin?.rank,
          name: coin?.name,
          iconUrl: coin?.iconUrl,
          price: formatCurrency(coin?.price),
          marketCap: formatCurrency(coin?.marketCap),
          volume: formatCurrency(coin["24hVolume"]),
          action: coin?.uuid,
          sparkLineData: coin?.sparkline,
          change: coin?.change,
        };
      }) ?? []
    );
  }, [coins]);

  //

  const columns = [
    {
      title: "Rank",
      dataIndex: "rank",
      render: (rank: string) => (
        <p className=" font-medium text-xs md:text-base">{rank}</p>
      ),
    },
    {
      title: "Coin",
      dataIndex: "name",

      render: (name: string, content: ITableAction) => (
        <div className=" flex items-center gap-3 ">
          <div>
            <Image src={content.iconUrl} alt="" width={25} height={25} />
          </div>
          <div>
            <p className=" overflow-hidden whitespace-nowrap text-ellipsis  md:text-base">
              {name}
            </p>
          </div>
        </div>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price: string) => (
        <p className=" font-mediumtext-xs md:text-base">{price}</p>
      ),
    },
    {
      title: "Market Cap",
      dataIndex: "marketCap",
      render: (marketCap: string) => (
        <p className=" font-medium text-xs md:text-base">{marketCap}</p>
      ),
    },
    {
      title: "2hr",
      dataIndex: "change",
      render: (change: string) => (
        <p
          className={change?.includes("-") ? "text-red-500" : "text-green-500"}
        >
          {change}%
        </p>
      ),
    },
    {
      title: "volume",
      dataIndex: "volume",
      render: (volume: string) => (
        <p className=" font-medium text-xs md:text-base">{volume}</p>
      ),
    },
    {
      title: "Sparkline",
      dataIndex: "sparkLineData",
      render: (sparkLineData: number[]) => (
        <Sparklines data={sparkLineData} height={40}>
          <SparklinesLine color="#1e90ff" />
        </Sparklines>
      ),
    },
    {
      title: "Actions",
      render: (content: ITableAction) => (
        <button
          className=" btn btn-sm text-gray-600 w-[100px]"
          onClick={() => handleViewCoin(content.action)}
        >
          view coin
        </button>
      ),
    },
  ];
  return (
    <div>
      <section className=" px-3 my-10 flex flex-col lg:flex-row gap-y-5 gap-x-7 justify-between lg:items-center items-start">
        <input
          type="text"
          placeholder="Type here"
          value={searchPrompt}
          className="input input-bordered bg-gray-600 text-gray-50  w-full max-w-xs"
          onChange={handleSearch}
        />
        <div className=" w-full overflow-auto">
          <span className=" flex gap-3  ">
            {tagsfilter?.map((tag) => (
              <button
                key={tag.name}
                className={` btn btn-md border-transparent capitalize w-32 cursor-pointer ${
                  activeTag === tag.name
                    ? " bg-gradient-to-tr from-blue-400 to-blue-200"
                    : " bg-gray-200"
                } `}
                onClick={() => handleTagType(tag?.name)}
              >
                {tag.name}
              </button>
            ))}
          </span>
        </div>
      </section>
      <main className=" flex gap-2 mb-4 px-4 ">
        {TimeFilter.map((time) => (
          <aside key={time.time}>
            <button
              className={`btn w-fit border-transparent ${
                activeTime === time.time
                  ? " bg-gradient-to-tr from-blue-400 to-blue-200"
                  : " bg-gray-200 "
              }`}
              onClick={() => handelTimeFilter(time.time)}
            >
              {time.time}
            </button>
          </aside>
        ))}
      </main>
      <div className=" overflow-auto">
        <Table
          columns={columns}
          dataSource={tableData}
          sticky
          loading={loading}
          pagination={{
            defaultCurrent: 1,
            showSizeChanger: true,
          }}
          className="bg-white"
        />
      </div>
    </div>
  );
};

export default CoinTable;
