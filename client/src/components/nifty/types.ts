type NiftyMetadata = {
  indexName: string;
  open: number;
  high: number;
  low: number;
  previousClose: number;
  last: number;
  percChange: number;
  change: number;
  timeVal: string;
  yearHigh: number;
  yearLow: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  ffmc_sum: number;
};

interface MarketData {
  priority: number;
  symbol: string;
  identifier: string;
  series: string;
  open: number;
  dayHigh: number;
  dayLow: number;
  lastPrice: number;
  previousClose: number;
  change: number;
  pChange: number;
  totalTradedVolume: number;
  totalTradedValue: number;
  lastUpdateTime: string;
  yearHigh: number;
  ffmc: number;
  yearLow: number;
  nearWKH: number;
  nearWKL: number;
  perChange365d: number;
  date365dAgo: string;
  chart365dPath: string;
  date30dAgo: string;
  perChange30d: number;
  chart30dPath: string;
  chartTodayPath: string;
  meta: {
    symbol: string;
    companyName: string;
    industry: string;
    activeSeries: string[];
    debtSeries: any[]; // Assuming debtSeries could be of any type
    isFNOSec: boolean;
    isCASec: boolean;
    isSLBSec: boolean;
    isDebtSec: boolean;
    isSuspended: boolean;
    tempSuspendedSeries: any[]; // Assuming tempSuspendedSeries could be of any type
    isETFSec: boolean;
    isDelisted: boolean;
    isin: string;
    isMunicipalBond: boolean;
    quotepreopenstatus: {
      equityTime: string;
      preOpenTime: string;
      QuotePreOpenFlag: boolean;
    };
  };
}

interface MarketStatus {
  market: string;
  marketStatus: string;
  tradeDate: string;
  index: string;
  last: number;
  variation: number;
  percentChange: number;
  marketStatusMessage: string;
}

export type NiftyData = {
  name: string;
  advance: {
    declines: string;
    advances: string;
    unchanged: string;
  };
  timestamp: string;
  data: MarketData[];
  metadata: NiftyMetadata;
  marketStatus: MarketStatus;
  date30dAgo: string;
  date365dAgo: string;
};
