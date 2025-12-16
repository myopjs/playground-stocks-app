import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "@/utils/componentsIds";
// import {Stock} from "@/utils/market";


export const StocksList = ({ stocks, onStockSelected } : {stocks: any[], onStockSelected: any}) => {


    return <MyopComponent style={{height: '50%'}} componentId={COMPONENTS_IDS.stockList} data={stocks} on={onStockSelected} />

}