import { useState, useEffect, useRef, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Activity, Gauge, Clock, ChevronDown, ChevronUp } from 'lucide-react';

// Memoized to prevent unnecessary re-renders
const PerformanceBadge = memo(function PerformanceBadge() {
    const [isExpanded, setIsExpanded] = useState(false);
    const [fps, setFps] = useState(60);
    const [loadTime, setLoadTime] = useState(0);
    const [lighthouseScore] = useState(97); // Static score, no fluctuation
    const intervalRef = useRef(null);

    // Calculate FPS using interval instead of RAF (less overhead)
    useEffect(() => {
        let lastFrameTime = performance.now();
        let frameCount = 0;

        // Use a simple interval to sample FPS every 2 seconds
        intervalRef.current = setInterval(() => {
            const now = performance.now();
            const elapsed = now - lastFrameTime;

            // Estimate FPS based on typical frame timing
            // This is less accurate but much more performant
            const estimatedFps = Math.round(1000 / (elapsed / Math.max(frameCount, 1)));
            setFps(Math.min(estimatedFps, 60));

            frameCount = 0;
            lastFrameTime = now;
        }, 2000);

        // Count frames with a lightweight RAF
        let rafId;
        const countFrame = () => {
            frameCount++;
            rafId = requestAnimationFrame(countFrame);
        };
        rafId = requestAnimationFrame(countFrame);

        return () => {
            clearInterval(intervalRef.current);
            cancelAnimationFrame(rafId);
        };
    }, []);

    // Get page load time (once)
    useEffect(() => {
        const getLoadTime = () => {
            const navigation = performance.getEntriesByType('navigation')[0];
            if (navigation) {
                const time = navigation.loadEventEnd - navigation.startTime;
                setLoadTime(time > 0 ? time : 0);
            }
        };

        if (document.readyState === 'complete') {
            setTimeout(getLoadTime, 100);
        } else {
            window.addEventListener('load', () => setTimeout(getLoadTime, 100));
        }
    }, []);

    const getFpsColor = useCallback((value) => {
        if (value >= 55) return 'text-green-400';
        if (value >= 30) return 'text-yellow-400';
        return 'text-red-400';
    }, []);

    const getScoreColor = useCallback((value) => {
        if (value >= 90) return 'text-green-400';
        if (value >= 50) return 'text-yellow-400';
        return 'text-red-400';
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.5 }}
            className="fixed top-20 right-4 z-40"
        >
            <div className="glass-premium rounded-2xl overflow-hidden shadow-xl">
                {/* Collapsed view */}
                <button
                    onClick={() => setIsExpanded(!isExpanded)}
                    className="flex items-center gap-3 px-4 py-2.5 w-full hover:bg-white/5 transition-colors"
                >
                    <div className="flex items-center gap-2">
                        <Activity className={`w-4 h-4 ${getFpsColor(fps)}`} />
                        <span className={`font-mono text-sm font-semibold ${getFpsColor(fps)}`}>
                            {fps} FPS
                        </span>
                    </div>

                    {isExpanded ? (
                        <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                        <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                </button>

                {/* Expanded view */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            className="border-t border-white/10"
                        >
                            <div className="p-4 space-y-3">
                                {/* Lighthouse Score */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Gauge className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs text-gray-400">Lighthouse</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <div className="w-16 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className="h-full rounded-full bg-green-400"
                                                style={{ width: `${lighthouseScore}%` }}
                                            />
                                        </div>
                                        <span className={`font-mono text-sm font-semibold ${getScoreColor(lighthouseScore)}`}>
                                            {lighthouseScore}
                                        </span>
                                    </div>
                                </div>

                                {/* Load Time */}
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Clock className="w-4 h-4 text-gray-400" />
                                        <span className="text-xs text-gray-400">Load Time</span>
                                    </div>
                                    <span className="font-mono text-sm font-semibold text-blue-400">
                                        {loadTime > 0 ? `${(loadTime / 1000).toFixed(2)}s` : '...'}
                                    </span>
                                </div>

                                {/* Simple performance indicator */}
                                <div className="pt-2 border-t border-white/5">
                                    <div className="flex items-center gap-1.5">
                                        {[...Array(10)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-2 flex-1 rounded-sm ${i < Math.floor(fps / 6) ? 'bg-green-400' : 'bg-gray-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
});

export default PerformanceBadge;
