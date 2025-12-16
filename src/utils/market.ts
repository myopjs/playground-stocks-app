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


