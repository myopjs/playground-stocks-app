import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import {Stock} from "../utils/market";
import {useMemo, useCallback} from "react";
import './styles.css';
import {Loader} from "../ui/Loader";
import {Holding} from "./Portfolio";

// Format expected by stocksList.html
interface StockListItem {
    symbol: string;
    name: string;
    price: number;
    change: number;
    changePercent: number;
    updatedAt: string;
    currency: string;
    quantity?: number;
}

interface StocksListProps {
    stocks: Stock[];
    portfolioHoldings: Holding[];
    selectedStock: Stock | null;
    onStockSelected: (stock: Stock | null) => void;
    onStockClicked: (stock: Stock) => void;
}

export const StocksList = ({ stocks, portfolioHoldings, selectedStock, onStockSelected, onStockClicked }: StocksListProps) => {

    // Generate a random recent timestamp (within the last 5 minutes)
    const getRandomRecentTime = () => {
        const now = new Date();
        const randomSecondsAgo = Math.floor(Math.random() * 300); // 0-300 seconds ago
        now.setSeconds(now.getSeconds() - randomSecondsAgo);
        return now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });
    };

    // Transform stocks to format expected by stocksList.html
    const stocksData = useMemo(() => {
        const transformedStocks: StockListItem[] = stocks.map(stock => ({
            symbol: stock.ticker,
            name: stock.name,
            price: stock.price,
            change: stock.price * (stock.changePct / 100),
            changePercent: stock.changePct,
            updatedAt: getRandomRecentTime(),
            currency: '$'
        }));

        // Transform portfolio holdings to the same format
        // Show gain/loss since purchase (more relevant for portfolio view)
        const portfolioStocks: StockListItem[] = portfolioHoldings.map(holding => ({
            symbol: holding.symbol,
            name: holding.name,
            price: holding.currentPrice,
            change: holding.gainLossValue,
            changePercent: holding.gainLossPercent,
            updatedAt: getRandomRecentTime(),
            currency: '$',
            quantity: holding.quantity
        }));

        return {
            stocks: transformedStocks,
            portfolioStocks,
            selectedSymbol: selectedStock?.ticker || ''
        };
    }, [stocks, portfolioHoldings, selectedStock]);

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