import { Stock, formatChange, formatPrice } from '../utils/market';

export function StockModal({ stock, onClose }: { stock: Stock; onClose: () => void }) {
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h3 style={{ margin: 0 }}>{stock.ticker} · {stock.name}</h3>
          <button className="close" aria-label="Close" onClick={onClose}>×</button>
        </div>
        <div className="row" style={{ marginBottom: 10 }}>
          <div className="price">{formatPrice(stock.price)}</div>
          <div className={`chg ${stock.changePct >= 0 ? 'up' : 'down'}`}>{formatChange(stock.changePct)}</div>
        </div>
        <div className="muted">Day High: {formatPrice(stock.high)} · Day Low: {formatPrice(stock.low)} · Volume: {Intl.NumberFormat().format(stock.volume)}</div>
      </div>
    </div>
  );
}


