import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo, useCallback, useState} from "react";
import {Loader} from "./Loader";
import {PortfolioData} from "./Portfolio";
import {ProfilePopover} from "./ProfilePopover";

interface TopBarProps {
    portfolio: PortfolioData;
    userName?: string;
    userInitials?: string;
    userEmail?: string;
}

export const TopBar = ({ portfolio, userName = "Demo User", userInitials = "DU", userEmail = "demo@example.com" }: TopBarProps) => {
    const [showPopover, setShowPopover] = useState(false);

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

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('TopBar CTA:', action, payload);
        if (action === 'avatar_clicked') {
            setShowPopover(prev => !prev);
        }
    }, []);

    const handleClosePopover = useCallback(() => {
        setShowPopover(false);
    }, []);

    const handleOpenComponent = useCallback((componentId: string, selectedComponent: string) => {
        console.log('Open component:', selectedComponent, 'with ID:', componentId);
        if (componentId && selectedComponent) {
            const url = new URL(window.location.href);
            url.searchParams.set(selectedComponent, componentId);
            window.open(url.toString(), '_blank');
        }
    }, []);

    const handleShare = useCallback(() => {
        navigator.clipboard.writeText(window.location.href).catch((err) => {
            console.error('Failed to copy link:', err);
        });
    }, []);

    return (
        <>
            <MyopComponent
                componentId={getComponentId(QUERY_PARAMS.topBar)}
                data={topBarData}
                on={handleCta as any}
                loader={<Loader/>}
            />
            <ProfilePopover
                isVisible={showPopover}
                userName={userName}
                userEmail={userEmail}
                userInitials={userInitials}
                onClose={handleClosePopover}
                onOpenComponent={handleOpenComponent}
                onShare={handleShare}
            />
        </>
    );
};
