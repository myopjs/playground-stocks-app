import { Route, Routes } from 'react-router-dom';
import { HomePage } from './HomePage';
import {MyopComponent} from "@myop/react";

import { PortfolioPage } from './PortfolioPage';
import {COMPONENTS_IDS} from "../utils/componentsIds";

//style={{ height: '500px'}}
export function App() {
  return (
    <div>
      <header>
          <div>hey</div>
          <MyopComponent onLoad={(c)=>{
              console.log(c);

              c.element.
              debugger;
          }} componentId={COMPONENTS_IDS.topBar} />
      </header>
      <main >
        {/*<Routes>*/}
        {/*  <Route path="/" element={<HomePage />} />*/}
        {/*</Routes>*/}
      </main>
    </div>
  );
}


