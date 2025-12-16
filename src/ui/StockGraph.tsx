import {generateMockData, Stock} from "../utils/market";
import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';

// Individual price point on the chart
interface ChartDataPoint {
    time: number;    // Unix timestamp in milliseconds
    price: number;   // Price value
}

// Time range options
type TimeRange = '1D' | '5D' | '1M' | '3M' | '6M' | '1Y' | '3Y' | '5Y';

// Main stock data structure for initialization
interface StockData {
    stockSymbol: string;      // e.g., 'AAPL', 'ORL'
    stockName: string;        // e.g., 'Apple Inc.', 'Oil Refineries'
    currentPrice: number;     // Current stock price
    priceChange: number;      // Absolute price change
    changePercent: number;    // Percentage change
    timeRange: TimeRange;     // Selected time range
    chartData: ChartDataPoint[];
    volumeData?: number[];    // Optional - auto-generated if not provided
}

// Action payloads for updates
interface UpdateChartPayload {
    chartData: ChartDataPoint[];
    volumeData?: number[];
    timeRange?: TimeRange;
}

interface UpdatePricePayload {
    currentPrice?: number;
    priceChange?: number;
    changePercent?: number;
}

// Action-based interface calls
interface SetDataAction {
    action: 'setData';
    payload: StockData;
}

interface UpdateChartAction {
    action: 'updateChart';
    payload: UpdateChartPayload;
}

interface UpdatePriceAction {
    action: 'updatePrice';
    payload: UpdatePricePayload;
}

type StockAction = SetDataAction | UpdateChartAction | UpdatePriceAction;

// CTA handler payloads
interface PointClickedPayload {
    index: number;
    time: number;
    price: number;
    volume: number;
    symbol: string;
}

interface TimeRangeChangedPayload {
    range: TimeRange;
}

// The main interface function signature
type MyopInitInterface = {
    (data: StockData): void;
    (action: StockAction): void;
    (): StockData;  // Returns current state when called with no args
};




export const StocksGraph = () => {

    const timeRange: TimeRange = '1Y';
    const chartData = generateMockData(timeRange);
    const startPrice = chartData[0].price;
    const currentPrice = chartData[chartData.length - 1].price;
    const priceChange = currentPrice - startPrice;
    const changePercent = (priceChange / startPrice) * 100;

    const stockData: StockData = {
        stockSymbol: 'ORL',
        stockName: 'Oil Refineries',
        currentPrice,
        priceChange,
        changePercent,
        timeRange,
        chartData,
    };



    return <div className='stock-graph'>
        <MyopComponent componentId={COMPONENTS_IDS.stockGraph} data={stockData}  />
    </div>

}