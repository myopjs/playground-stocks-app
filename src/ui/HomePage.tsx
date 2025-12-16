import { useState } from 'react';
import { Stock, getMockMarket } from '../utils/market';
import { StockModal } from './StockModal';

import {StocksList } from "@/ui/StocksList";

export function HomePage() {
  const [stocks] = useState<Stock[]>(() => getMockMarket());
  const [selected, setSelected] = useState<Stock | null>(null);

  const onStockSelected = () => {}

  return <div>
    <StocksList stocks={stocks} onStockSelected={onStockSelected} />
  </div>


}


