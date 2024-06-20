import { RapidAPIHost, RapidAPIKey, url } from "@/Api/baseUrls";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { CoinState, ISingleCoin } from "./interface";
import { act } from "react-dom/test-utils";

const initialState: CoinState = {
  data: {
    stats: {
      total: 0,
      total24hVolume: "0",
      totalCoins: 0,
      totalExchanges: 0,
      totalMarketCap: "0",
      totalMarkets: 0,
    },
    coins: [],
  },
  loading: false,
  error: null,
  search: "",
  tags: "",
  limit: 1000,
  offset: 0,
  timeFrame: "",
  singleCoinData: {} as ISingleCoin,
  ohlcData: [],
};

export const fetchCoins = createAsyncThunk(
  "coins",
  async (params: any, { getState }) => {
    try {
      const { search, tags, limit, offset, timeFrame } = (
        getState() as { coins: CoinState }
      ).coins;
      const resp = await axios.get(`${url}/coins`, {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: timeFrame || "3h",
          "tiers[0]": "1",
          search: search,
          tags: tags,
          limit: limit,
          offset: offset,
        },
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RapidAPIKey,
          "X-RapidAPI-Host": RapidAPIHost,
        },
      });
      return resp.data.data;
    } catch (error) {
      console.log(error);
      throw new Error("Failed To Fetch Data");
    }
  }
);

export const fetchSingleCoin = createAsyncThunk(
  "coin/single",
  async (uuid: string, { getState }) => {
    try {
      const res = await axios.get(`${url}/coin/${uuid}`, {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
        },
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RapidAPIKey,
          "X-RapidAPI-Host": RapidAPIHost,
        },
      });
      return res.data.data.coin;
    } catch (error) {}
  }
);

export const fetchOHLC = createAsyncThunk(
  "coins/ohlc",
  async (uuid: string, { getState }) => {
    try {
      const res = await axios.get(`${url}/coin/${uuid}/ohlc`, {
        params: {
          referenceCurrencyUuid: "yhjMzLPhuIDl",
          timePeriod: "24h",
        },
        method: "GET",
        headers: {
          "X-RapidAPI-Key": RapidAPIKey,
          "X-RapidAPI-Host": RapidAPIHost,
        },
      });
      return res.data.data.ohlc;
    } catch (error) {
      throw new Error("Failed to fetch OHLC data");
    }
  }
);

const coinslice = createSlice({
  name: "coins",
  initialState,
  reducers: {
    setQuery: (state, action) => {
      state.search = action.payload;
    },
    setTags: (state, action) => {
      state.tags = action.payload;
    },
    setLimit: (state, action) => {
      state.limit = action.payload;
    },
    setOffset: (state, action) => {
      state.offset = state.offset + 1;
    },
    setTime: (state, action) => {
      state.timeFrame = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoins.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCoins.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCoins.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch coins";
      })
      .addCase(fetchSingleCoin.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSingleCoin.fulfilled, (state, action) => {
        state.loading = false;
        state.singleCoinData = action.payload;
      })
      .addCase(fetchSingleCoin.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.error.message || "Failed to fetch single coin data";
      })
      .addCase(fetchOHLC.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOHLC.fulfilled, (state, action) => {
        state.loading = false;
        state.ohlcData = action.payload;
      })
      .addCase(fetchOHLC.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch OHLC data";
      });
  },
});

export const { setQuery, setTags, setLimit, setOffset, setTime } =
  coinslice.actions;

export default coinslice.reducer;
