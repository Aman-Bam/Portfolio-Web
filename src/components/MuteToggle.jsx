import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';
import SoundManager from '../utils/SoundManager';

function MuteToggle() {
    const [isMuted, setIsMuted] = useState(SoundManager.getMuted());
    const [showTooltip, setShowTooltip] = useState(false);

    useEffect(() => {
        // Initialize sound manager on first user interaction
        const initAudio = () => {
            SoundManager.init();
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };

        document.addEventListener('click', initAudio);
        document.addEventListener('keydown', initAudio);

        return () => {
            document.removeEventListener('click', initAudio);
            document.removeEventListener('keydown', initAudio);
        };
    }, []);

    const handleToggle = () => {
        const newMuted = SoundManager.toggleMute();
        setIsMuted(newMuted);
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="fixed bottom-6 right-6 z-50"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            <motion.button
                onClick={handleToggle}
                className="relative p-3 rounded-full glass-premium shadow-lg hover:shadow-xl transition-all duration-300 group"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                aria-label={isMuted ? 'Unmute sounds' : 'Mute sounds'}
            >
                <AnimatePresence mode="wait">
                    {isMuted ? (
                        <motion.div
                            key="muted"
                            initial={{ rotate: -90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: 90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <VolumeX className="w-5 h-5 text-gray-400" />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="unmuted"
                            initial={{ rotate: 90, opacity: 0 }}
                            animate={{ rotate: 0, opacity: 1 }}
                            exit={{ rotate: -90, opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <Volume2 className="w-5 h-5 text-primary-400" />
                            {/* Sound wave animation */}
                            <motion.div
                                className="absolute inset-0 rounded-full border-2 border-primary-400/50"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Glow effect */}
                <div className={`absolute inset-0 rounded-full transition-opacity duration-300 ${isMuted ? 'opacity-0' : 'opacity-100'
                    }`} style={{
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.3) 0%, transparent 70%)',
                    }} />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {showTooltip && (
                    <motion.div
                        initial={{ opacity: 0, y: 10, x: '-50%' }}
                        animate={{ opacity: 1, y: 0, x: '-50%' }}
                        exit={{ opacity: 0, y: 10, x: '-50%' }}
                        className="absolute bottom-full left-1/2 mb-2 px-3 py-1.5 bg-gray-900/95 backdrop-blur-sm text-white text-xs rounded-lg whitespace-nowrap shadow-lg"
                    >
                        {isMuted ? 'Enable sounds' : 'Mute sounds'} <span className="text-gray-400">(M)</span>
                        <div className="absolute top-full left-1/2 -translate-x-1/2 w-2 h-2 bg-gray-900/95 rotate-45" />
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

export default MuteToggle;
