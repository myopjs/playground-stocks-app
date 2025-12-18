import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import {Stock} from "../utils/market";
import {useMemo, useCallback} from "react";
import {Loader} from "./Loader";

interface TradeModalProps {
    stock: Stock;
    onClose: () => void;
}

export const TradeModal = ({ stock, onClose }: TradeModalProps) => {

    const modalData = useMemo(() => ({
        stock: {
            symbol: stock.ticker,
            name: stock.name,
            currentPrice: stock.price,
            changePercent: stock.changePct,
            changeAmount: stock.price * (stock.changePct / 100),
            lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            sector: /* stock.sector ||*/ 'Technology'
        },
        account: {
            availableCash: 100000.00,
            ownedShares: 0
        },
        quantity: 1
    }), [stock]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('TradeModal CTA:', action, payload);
        if (action === 'close-clicked') {
            onClose();
        } else if (action === 'buy-clicked') {
            console.log('Buy order:', payload);
            onClose();
        } else if (action === 'sell-clicked') {
            console.log('Sell order:', payload);
            onClose();
        }
    }, [onClose]);

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <MyopComponent
                    componentId={COMPONENTS_IDS.tradeModal}
                    data={modalData}
                    on={handleCta as any}
                    loader={<Loader/>}
                />
            </div>
        </div>
    );
};
