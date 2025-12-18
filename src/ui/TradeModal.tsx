import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import {Stock} from "../utils/market";
import {useMemo, useCallback, useState} from "react";
import {Loader} from "./Loader";
import {ConfirmationModal} from "./ConfirmationModal";

interface PurchaseData {
    stockSymbol: string;
    stockName: string;
    quantity: number;
    pricePerShare: number;
    totalCost: number;
}

interface TradeModalProps {
    stock: Stock;
    onClose: () => void;
    onPurchase: (data: PurchaseData) => void;
}

interface BuyDetails {
    quantity: number;
    price: number;
}

export const TradeModal = ({ stock, onClose, onPurchase }: TradeModalProps) => {
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [buyDetails, setBuyDetails] = useState<BuyDetails | null>(null);

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
            console.log('Buy clicked:', payload);
            setBuyDetails({ quantity: payload.quantity, price: payload.price });
            setShowConfirmation(true);
        } else if (action === 'sell-clicked') {
            console.log('Sell order:', payload);
            onClose();
        }
    }, [onClose]);

    const handleConfirm = useCallback((payload: any) => {
        console.log('Purchase confirmed:', payload);
        onPurchase({
            stockSymbol: stock.ticker,
            stockName: stock.name,
            quantity: payload.quantity,
            pricePerShare: payload.pricePerShare,
            totalCost: payload.totalCost
        });
    }, [onPurchase, stock]);

    const handleCancelConfirmation = useCallback(() => {
        setShowConfirmation(false);
        setBuyDetails(null);
    }, []);

    if (showConfirmation && buyDetails) {
        return (
            <ConfirmationModal
                stockSymbol={stock.ticker}
                stockName={stock.name}
                pricePerShare={buyDetails.price}
                quantity={buyDetails.quantity}
                actionType="buy"
                onConfirm={handleConfirm}
                onCancel={handleCancelConfirmation}
            />
        );
    }

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
