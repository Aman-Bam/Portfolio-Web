import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Keyboard, X, ArrowUp, ArrowDown } from 'lucide-react';

const shortcuts = [
    { keys: ['↑', '↓'], description: 'Navigate sections' },
    { keys: ['1-9'], description: 'Jump to section' },
    { keys: ['M'], description: 'Toggle sound' },
    { keys: ['?'], description: 'Show shortcuts' },
    { keys: ['Home'], description: 'Go to top' },
    { keys: ['End'], description: 'Go to bottom' },
];

const konamiHint = '↑↑↓↓←→←→BA';

function KeyboardHints({ isOpen, onClose }) {
    const [showInitialHint, setShowInitialHint] = useState(true);
    const [hasInteracted, setHasInteracted] = useState(false);

    // Hide initial hint after first interaction
    useEffect(() => {
        const hideHint = () => {
            if (!hasInteracted) {
                setHasInteracted(true);
                setTimeout(() => setShowInitialHint(false), 3000);
            }
        };

        const handleScroll = () => hideHint();
        const handleKeyDown = () => hideHint();
        const handleClick = () => hideHint();

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('keydown', handleKeyDown);
        window.addEventListener('click', handleClick);

        // Auto-hide after 8 seconds
        const timeout = setTimeout(() => setShowInitialHint(false), 8000);

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('click', handleClick);
            clearTimeout(timeout);
        };
    }, [hasInteracted]);

    return (
        <>
            {/* Initial floating hint */}
            <AnimatePresence>
                {showInitialHint && !isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ delay: 2, duration: 0.5 }}
                        className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 hidden md:flex items-center gap-3 px-4 py-3 glass-premium rounded-full shadow-xl"
                    >
                        <motion.div
                            animate={{ y: [0, -3, 0] }}
                            transition={{ duration: 1.5, repeat: Infinity }}
                        >
                            <Keyboard className="w-5 h-5 text-primary-400" />
                        </motion.div>
                        <span className="text-sm text-gray-300">
                            Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono mx-1">?</kbd> for keyboard shortcuts
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Full shortcuts modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={onClose}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        {/* Modal */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                            className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-full max-w-md"
                        >
                            <div className="glass-premium rounded-3xl p-6 shadow-2xl mx-4">
                                {/* Header */}
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 rounded-xl bg-primary-500/20">
                                            <Keyboard className="w-5 h-5 text-primary-400" />
                                        </div>
                                        <h3 className="text-lg font-semibold">Keyboard Shortcuts</h3>
                                    </div>
                                    <button
                                        onClick={onClose}
                                        className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                                    >
                                        <X className="w-5 h-5 text-gray-400" />
                                    </button>
                                </div>

                                {/* Shortcuts list */}
                                <div className="space-y-3">
                                    {shortcuts.map((shortcut, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, x: -10 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: i * 0.05 }}
                                            className="flex items-center justify-between py-2 px-3 rounded-lg hover:bg-white/5 transition-colors"
                                        >
                                            <span className="text-gray-300 text-sm">{shortcut.description}</span>
                                            <div className="flex items-center gap-1">
                                                {shortcut.keys.map((key, j) => (
                                                    <kbd
                                                        key={j}
                                                        className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono text-primary-300 min-w-[28px] text-center"
                                                    >
                                                        {key}
                                                    </kbd>
                                                ))}
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Easter egg hint */}
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.5 }}
                                    className="mt-6 pt-4 border-t border-white/10"
                                >
                                    <div className="text-center">
                                        <p className="text-xs text-gray-500 mb-2">Secret Code</p>
                                        <div className="flex items-center justify-center gap-1 opacity-50 hover:opacity-100 transition-opacity">
                                            {konamiHint.split('').map((char, i) => (
                                                <kbd
                                                    key={i}
                                                    className="px-1.5 py-0.5 bg-white/5 rounded text-[10px] font-mono text-gray-400"
                                                >
                                                    {char}
                                                </kbd>
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Press Escape hint */}
                                <p className="text-center text-xs text-gray-500 mt-4">
                                    Press <kbd className="px-1.5 py-0.5 bg-white/10 rounded text-xs font-mono">Esc</kbd> to close
                                </p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}

export default KeyboardHints;
