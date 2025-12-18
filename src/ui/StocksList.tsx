import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import {Stock} from "../utils/market";
import {useMemo, useCallback} from "react";
import './styles.css';
import {Loader} from "../ui/Loader";

// Format expected by stocksList.html
interface StockListItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    updatedAt: string;
    currency: string;
}

interface StocksListProps {
    stocks: Stock[];
    selectedStock: Stock | null;
    onStockSelected: (stock: Stock | null) => void;
    onStockClicked: (stock: Stock) => void;
}

export const StocksList = ({ stocks, selectedStock, onStockSelected, onStockClicked }: StocksListProps) => {

    // Transform stocks to format expected by stocksList.html
    const stocksData = useMemo(() => {
        const transformedStocks: StockListItem[] = stocks.map(stock => ({
            symbol: stock.ticker,
            name: stock.name,
            price: stock.price,
            change: stock.price * (stock.changePct / 100),
            changePercent: stock.changePct,
            updatedAt: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            currency: '$'
        }));
        return { stocks: transformedStocks, selectedSymbol: selectedStock?.ticker || '' };
    }, [stocks, selectedStock]);

    // Handle CTA from stocksList.html
    const handleCta = useCallback((action: string, payload: any) => {
        console.log('CTA received:', action, payload);
        if (action === 'stock_selected' && payload) {
            console.log('Available stocks:', stocks.map(s => s.ticker));
            const selectedStock = stocks.find(s => s.ticker === payload.symbol);
            console.log('Found stock:', selectedStock);
            onStockSelected(selectedStock || null);
        } else if (action === 'trade_clicked' && payload) {
            const clickedStock = stocks.find(s => s.ticker === payload.symbol);
            if (clickedStock) {
                onStockClicked(clickedStock);
            }
        }
    }, [stocks, onStockSelected, onStockClicked]);

    return <div className='stocks-list'>
        <MyopComponent
            componentId={COMPONENTS_IDS.stockList}
            data={stocksData}
            on={handleCta as any}
            loader={<Loader/>}
        />
    </div>

}