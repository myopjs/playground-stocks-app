# Stocks Manager (Vite + React + TS)

A stock manager demo application built with React and Myop components, featuring a market view, interactive stock charts, and portfolio management.

## Scripts

- `npm run dev` — start dev server
- `npm run build` — type-check and build
- `npm run preview` — preview production build

## Setup

1. Install dependencies:

```bash
npm install
```

2. Start the dev server:

```bash
npm run dev
```

## Features

- Real-time market view with searchable stock list
- Interactive stock price charts with multiple time ranges
- Portfolio management with holdings tracking
- Practice trading platform (simulated, no real money)
- Buy and sell stocks with confirmation modals
- Track portfolio performance with gain/loss calculations
- Dynamic cash balance updates after trades
- Daily change tracking for portfolio holdings

## Myop Components

The application uses the following Myop components :

### Top Bar
Navigation header component displaying:
- Application branding and portfolio name
- Cash available balance
- Total portfolio value
- Daily change with percentage (color-coded positive/negative)
- User avatar

### Stocks List
Displays a searchable list of stocks with the following features:
- Search functionality to filter stocks by symbol or name
- Tab navigation between "All Stocks" and "My Portfolio" views
- Stock items showing symbol, company name, price, change percentage, and daily change
- Click on a stock row to view its chart
- Trade button on each stock to open the trading modal
- "My Portfolio" tab shows only owned stocks with gain/loss since purchase
- Visual selection state for the currently selected stock

### Stock Graph 
Interactive stock price chart component featuring:
- Line chart with gradient fill showing price history
- Volume bars displayed below the price chart
- Time range selector (1D, 5D, 1M, 3M, 6M, 1Y, 3Y, 5Y)
- Stock information header (symbol, current price, percentage change, company name)
- Tooltip on hover showing price and volume details
- Animated chart transitions when switching stocks or time ranges
- Empty state when no stock is selected

### Portfolio
Portfolio holdings table displaying:
- Summary stats (cash, holdings value, total value, total gain/loss)
- Holdings list with stock symbol, quantity, entry price, current price, and gain/loss
- Empty state when no holdings exist
- Click on a holding to view its details

### Trade Modal
Modal for buying and selling stocks featuring:
- Stock information (symbol, name, current price, change percentage)
- Account info (available cash, owned shares)
- Quantity selector
- Buy button (always available)
- Sell button (enabled when user owns shares of the stock)

### Confirmation Modal (Buy)
Purchase confirmation modal displaying:
- Stock symbol and name
- Price per share
- Quantity
- Total cost
- Confirm Purchase and Cancel buttons

### Confirmation Modal (Sell)
Sale confirmation modal displaying:
- Stock symbol and name
- Price per share
- Quantity
- Total proceeds
- Confirm Sale and Cancel buttons

### Footer
Simple footer component displaying a disclaimer: "Practice trading platform — No real money involved. All trades are simulated for educational purposes only."

### Profile Popover
A popover component that appears when clicking on the user avatar in the top bar, featuring:
- User profile display (name, email, initials/avatar)
- Component selector dropdown to choose which component to override
- Component ID input field
- "Open" button to apply the component override via URL query parameters
- Fade in/out animations on open/close
- Closes when clicking outside or pressing Escape

## Query Parameters for Component Overrides

You can override any Myop component ID at runtime using URL query parameters. This is useful for testing different component versions or switching between development and production components.

### Available Query Parameters

| Parameter | Description |
|-----------|-------------|
| `stockList` | Override the Stocks List component |
| `topBar` | Override the Top Bar component |
| `stockGraph` | Override the Stock Graph component |
| `portfolio` | Override the Portfolio component |
| `footer` | Override the Footer component |
| `tradeModal` | Override the Trade Modal component |
| `confirmationModal` | Override the Confirmation Modal (Buy) component |
| `confirmationSellModal` | Override the Confirmation Modal (Sell) component |
| `profilePopover` | Override the Profile Popover component |

### Usage Example

To override a component, add the query parameter with the desired component ID:

```
http://localhost:5173/?stockList=your-custom-component-id
```

You can override multiple components at once:

```
http://localhost:5173/?stockList=id1&topBar=id2&portfolio=id3
```

If no query parameter is provided, the application uses the default component IDs defined in `componentsIds.ts`.

## Component Data Structures

When creating custom components to override the default ones, your component must implement the `myop_init_interface(data)` function to receive the following data structures:

### Top Bar

```typescript
interface TopBarData {
    portfolioName: string;        // e.g., "My Portfolio Demo"
    portfolioSubtitle: string;    // e.g., "Practice trading, no real money involved"
    cashAvailable: number;        // e.g., 100000.00
    portfolioValue: number;       // e.g., 125750.50
    dailyChange: number;          // e.g., 1250.75
    dailyChangePercent: number;   // e.g., 1.02
    userInitials: string;         // e.g., "JD"
    userName: string;             // e.g., "John Doe"
}
```

**CTA Actions emitted:**
- `avatar_clicked` - When user clicks on the avatar

### Stocks List

```typescript
interface StocksListData {
    stocks: StockItem[];           // All available stocks
    portfolioStocks: StockItem[];  // Stocks owned by user
    selectedSymbol: string;        // Currently selected stock symbol
}

interface StockItem {
    symbol: string;        // e.g., "AAPL"
    name: string;          // e.g., "Apple Inc."
    price: number;         // e.g., 178.50
    change: number;        // e.g., 2.35
    changePercent: number; // e.g., 1.33
    updatedAt: string;     // e.g., "14:32"
    currency: string;      // e.g., "$"
    quantity?: number;     // Only for portfolio stocks
}
```

**CTA Actions emitted:**
- `stock_selected` - `{ symbol: string }` - When user double-clicks a stock
- `trade_clicked` - `{ symbol: string }` - When user clicks trade button

### Stock Graph

```typescript
interface StockGraphData {
    stockSymbol: string;           // e.g., "AAPL"
    stockName: string;             // e.g., "Apple Inc."
    currentPrice: number;          // e.g., 178.50
    priceChange: number;           // e.g., 2.35
    changePercent: number;         // e.g., 1.33
    timeRange: string;             // e.g., "1Y"
    timeRanges: {                  // Data for all time ranges
        [key: string]: {
            chartData: { time: string; price: number }[];
            currentPrice: number;
            priceChange: number;
            changePercent: number;
        }
    };
}

// Special action to clear the chart:
{ action: 'clear' }
```

**CTA Actions emitted:**
- `time_range_changed` - `{ range: string }` - When user selects a different time range

### Portfolio

```typescript
interface PortfolioData {
    cash: number;              // Available cash
    holdingsValue: number;     // Total value of holdings
    totalValue: number;        // cash + holdingsValue
    gainLoss: number;          // Total gain/loss amount
    gainLossPercentage: number;// Total gain/loss percentage
    dailyChange: number;       // Daily change amount
    dailyChangePercent: number;// Daily change percentage
    holdings: Holding[];       // Array of holdings
}

interface Holding {
    id: string;              // Unique identifier
    symbol: string;          // e.g., "AAPL"
    name: string;            // e.g., "Apple Inc."
    quantity: number;        // Number of shares
    entryPrice: number;      // Average purchase price
    currentPrice: number;    // Current market price
    gainLossPercent: number; // Gain/loss percentage
    gainLossValue: number;   // Gain/loss dollar amount
}
```

**CTA Actions emitted:**
- `holding_clicked` - `{ symbol, name, quantity, entryPrice, currentPrice, gainLossPercent, gainLossValue }` - When user clicks a holding

### Trade Modal

```typescript
interface TradeModalData {
    stock: {
        symbol: string;        // e.g., "AAPL"
        name: string;          // e.g., "Apple Inc."
        currentPrice: number;  // e.g., 178.50
        changePercent: number; // e.g., 1.33
        changeAmount: number;  // e.g., 2.35
        lastUpdated: string;   // e.g., "14:32"
        sector: string;        // e.g., "Technology"
    };
    account: {
        availableCash: number; // e.g., 100000.00
        ownedShares: number;   // e.g., 10
    };
    quantity: number;          // Initial quantity (default: 1)
}
```

**CTA Actions emitted:**
- `buy-clicked` - `{ quantity: number, price: number, totalCost: number }`
- `sell-clicked` - `{ quantity: number, price: number, totalValue: number }`
- `close-clicked` - When modal is closed

### Confirmation Modal (Buy)

```typescript
interface ConfirmationModalData {
    title: string;           // e.g., "Confirm Purchase"
    stockSymbol: string;     // e.g., "AAPL"
    stockName: string;       // e.g., "Apple Inc."
    pricePerShare: number;   // e.g., 178.50
    quantity: number;        // e.g., 10
    actionType: 'buy' | 'sell';
}
```

**CTA Actions emitted:**
- `confirm-clicked` - `{ actionType, stockSymbol, quantity, pricePerShare, totalCost }`
- `cancel-clicked` - When user cancels
- `close-clicked` - When modal is closed

### Confirmation Modal (Sell)

```typescript
interface ConfirmationSellModalData {
    stockSymbol: string;     // e.g., "AAPL"
    stockName: string;       // e.g., "Apple Inc."
    pricePerShare: number;   // e.g., 178.50
    quantity: number;        // e.g., 10
}
```

**CTA Actions emitted:**
- `confirm-sale-clicked` - `{ stockSymbol, quantity, pricePerShare, totalProceeds }`
- `cancel-clicked` - When user cancels
- `close-clicked` - When modal is closed

### Footer

```typescript
interface FooterData {
    text?: string;  // Optional custom footer text
}
```

### Profile Popover

```typescript
interface ProfilePopoverData {
    userData: {
        name: string;              // e.g., "Maya Chen"
        email: string;             // e.g., "maya.chen@example.com"
        initials: string;          // e.g., "MC"
        profileImage?: string | null;
    };
    config: {
        isVisible: boolean;
    };
    selectedComponent: string;     // e.g., "Stocks List"
    componentId: string;           // Component ID input value
}
```

**CTA Actions emitted:**
- `component_selected` - `{ component: string }` - When user selects a component from dropdown
- `open_clicked` - `{ componentId: string, selectedComponent: string }` - When user clicks Open
- `click_outside` - When user clicks outside the popover
- `escape_pressed` - When user presses Escape key

## Tech Stack
- React 18
- TypeScript
- Vite
- @myop/react for component integration
