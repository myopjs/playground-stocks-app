
import {MyopComponent} from "@myop/react";
import {COMPONENTS_IDS} from "../utils/componentsIds";
import './styles.css';


export const TopBar = () => {


    return <header className="header">
        <MyopComponent componentId={COMPONENTS_IDS.topBar}/>
    </header>
}