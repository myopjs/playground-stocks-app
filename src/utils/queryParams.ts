import {COMPONENTS_IDS} from "./componentsIds";

export const QUERY_PARAMS = {
    stockList: 'stockList',
    topBar: 'topBar',
    stockGraph: 'stockGraph',
    portfolio: 'portfolio',
    footer: 'footer',
    tradeModal: 'tradeModal',
    confirmationModal: 'confirmationModal',
    confirmationSellModal: 'confirmationSellModal',
    profilePopover: 'profilePopover'
} as const;

type ComponentKey = keyof typeof QUERY_PARAMS;

export function getComponentId(key: ComponentKey): string {
    const params = new URLSearchParams(window.location.search);
    const overrideId = params.get(QUERY_PARAMS[key]);
    return overrideId || COMPONENTS_IDS[key];
}