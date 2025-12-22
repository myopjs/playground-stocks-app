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

## Tech Stack
- React 18
- TypeScript
- Vite
- @myop/react for component integration
