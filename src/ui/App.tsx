import './styles.css';
import {useState, useCallback} from "react";
import {StocksList} from "./StocksList";
import {getMockMarket, Stock} from "../utils/market";
import {StocksGraph} from "../ui/StockGraph";
import {Portfolio} from "../ui/Portfolio";
import {TopBar} from "../ui/TopBar";

export function App() {


    const [stocks] = useState<Stock[]>(() => getMockMarket());
    const [selected, setSelected] = useState<Stock | null>(null);

    const handleStockSelected = useCallback((stock: Stock | null) => {
        console.log('App: Stock selected:', stock);
        setSelected(stock);
    }, []);


    return (
        <div>
            <TopBar/>
            <main>
                <div className="main">
                    <StocksList stocks={stocks} onStockSelected={handleStockSelected}/>
                    <StocksGraph selectedStock={selected}/>
                </div>
                <Portfolio/>
            </main>
            <footer>

            </footer>
        </div>
    );
}


