export type Stock = {
  ticker: string;
  name: string;
  price: number;
  changePct: number; // daily percentage change, e.g., -1.23
  high: number;
  low: number;
  volume: number;
};

export function getMockMarket(): Stock[] {
  const base: Array<Omit<Stock, 'price' | 'changePct' | 'high' | 'low' | 'volume'>> = [
    { ticker: 'AAPL', name: 'Apple Inc.' },
    { ticker: 'MSFT', name: 'Microsoft Corp.' },
    { ticker: 'GOOGL', name: 'Alphabet Inc.' },
    { ticker: 'AMZN', name: 'Amazon.com Inc.' },
    { ticker: 'TSLA', name: 'Tesla Inc.' },
    { ticker: 'NVDA', name: 'NVIDIA Corp.' },
    { ticker: 'META', name: 'Meta Platforms Inc.' },
    { ticker: 'NFLX', name: 'Netflix Inc.' },
    { ticker: 'BRK.B', name: 'Berkshire Hathaway' },
    { ticker: 'JPM', name: 'JPMorgan Chase & Co.' },
  ];

  return base.map(({ ticker, name }) => {
    const price = 50 + Math.random() * 350;
    const changePct = (Math.random() - 0.5) * 4; // -2% to +2%
    const high = price * (1 + Math.random() * 0.02);
    const low = price * (1 - Math.random() * 0.02);
    const volume = Math.floor(1_000_000 + Math.random() * 5_000_000);
    return { ticker, name, price, changePct, high, low, volume };
  });
}

export function formatPrice(value: number): string {
  return new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(value);
}

export function formatChange(pct: number): string {
  const sign = pct > 0 ? '+' : '';
  return `${sign}${pct.toFixed(2)}%`;
}


export function generateMockData(timeRange: string) {
  const now = Date.now();
  const data = [];
  let numPoints, interval, basePrice = 50;

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

  for (let i = 0; i < numPoints; i++) {
    const trend = (i / numPoints) * 15;  // Upward trend
    const volatility = (Math.random() - 0.4) * 4;
    basePrice = 50 + trend + volatility;
    basePrice = Math.max(40, Math.min(75, basePrice));

    data.push({
      time: now - (numPoints - i) * interval,
      price: parseFloat(basePrice.toFixed(2))
    });
  }

  return data;
}


