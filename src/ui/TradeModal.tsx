import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {Stock} from "../utils/market";
import {useMemo, useCallback, useState} from "react";
import {Loader} from "./Loader";
import {ConfirmationModal} from "./ConfirmationModal";
import {ConfirmationSellModal} from "./ConfirmationSellModal";

interface PurchaseData {
    stockSymbol: string;
    stockName: string;
    quantity: number;
    pricePerShare: number;
    totalCost: number;
}

interface SellData {
    stockSymbol: string;
    stockName: string;
    quantity: number;
    pricePerShare: number;
    totalProceeds: number;
}

interface TradeModalProps {
    stock: Stock;
    availableCash: number;
    ownedShares: number;
    onClose: () => void;
    onPurchase: (data: PurchaseData) => void;
    onSell: (data: SellData) => void;
}

interface TradeDetails {
    quantity: number;
    price: number;
}

export const TradeModal = ({ stock, availableCash, ownedShares, onClose, onPurchase, onSell }: TradeModalProps) => {
    const [showBuyConfirmation, setShowBuyConfirmation] = useState(false);
    const [showSellConfirmation, setShowSellConfirmation] = useState(false);
    const [tradeDetails, setTradeDetails] = useState<TradeDetails | null>(null);

    const modalData = useMemo(() => ({
        stock: {
            symbol: stock.ticker,
            name: stock.name,
            currentPrice: stock.price,
            changePercent: stock.changePct,
            changeAmount: stock.price * (stock.changePct / 100),
            lastUpdated: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false }),
            sector: stock.sector
        },
        account: {
            availableCash,
            ownedShares
        },
        quantity: 1
    }), [stock, availableCash, ownedShares]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('TradeModal CTA:', action, payload);
        if (action === 'close-clicked') {
            onClose();
        } else if (action === 'buy-clicked') {
            console.log('Buy clicked:', payload);
            setTradeDetails({ quantity: payload.quantity, price: payload.price });
            setShowBuyConfirmation(true);
        } else if (action === 'sell-clicked') {
            console.log('Sell clicked:', payload);
            setTradeDetails({ quantity: payload.quantity, price: payload.price });
            setShowSellConfirmation(true);
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

    const handleSellConfirm = useCallback((payload: any) => {
        console.log('Sale confirmed:', payload);
        onSell({
            stockSymbol: stock.ticker,
            stockName: stock.name,
            quantity: payload.quantity,
            pricePerShare: payload.pricePerShare,
            totalProceeds: payload.totalProceeds
        });
    }, [onSell, stock]);

    const handleCancelConfirmation = useCallback(() => {
        setShowBuyConfirmation(false);
        setShowSellConfirmation(false);
        setTradeDetails(null);
    }, []);

    if (showBuyConfirmation && tradeDetails) {
        return (
            <ConfirmationModal
                stockSymbol={stock.ticker}
                stockName={stock.name}
                pricePerShare={tradeDetails.price}
                quantity={tradeDetails.quantity}
                actionType="buy"
                onConfirm={handleConfirm}
                onCancel={handleCancelConfirmation}
            />
        );
    }

    if (showSellConfirmation && tradeDetails) {
        return (
            <ConfirmationSellModal
                stockSymbol={stock.ticker}
                stockName={stock.name}
                pricePerShare={tradeDetails.price}
                quantity={tradeDetails.quantity}
                onConfirm={handleSellConfirm}
                onCancel={handleCancelConfirmation}
            />
        );
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <MyopComponent
                    componentId={getComponentId(QUERY_PARAMS.tradeModal)}
                    data={modalData}
                    on={handleCta as any}
                    loader={<Loader/>}
                />
            </div>
        </div>
    );
};
