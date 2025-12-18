import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';
import {useState, useCallback, useMemo} from "react";
import {StocksList} from "./StocksList";
import {getMockMarket, Stock} from "../utils/market";
import {StocksGraph} from "../ui/StockGraph";
import {Portfolio, PortfolioData, Holding} from "../ui/Portfolio";
import {Loader} from "../ui/Loader";
import {TradeModal} from "./TradeModal";
import {TopBar} from "./TopBar";

const INITIAL_CASH = 100000;

export function App() {

    const initialMarket = useMemo(() => getMockMarket(), []);
    const [stocks] = useState<Stock[]>(initialMarket);
    const [selected, setSelected] = useState<Stock | null>(initialMarket[0] || null);
    const [modalStock, setModalStock] = useState<Stock | null>(null);
    const [portfolio, setPortfolio] = useState<PortfolioData>({
        cash: INITIAL_CASH,
        holdingsValue: 0,
        totalValue: INITIAL_CASH,
        gainLoss: 0,
        gainLossPercentage: 0,
        dailyChange: 0,
        dailyChangePercent: 0,
        holdings: []
    });

    const handleStockSelected = useCallback((stock: Stock | null) => {
        console.log('App: Stock selected (double-click):', stock);
        // Create a new object to force re-render even if same stock is selected
        setSelected(stock ? {...stock} : null);
    }, []);

    const handleStockClicked = useCallback((stock: Stock) => {
        console.log('App: Stock clicked (single-click):', stock);
        setModalStock(stock);
    }, []);

    const handleCloseModal = useCallback(() => {
        setModalStock(null);
    }, []);

    const handlePurchase = useCallback((purchaseData: { stockSymbol: string; stockName: string; quantity: number; pricePerShare: number; totalCost: number }) => {
        console.log('Purchase completed:', purchaseData);

        setPortfolio(prev => {
            const existingHoldingIndex = prev.holdings.findIndex(h => h.symbol === purchaseData.stockSymbol);
            let newHoldings: Holding[];

            if (existingHoldingIndex >= 0) {
                // Update existing holding
                newHoldings = prev.holdings.map((holding, index) => {
                    if (index === existingHoldingIndex) {
                        const totalQuantity = holding.quantity + purchaseData.quantity;
                        const totalCost = (holding.entryPrice * holding.quantity) + purchaseData.totalCost;
                        const newEntryPrice = totalCost / totalQuantity;
                        const currentStock = stocks.find(s => s.ticker === purchaseData.stockSymbol);
                        const currentPrice = currentStock?.price || purchaseData.pricePerShare;
                        const gainLossValue = (currentPrice - newEntryPrice) * totalQuantity;
                        const gainLossPercent = ((currentPrice - newEntryPrice) / newEntryPrice) * 100;

                        return {
                            ...holding,
                            quantity: totalQuantity,
                            entryPrice: newEntryPrice,
                            currentPrice,
                            gainLossPercent,
                            gainLossValue
                        };
                    }
                    return holding;
                });
            } else {
                // Add new holding
                const currentStock = stocks.find(s => s.ticker === purchaseData.stockSymbol);
                const currentPrice = currentStock?.price || purchaseData.pricePerShare;
                const newHolding: Holding = {
                    id: purchaseData.stockSymbol,
                    symbol: purchaseData.stockSymbol,
                    name: purchaseData.stockName,
                    quantity: purchaseData.quantity,
                    entryPrice: purchaseData.pricePerShare,
                    currentPrice,
                    gainLossPercent: 0,
                    gainLossValue: 0
                };
                newHoldings = [...prev.holdings, newHolding];
            }

            const newCash = prev.cash - purchaseData.totalCost;
            const holdingsValue = newHoldings.reduce((sum, h) => sum + (h.currentPrice * h.quantity), 0);
            const totalValue = newCash + holdingsValue;
            const totalInvested = newHoldings.reduce((sum, h) => sum + (h.entryPrice * h.quantity), 0);
            const gainLoss = holdingsValue - totalInvested;
            const gainLossPercentage = totalInvested > 0 ? (gainLoss / totalInvested) * 100 : 0;

            // Calculate daily change based on each stock's daily changePct
            const dailyChange = newHoldings.reduce((sum, h) => {
                const stock = stocks.find(s => s.ticker === h.symbol);
                if (stock) {
                    // Daily change = current value * daily change percentage
                    const holdingValue = h.currentPrice * h.quantity;
                    return sum + (holdingValue * (stock.changePct / 100));
                }
                return sum;
            }, 0);
            const dailyChangePercent = holdingsValue > 0 ? (dailyChange / holdingsValue) * 100 : 0;

            return {
                cash: newCash,
                holdingsValue,
                totalValue,
                gainLoss,
                gainLossPercentage,
                dailyChange,
                dailyChangePercent,
                holdings: newHoldings
            };
        });

        setModalStock(null);
    }, [stocks]);


    return (
        <div>
            <header className="header">
                <TopBar portfolio={portfolio}/>
            </header>
            <main>
                <div className="main">
                    <StocksList stocks={stocks} portfolioHoldings={portfolio.holdings} selectedStock={selected} onStockSelected={handleStockSelected} onStockClicked={handleStockClicked}/>
                    <StocksGraph selectedStock={selected}/>
                </div>
                <Portfolio data={portfolio}/>
            </main>
            <footer className="footer">
                <MyopComponent componentId={COMPONENTS_IDS.footer} loader={<Loader/>}/>
            </footer>
            {modalStock && (
                <TradeModal stock={modalStock} onClose={handleCloseModal} onPurchase={handlePurchase}/>
            )}
        </div>
    );
}


