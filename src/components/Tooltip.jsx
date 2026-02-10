import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function Tooltip({
    children,
    content,
    position = 'top',
    delay = 300,
    showOnMobile = false
}) {
    const [isVisible, setIsVisible] = useState(false);
    const [coords, setCoords] = useState({ x: 0, y: 0 });
    const triggerRef = useRef(null);
    const tooltipRef = useRef(null);
    const timeoutRef = useRef(null);

    const calculatePosition = () => {
        if (!triggerRef.current) return;

        const rect = triggerRef.current.getBoundingClientRect();
        const tooltipRect = tooltipRef.current?.getBoundingClientRect();
        const padding = 8;

        let x = rect.left + rect.width / 2;
        let y = rect.top;

        switch (position) {
            case 'top':
                y = rect.top - padding;
                break;
            case 'bottom':
                y = rect.bottom + padding;
                break;
            case 'left':
                x = rect.left - padding;
                y = rect.top + rect.height / 2;
                break;
            case 'right':
                x = rect.right + padding;
                y = rect.top + rect.height / 2;
                break;
        }

        // Prevent tooltip from going off-screen
        if (tooltipRect) {
            const viewportWidth = window.innerWidth;
            const viewportHeight = window.innerHeight;

            if (x - tooltipRect.width / 2 < padding) {
                x = tooltipRect.width / 2 + padding;
            }
            if (x + tooltipRect.width / 2 > viewportWidth - padding) {
                x = viewportWidth - tooltipRect.width / 2 - padding;
            }
            if (y < padding) {
                y = rect.bottom + padding;
            }
            if (y + tooltipRect.height > viewportHeight - padding) {
                y = rect.top - tooltipRect.height - padding;
            }
        }

        setCoords({ x, y });
    };

    const showTooltip = () => {
        timeoutRef.current = setTimeout(() => {
            setIsVisible(true);
            requestAnimationFrame(calculatePosition);
        }, delay);
    };

    const hideTooltip = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsVisible(false);
    };

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    // Check if mobile and respect showOnMobile setting
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    if (isMobile && !showOnMobile) {
        return children;
    }

    const getTransformOrigin = () => {
        switch (position) {
            case 'top': return 'bottom center';
            case 'bottom': return 'top center';
            case 'left': return 'right center';
            case 'right': return 'left center';
            default: return 'center center';
        }
    };

    return (
        <>
            <span
                ref={triggerRef}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
                onFocus={showTooltip}
                onBlur={hideTooltip}
                onClick={() => isMobile && setIsVisible(!isVisible)}
                className="inline-block"
            >
                {children}
            </span>

            <AnimatePresence>
                {isVisible && content && (
                    <motion.div
                        ref={tooltipRef}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.15, ease: 'easeOut' }}
                        className="fixed z-[9999] px-3 py-2 text-sm text-white bg-gray-900/95 backdrop-blur-sm rounded-lg shadow-xl border border-white/10 max-w-xs pointer-events-none"
                        style={{
                            left: coords.x,
                            top: coords.y,
                            transform: `translate(-50%, ${position === 'top' ? '-100%' : position === 'bottom' ? '0' : '-50%'})`,
                            transformOrigin: getTransformOrigin(),
                        }}
                    >
                        {content}
                        <div
                            className={`absolute w-2 h-2 bg-gray-900/95 rotate-45 border-white/10 ${position === 'top' ? 'bottom-[-4px] left-1/2 -translate-x-1/2 border-r border-b' :
                                    position === 'bottom' ? 'top-[-4px] left-1/2 -translate-x-1/2 border-l border-t' :
                                        position === 'left' ? 'right-[-4px] top-1/2 -translate-y-1/2 border-t border-r' :
                                            'left-[-4px] top-1/2 -translate-y-1/2 border-b border-l'
                                }`}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}

export default Tooltip;
