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

## Myop Components

The application uses the following Myop components located in the `myopComponents/` directory:

### Top Bar (`topBar.html`)
Navigation header component displaying the application branding and navigation elements.

### Stocks List (`stocksList.html`)
Displays a searchable list of stocks with the following features:
- Search functionality to filter stocks by symbol or name
- Tab navigation between "All Stocks" and "My Portfolio" views
- Stock items showing symbol, company name, price, change percentage, and daily change
- Double-click on a stock to view its chart
- Visual selection state for the currently selected stock

### Stock Graph (`graph.html`)
Interactive stock price chart component featuring:
- Line chart with gradient fill showing price history
- Volume bars displayed below the price chart
- Time range selector (1D, 5D, 1M, 3M, 6M, 1Y, 3Y, 5Y)
- Stock information header (symbol, current price, percentage change, company name)
- Tooltip on hover showing price and volume details
- Animated chart transitions when switching stocks or time ranges
- Empty state when no stock is selected

### Portfolio (`portfolio.html`)
Portfolio holdings table displaying:
- Summary stats (total value, gain/loss)
- Holdings list with stock symbol, quantity, entry price, current price, and gain/loss
- Empty state when no holdings exist
- Click on a holding to view its details

### Footer (`footer.html`)
Simple footer component displaying a disclaimer: "Practice trading platform — No real money involved. All trades are simulated for educational purposes only."

## Tech Stack

- React 18
- TypeScript
- Vite
- @myop/react for component integration
