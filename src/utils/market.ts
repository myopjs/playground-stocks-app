export type Stock = {
  ticker: string;
  name: string;
  price: number;
  changePct: number; // daily percentage change, e.g., -1.23
  high: number;
  low: number;
  volume: number;
  sector: string;
};

export function getMockMarket(): Stock[] {
  const base: Array<Omit<Stock, 'price' | 'changePct' | 'high' | 'low' | 'volume'>> = [
    { ticker: 'AAPL', name: 'Apple Inc.', sector: 'Technology' },
    { ticker: 'MSFT', name: 'Microsoft Corp.', sector: 'Technology' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.', sector: 'Technology' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.', sector: 'Consumer Cyclical' },
    { ticker: 'TSLA', name: 'Tesla Inc.', sector: 'Automotive' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.', sector: 'Technology' },
    { ticker: 'META', name: 'Meta Platforms Inc.', sector: 'Technology' },
    { ticker: 'NFLX', name: 'Netflix Inc.', sector: 'Communication Services' },
    { ticker: 'BRK.B', name: 'Berkshire Hathaway', sector: 'Financial Services' },
    { ticker: 'JPM', name: 'JPMorgan Chase & Co.', sector: 'Financial Services' },
  ];

  return base.map(({ ticker, name, sector }) => {
    const price = 50 + Math.random() * 350;
    const changePct = (Math.random() - 0.5) * 4; // -2% to +2%
    const high = price * (1 + Math.random() * 0.02);
    const low = price * (1 - Math.random() * 0.02);
    const volume = Math.floor(1_000_000 + Math.random() * 5_000_000);
    return { ticker, name, price, changePct, high, low, volume, sector };
  });
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

export function formatChange(pct: number): string {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}


export type TimeRange = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

export interface ChartDataPoint {
  time: number;
  price: number;
}

export interface TimeRangeData {
  chartData: ChartDataPoint[];
  currentPrice: number;
  priceChange: number;
  changePercent: number;
}

export interface StockGraphData {
  stockSymbol: string;
  stockName: string;
  currentPrice: number;
  priceChange: number;
  changePercent: number;
  timeRange: TimeRange;
  chartData: ChartDataPoint[];
}

export interface StockGraphDataAllRanges {
  stockSymbol: string;
  stockName: string;
  timeRange: TimeRange;
  timeRanges: Record<TimeRange, TimeRangeData>;
}

export function generateMockChartData(timeRange: string, currentPrice: number = 100): ChartDataPoint[] {
  const now = Date.now();
  const data: ChartDataPoint[] = [];
  let numPoints: number, interval: number;

  switch(timeRange) {
    case '1D':
      numPoints = 78;  // 5-min intervals for trading day
      interval = 5 * 60 * 1000;
      break;
    case '5D':
      numPoints = 40;  // Hourly for 5 days
      interval = 60 * 60 * 1000;
      break;
    case '1M':
      numPoints = 30;  // Daily for 1 month
      interval = 24 * 60 * 60 * 1000;
      break;
    case '3M':
      numPoints = 90;  // Daily for 3 months
      interval = 24 * 60 * 60 * 1000;
      break;
    case '6M':
      numPoints = 26;  // Weekly for 6 months
      interval = 7 * 24 * 60 * 60 * 1000;
      break;
    case '1Y':
      numPoints = 52;  // Weekly for 1 year
      interval = 7 * 24 * 60 * 60 * 1000;
      break;
    case '3Y':
      numPoints = 36;  // Monthly for 3 years
      interval = 30 * 24 * 60 * 60 * 1000;
      break;
    case '5Y':
      numPoints = 60;  // Monthly for 5 years
      interval = 30 * 24 * 60 * 60 * 1000;
      break;
    default:
      numPoints = 52;
      interval = 7 * 24 * 60 * 60 * 1000;
  }

  // Generate prices that end at the current stock price
  // Start from a price that's 10-30% lower (simulating growth over time)
  const volatilityPercent = 0.02; // 2% volatility
  const trendPercent = 0.15 + Math.random() * 0.15; // 15-30% growth
  const startPrice = currentPrice / (1 + trendPercent);

  for (let i = 0; i < numPoints; i++) {
    const progress = i / (numPoints - 1);
    // Linear interpolation from start to current price with some noise
    const trendPrice = startPrice + (currentPrice - startPrice) * progress;
    const noise = trendPrice * volatilityPercent * (Math.random() - 0.5) * 2;
    let price = trendPrice + noise;

    // Last point should be exactly the current price
    if (i === numPoints - 1) {
      price = currentPrice;
    }

    data.push({
      time: now - (numPoints - 1 - i) * interval,
      price: parseFloat(price.toFixed(2))
    });
  }

  return data;
}

export function generateStockGraphData(stock: Stock, timeRange: TimeRange = '1Y'): StockGraphData {
  const chartData = generateMockChartData(timeRange, stock.price);
  const startPrice = chartData[0].price;
  const currentPrice = chartData[chartData.length - 1].price;
  const priceChange = currentPrice - startPrice;
  const changePercent = (priceChange / startPrice) * 100;

  return {
    stockSymbol: stock.ticker,
    stockName: stock.name,
    currentPrice,
    priceChange,
    changePercent,
    timeRange,
    chartData,
  };
}

const ALL_TIME_RANGES: TimeRange[] = ['1D', '5D', '1M', '3M', '6M', '1Y', '3Y', '5Y'];

export function generateStockGraphDataAllRanges(stock: Stock, defaultTimeRange: TimeRange = '1Y'): StockGraphDataAllRanges {
  const timeRanges = {} as Record<TimeRange, TimeRangeData>;

  for (const range of ALL_TIME_RANGES) {
    const chartData = generateMockChartData(range, stock.price);
    const startPrice = chartData[0].price;
    const currentPrice = chartData[chartData.length - 1].price;
    const priceChange = currentPrice - startPrice;
    const changePercent = (priceChange / startPrice) * 100;

    timeRanges[range] = {
      chartData,
      currentPrice,
      priceChange,
      changePercent,
    };
  }

  return {
    stockSymbol: stock.ticker,
    stockName: stock.name,
    timeRange: defaultTimeRange,
    timeRanges,
  };
}
