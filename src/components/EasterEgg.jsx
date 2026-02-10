import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, PartyPopper, Rocket } from 'lucide-react';
import SoundManager from '../utils/SoundManager';

function EasterEgg() {
    const [isTriggered, setIsTriggered] = useState(false);
    const [particles, setParticles] = useState([]);

    useEffect(() => {
        const handleKonami = () => {
            setIsTriggered(true);
            SoundManager.success();

            // Generate confetti particles
            const newParticles = Array.from({ length: 50 }, (_, i) => ({
                id: i,
                x: Math.random() * 100,
                y: -10,
                rotation: Math.random() * 360,
                color: ['#6366f1', '#8b5cf6', '#a855f7', '#ec4899', '#f59e0b', '#10b981'][Math.floor(Math.random() * 6)],
                size: Math.random() * 8 + 4,
                delay: Math.random() * 0.5,
            }));
            setParticles(newParticles);

            // Auto-hide after animation
            setTimeout(() => {
                setIsTriggered(false);
                setParticles([]);
            }, 5000);
        };

        window.addEventListener('konamiCode', handleKonami);
        return () => window.removeEventListener('konamiCode', handleKonami);
    }, []);

    return (
        <AnimatePresence>
            {isTriggered && (
                <>
                    {/* Confetti particles */}
                    <div className="fixed inset-0 z-[100] pointer-events-none overflow-hidden">
                        {particles.map((particle) => (
                            <motion.div
                                key={particle.id}
                                className="absolute"
                                initial={{
                                    left: `${particle.x}%`,
                                    top: '-20px',
                                    rotate: 0,
                                    scale: 1,
                                }}
                                animate={{
                                    top: '120%',
                                    rotate: particle.rotation + 720,
                                    scale: [1, 1.2, 0.8, 1],
                                }}
                                transition={{
                                    duration: 3 + particle.delay,
                                    delay: particle.delay,
                                    ease: [0.25, 0.46, 0.45, 0.94],
                                }}
                                style={{
                                    width: particle.size,
                                    height: particle.size,
                                    backgroundColor: particle.color,
                                    borderRadius: particle.id % 2 === 0 ? '50%' : '2px',
                                }}
                            />
                        ))}
                    </div>

                    {/* Easter egg message */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.5, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.5, y: -50 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[101]"
                    >
                        <div className="glass-premium rounded-3xl p-8 text-center shadow-2xl">
                            <motion.div
                                animate={{
                                    rotate: [0, 10, -10, 10, 0],
                                    scale: [1, 1.1, 1],
                                }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary-500 to-purple-600 mb-4"
                            >
                                <PartyPopper className="w-8 h-8 text-white" />
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className="text-2xl font-bold gradient-text mb-2"
                            >
                                You found the secret! 🎉
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5 }}
                                className="text-gray-400 mb-4"
                            >
                                The legendary Konami Code works here too!
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                                className="flex items-center justify-center gap-2 text-sm text-primary-300"
                            >
                                <Rocket className="w-4 h-4" />
                                <span>You&apos;re officially awesome!</span>
                                <Sparkles className="w-4 h-4" />
                            </motion.div>
                        </div>
                    </motion.div>

                    {/* Radial flash effect */}
                    <motion.div
                        initial={{ opacity: 0.8, scale: 0 }}
                        animate={{ opacity: 0, scale: 3 }}
                        transition={{ duration: 0.8 }}
                        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full z-[99] pointer-events-none"
                        style={{
                            background: 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, transparent 70%)',
                        }}
                    />
                </>
            )}
        </AnimatePresence>
    );
}

export default EasterEgg;
