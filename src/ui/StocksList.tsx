import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';

export const StocksList = ({ stocks, onStockSelected } : {stocks: any[], onStockSelected: any}) => {

    return <div className='stocks-list'>
        <MyopComponent componentId={COMPONENTS_IDS.stockList} data={stocks} on={onStockSelected} />
    </div>


}