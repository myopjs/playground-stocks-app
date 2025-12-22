import {MyopComponent} from "@myop/react";
import {getComponentId, QUERY_PARAMS} from "../utils/queryParams";
import {useMemo, useCallback, useEffect, useRef, useState} from "react";
import {Loader} from "./Loader";
import './styles.css';

interface ProfilePopoverProps {
    isVisible: boolean;
    userName: string;
    userEmail: string;
    userInitials: string;
    onClose: () => void;
    onOpenComponent?: (componentId: string, selectedComponent: string) => void;
    onShare?: () => void;
}

export const ProfilePopover = ({
    isVisible,
    userName,
    userEmail,
    userInitials,
    onClose,
    onOpenComponent,
    onShare
}: ProfilePopoverProps) => {
    const popoverRef = useRef<HTMLDivElement>(null);
    const [shouldRender, setShouldRender] = useState(isVisible);
    const [animationClass, setAnimationClass] = useState(isVisible ? 'fade-in' : '');

    useEffect(() => {
        if (isVisible) {
            setShouldRender(true);
            setAnimationClass('fade-in');
        } else if (shouldRender) {
            setAnimationClass('fade-out');
            const timer = setTimeout(() => {
                setShouldRender(false);
            }, 100); // Match the animation duration
            return () => clearTimeout(timer);
        }
    }, [isVisible, shouldRender]);

    const popoverData = useMemo(() => ({
        userData: {
            name: userName,
            email: userEmail,
            initials: userInitials,
            profileImage: null
        },
        config: {
            isVisible: true
        },
        selectedComponent: 'stockList',
        componentId: ''
    }), [userName, userEmail, userInitials]);

    const handleCta = useCallback((action: string, payload: any) => {
        console.log('ProfilePopover CTA:', action, payload);
        if (action === 'click_outside' || action === 'escape_pressed') {
            onClose();
        } else if (action === 'open_clicked' && onOpenComponent) {
            onOpenComponent(payload.componentId, payload.selectedComponent);
        } else if (action === 'share_clicked' && onShare) {
            onShare();
        }
    }, [onClose, onOpenComponent, onShare]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        const handleEscape = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose();
            }
        };

        let timeoutId: ReturnType<typeof setTimeout>;

        if (isVisible) {
            // Small delay to prevent immediate close from the same click that opened the popover
            timeoutId = setTimeout(() => {
                document.addEventListener('mousedown', handleClickOutside);
            }, 10);
            document.addEventListener('keydown', handleEscape);
        }

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isVisible, onClose]);

    if (!shouldRender) return null;

    return (
        <>
            <div
                className="profile-popover-backdrop"
                onClick={onClose}
            />
            <div
                ref={popoverRef}
                className={`profile-popover-container ${animationClass}`}
            >
                <MyopComponent
                    componentId={getComponentId(QUERY_PARAMS.profilePopover)}
                    data={popoverData}
                    on={handleCta as any}
                    loader={<Loader/>}
                />
            </div>
        </>
    );
};
