import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';
import {Loader} from "../ui/Loader";
import {useCallback} from "react";

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
    onHoldingClicked?: (holding: Holding) => void;
}

export const Portfolio = ({ data, onHoldingClicked }: PortfolioProps) => {

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('Portfolio CTA:', action, payload);
        if (action === 'holding_clicked' && payload && onHoldingClicked) {
            // Use the holding data directly from the payload
            const holding: Holding = {
                id: payload.holdingId || payload.symbol,
                symbol: payload.symbol,
                name: payload.name,
                quantity: payload.quantity,
                entryPrice: payload.entryPrice,
                currentPrice: payload.currentPrice,
                gainLossPercent: payload.gainLossPercent,
                gainLossValue: payload.gainLossValue
            };
            onHoldingClicked(holding);
        }
    }, [onHoldingClicked]);

    return <div className='portfolio'>
        <MyopComponent
            componentId={COMPONENTS_IDS.portfolio}
            data={data}
            on={handleCta as any}
            loader={<Loader/>}
        />
    </div>

}