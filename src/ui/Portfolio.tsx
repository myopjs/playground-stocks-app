import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';
import {Loader} from "../ui/Loader";

export interface Holding {
    id: string;
    symbol: string;
    name: string;
    quantity: number;
    entryPrice: number;
    currentPrice: number;
    gainLossPercent: number;
    gainLossValue: number;
}

export interface PortfolioData {
    cash: number;
    holdingsValue: number;
    totalValue: number;
    gainLoss: number;
    gainLossPercentage: number;
    dailyChange: number;
    dailyChangePercent: number;
    holdings: Holding[];
}

interface PortfolioProps {
    data: PortfolioData;
}

export const Portfolio = ({ data }: PortfolioProps) => {

    return <div className='portfolio'>
        <MyopComponent componentId={COMPONENTS_IDS.portfolio} data={data} loader={<Loader/>} />
    </div>

}