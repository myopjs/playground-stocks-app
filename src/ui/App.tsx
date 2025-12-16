import {MyopComponent} from "@myop/react";
import './styles.css';
import {useState} from "react";
import {StocksList} from "./StocksList";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import {generateMockData, getMockMarket, Stock} from "../utils/market";
import {StocksGraph} from "../ui/StockGraph";
import {Portfolio} from "../ui/Portfolio";

export function App() {


    const [stocks] = useState<Stock[]>(() => getMockMarket());
    const [selected, setSelected] = useState<Stock | null>(null);



    return (
        <div>
            <header className="header">
                <MyopComponent componentId={COMPONENTS_IDS.topBar}/>
            </header>
            <main >
                <div className="main">
                    <StocksList stocks={stocks} onStockSelected={setSelected}/>
                    <StocksGraph/>
                </div>
                <Portfolio/>
            </main>
            <footer>

            </footer>

        </div>
    );
}


