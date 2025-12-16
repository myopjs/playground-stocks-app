import {generateStockGraphDataAllRanges, Stock} from "../utils/market";
import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';
import {useMemo} from "react";
import {Loader} from "../ui/Loader";

interface StocksGraphProps {
    selectedStock: Stock | null;
}

export const StocksGraph = ({ selectedStock }: StocksGraphProps) => {

    const stockData = useMemo(() => {
        if (!selectedStock) {
            return { action: 'clear' };
        }
        return generateStockGraphDataAllRanges(selectedStock, '1Y');
    }, [selectedStock]);

    return <div className='stock-graph'>
        <MyopComponent componentId={COMPONENTS_IDS.stockGraph} data={stockData} loader={<Loader/>}/>
    </div>

}