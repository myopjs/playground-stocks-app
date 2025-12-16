import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';

export const Portfolio = () => {

    // const data = {
    //     cash: 6109.02,
    //     holdingsValue: 3895.34,
    //     totalValue: 10004.36,
    //     gainLoss: 4.36,
    //     gainLossPercentage: 0.11,
    //     holdings: [
    //         {
    //             id: '1',
    //             symbol: 'AZRG',
    //             name: 'Azrieli Group',
    //             quantity: 12,
    //             entryPrice: 312.09,
    //             currentPrice: 312.45,
    //             gainLossPercent: 0.12,
    //             gainLossValue: 4.36
    //         }
    //     ]
    // };

    const data = {};


    return <div className='portfolio'>
        <MyopComponent componentId={COMPONENTS_IDS.portfolio} data={data} />
    </div>

}