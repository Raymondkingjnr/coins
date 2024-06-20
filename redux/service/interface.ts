export interface Icoins {
  uuid: string;
  symbol: string;
  name: string;
  color: string;
  iconUrl: string;
  marketCap: string;
  price: string;
  listedAt: number;
  tier: number;
  change: string;
  rank: number;
  lowVolume: boolean;
  coinrankingUrl: string;
  btcPrice: string;
  sparkline: string[];
  "24hVolume": string;
}

export interface ohlcTypes {
  avg: string;
  close: string;
  endingAt: number;
  high: string;
  low: string;
  open: string;
  startingAt: number;
}

export interface ISingleCoin {
  "24hVolume": string;
  allTimeHigh: { price: string; timestamp: number };
  btcPrice: string;
  change: string;
  coinrankingUrl: string;
  color: string;
  contractAddresses: [];
  description: string;
  fullyDilutedMarketCap: string;
  hasContent: boolean;
  iconUrl: string;
  links: [];
  listedAt: number;
  lowVolume: boolean;
  marketCap: string;
  name: string;
  notices: null;
  numberOfExchanges: number;
  numberOfMarkets: number;
  price: string;
  priceAt: number;
  rank: number;
  sparkline: string[];
  supply: { confirmed: boolean; circulating: string; total: string };
  symbol: string;
  tags: string[];
  tier: number;
  uuid: string;
  websiteUrl: string;
  ohlc: [];
}

interface IStat {
  total: number;
  total24hVolume: string;
  totalCoins: number;
  totalExchanges: number;
  totalMarketCap: string;
  totalMarkets: number;
}

interface Idata {
  stats: IStat;
  coins: Icoins[];
}
export interface CoinState {
  singleCoinData: ISingleCoin;
  data: Idata;
  loading: boolean;
  error: string | null;
  search: string;
  tags: string;
  limit: number;
  offset: number;
  timeFrame: string;
  ohlcData: ohlcTypes[];
}
