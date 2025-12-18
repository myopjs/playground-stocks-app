import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';
import {useState, useCallback, useMemo} from "react";
import {StocksList} from "./StocksList";
import {getMockMarket, Stock} from "../utils/market";
import {StocksGraph} from "../ui/StockGraph";
import {Portfolio} from "../ui/Portfolio";
import {Loader} from "../ui/Loader";
import {TradeModal} from "./TradeModal";

export function App() {

    const initialMarket = useMemo(() => getMockMarket(), []);
    const [stocks] = useState<Stock[]>(initialMarket);
    const [selected, setSelected] = useState<Stock | null>(initialMarket[0] || null);
    const [modalStock, setModalStock] = useState<Stock | null>(null);

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


    return (
        <div>
            <header className="header">
                <MyopComponent componentId={COMPONENTS_IDS.topBar} loader={<Loader/>}/>
            </header>
            <main>
                <div className="main">
                    <StocksList stocks={stocks} selectedStock={selected} onStockSelected={handleStockSelected} onStockClicked={handleStockClicked}/>
                    <StocksGraph selectedStock={selected}/>
                </div>
                <Portfolio/>
            </main>
            <footer className="footer">
                <MyopComponent componentId={COMPONENTS_IDS.footer} loader={<Loader/>}/>
            </footer>
            {modalStock && (
                <TradeModal stock={modalStock} onClose={handleCloseModal}/>
            )}
        </div>
    );
}


