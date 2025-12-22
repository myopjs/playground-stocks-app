import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo, useCallback} from "react";
import {Loader} from "./Loader";

interface ConfirmationModalProps {
    stockSymbol: string;
    stockName: string;
    pricePerShare: number;
    quantity: number;
    actionType: 'buy' | 'sell';
    onConfirm: (payload: { actionType: 'buy' | 'sell'; stockSymbol: string; quantity: number; pricePerShare: number; totalCost: number }) => void;
    onCancel: () => void;
}

export const ConfirmationModal = ({
    stockSymbol,
    stockName,
    pricePerShare,
    quantity,
    actionType,
    onConfirm,
    onCancel
}: ConfirmationModalProps) => {

    const modalData = useMemo(() => ({
        title: actionType === 'buy' ? 'Confirm Purchase' : 'Confirm Sale',
        stockSymbol,
        stockName,
        pricePerShare,
        quantity,
        actionType
    }), [stockSymbol, stockName, pricePerShare, quantity, actionType]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('ConfirmationModal CTA:', action, payload);
        if (action === 'close-clicked' || action === 'cancel-clicked') {
            onCancel();
        } else if (action === 'confirm-clicked') {
            onConfirm(payload);
        }
    }, [onConfirm, onCancel]);

    return (
        <div className="modal-overlay" onClick={onCancel}>
            <div className="confirmation-modal-content" onClick={(e) => e.stopPropagation()}>
                <MyopComponent
                    componentId={getComponentId(QUERY_PARAMS.confirmationModal)}
                    data={modalData}
                    on={handleCta as any}
                    loader={<Loader/>}
                />
            </div>
        </div>
    );
};
