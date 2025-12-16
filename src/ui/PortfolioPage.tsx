import { useMemo, useState } from 'react';
import { formatPrice } from '../utils/market';

type Holding = { id: string; ticker: string; shares: number; price: number };

function loadHoldings(): Holding[] {
  try {
    const raw = localStorage.getItem('holdings');
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

function saveHoldings(holdings: Holding[]) {
  localStorage.setItem('holdings', JSON.stringify(holdings));
}

export function PortfolioPage() {
  const [holdings, setHoldings] = useState<Holding[]>(() => loadHoldings());
  const [ticker, setTicker] = useState('');
  const [shares, setShares] = useState<number>(0);
  const [price, setPrice] = useState<number>(0);

  const totalValue = useMemo(() => {
    return holdings.reduce((acc, h) => acc + h.shares * h.price, 0);
  }, [holdings]);

  function addHolding() {
    if (!ticker.trim() || shares <= 0 || price <= 0) return;
    const next: Holding = {
      id: crypto.randomUUID(),
      ticker: ticker.trim().toUpperCase(),
      shares,
      price,
    };
    const updated = [next, ...holdings];
    setHoldings(updated);
    saveHoldings(updated);
    setTicker('');
    setShares(0);
    setPrice(0);
  }

  function removeHolding(id: string) {
    const updated = holdings.filter(h => h.id !== id);
    setHoldings(updated);
    saveHoldings(updated);
  }

  return (
    <div>
      <h2 className="page-title">My Portfolio</h2>
      <div className="muted">Track your positions locally in this demo</div>

      <div className="toolbar">
        <input className="input" placeholder="Ticker (e.g., AAPL)" value={ticker} onChange={e => setTicker(e.target.value)} />
        <input className="input" type="number" placeholder="Shares" value={shares} onChange={e => setShares(Number(e.target.value))} />
        <input className="input" type="number" placeholder="Price" value={price} onChange={e => setPrice(Number(e.target.value))} />
        <button className="btn" onClick={addHolding}>Add</button>
      </div>

      <table className="table">
        <thead>
          <tr>
            <th>Ticker</th>
            <th>Shares</th>
            <th>Price</th>
            <th>Value</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {holdings.map(h => (
            <tr key={h.id}>
              <td>{h.ticker}</td>
              <td>{h.shares}</td>
              <td>{formatPrice(h.price)}</td>
              <td>{formatPrice(h.shares * h.price)}</td>
              <td>
                <button className="btn secondary" onClick={() => removeHolding(h.id)}>Remove</button>
              </td>
            </tr>
          ))}
          {holdings.length === 0 && (
            <tr>
              <td colSpan={5} className="muted">No holdings yet</td>
            </tr>
          )}
        </tbody>
        <tfoot>
          <tr>
            <th colSpan={3} style={{ textAlign: 'right' }}>Total</th>
            <th>{formatPrice(totalValue)}</th>
            <th></th>
          </tr>
        </tfoot>
      </table>
    </div>
  );
}


