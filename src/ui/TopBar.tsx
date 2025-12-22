import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo} from "react";
import {Loader} from "./Loader";
import {PortfolioData} from "./Portfolio";

interface TopBarProps {
    portfolio: PortfolioData;
    userName?: string;
    userInitials?: string;
}

export const TopBar = ({ portfolio, userName = "Demo User", userInitials = "DU" }: TopBarProps) => {

    const topBarData = useMemo(() => ({
        portfolioName: "My Portfolio Demo",
        portfolioSubtitle: "Practice trading, no real money involved",
        cashAvailable: portfolio.cash,
        portfolioValue: portfolio.totalValue,
        dailyChange: portfolio.dailyChange,
        dailyChangePercent: portfolio.dailyChangePercent,
        userInitials,
        userName
    }), [portfolio.cash, portfolio.totalValue, portfolio.dailyChange, portfolio.dailyChangePercent, userName, userInitials]);

    return (
        <MyopComponent
            componentId={getComponentId(QUERY_PARAMS.topBar)}
            data={topBarData}
            loader={<Loader/>}
        />
    );
};
