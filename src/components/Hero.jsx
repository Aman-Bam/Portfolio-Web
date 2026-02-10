import { Globe, Calendar, CodeIcon, Bot, PhoneCall, ChevronDown } from 'lucide-react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import InteractiveBackground from './InteractiveBackground';

function Hero() {
    const heroRef = useRef(null);
    const { scrollY } = useScroll();
    // Use ref instead of state to avoid re-renders
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const lastUpdateRef = useRef(0);

    // Parallax effects
    const y1 = useTransform(scrollY, [0, 500], [0, -150]);
    const y2 = useTransform(scrollY, [0, 500], [0, -100]);
    const y3 = useTransform(scrollY, [0, 500], [0, -50]);

    // Smooth parallax values
    const smoothY1 = useSpring(y1, { stiffness: 100, damping: 30 });
    const smoothY2 = useSpring(y2, { stiffness: 100, damping: 30 });
    const smoothY3 = useSpring(y3, { stiffness: 100, damping: 30 });

    // Animated counter for stats
    const useCounter = (end, duration = 2) => {
        const [count, setCount] = useState(0);

        useEffect(() => {
            let startTime;
            let animationFrame;

            const animate = (currentTime) => {
                if (!startTime) startTime = currentTime;
                const progress = (currentTime - startTime) / (duration * 1000);

                if (progress < 1) {
                    setCount(Math.floor(end * progress));
                    animationFrame = requestAnimationFrame(animate);
                } else {
                    setCount(end);
                }
            };

            animationFrame = requestAnimationFrame(animate);
            return () => cancelAnimationFrame(animationFrame);
        }, [end, duration]);

        return count;
    };

    const projectCount = useCounter(50, 2);

    // Throttled mouse move handler - only update every 50ms
    useEffect(() => {
        const handleMouseMove = (e) => {
            const now = Date.now();
            // Throttle to ~20fps for mouse updates (50ms)
            if (now - lastUpdateRef.current > 50) {
                lastUpdateRef.current = now;
                setMousePosition({ x: e.clientX, y: e.clientY });
            }
        };

        window.addEventListener('mousemove', handleMouseMove, { passive: true });
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        }
    };

    const statVariants = {
        hidden: { opacity: 0, scale: 0.8 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                type: "spring",
                stiffness: 200,
                damping: 20
            }
        }
    };

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-20 overflow-hidden" ref={heroRef}>
            {/* Interactive particle background */}
            <InteractiveBackground mousePosition={mousePosition} />

            {/* Background Elements with Parallax */}
            <div className="absolute inset-0 bg-grid"></div>

            <motion.div
                className="orb w-96 h-96 bg-primary-600 -top-48 -left-48 gpu"
                style={{ y: smoothY1 }}
            ></motion.div>

            <motion.div
                className="orb w-80 h-80 bg-purple-600 top-1/2 -right-40 gpu"
                style={{ y: smoothY2, animationDelay: '-3s' }}
            ></motion.div>

            <motion.div
                className="orb w-64 h-64 bg-pink-600 bottom-20 left-1/4 gpu"
                style={{ y: smoothY3, animationDelay: '-5s' }}
            ></motion.div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                    {/* Left Content */}
                    <motion.div
                        className="text-center lg:text-left"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div
                            className="inline-flex items-center px-4 py-2 rounded-full glass mb-6 gpu"
                            variants={itemVariants}
                        >
                            <motion.span
                                className="w-2 h-2 bg-green-500 rounded-full mr-2 will-change-transform"
                                animate={{ scale: [1, 1.3, 1] }}
                                transition={{ repeat: Infinity, duration: 2 }}
                            ></motion.span>
                            <span className="text-sm text-gray-300">Available for new projects</span>
                        </motion.div>

                        <motion.h1
                            className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight mb-6"
                            variants={itemVariants}
                        >
                            I Build <span className="gradient-text">Websites</span> & <span className="gradient-text">AI Systems</span> That Grow Your Business 24/7
                        </motion.h1>

                        <motion.p
                            className="text-lg sm:text-xl text-gray-400 mb-8 max-w-2xl"
                            variants={itemVariants}
                        >
                            Helping small businesses, coaches, doctors, and startups get a powerful online presence with modern websites and AI voice agents that handle customer calls automatically.
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
                            variants={itemVariants}
                        >
                            <motion.a
                                href="#contact"
                                className="btn-glow btn-ripple px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full font-semibold text-lg flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Globe className="w-5 h-5" />
                                Get Your Website
                            </motion.a>
                            <motion.a
                                href="#contact"
                                className="px-8 py-4 rounded-full font-semibold text-lg glass hover:bg-white/10 transition-all flex items-center justify-center gap-2"
                                whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 0.1)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Calendar className="w-5 h-5" />
                                Book Free Consultation
                            </motion.a>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            className="grid grid-cols-3 gap-8 mt-12 pt-8 border-t border-white/10"
                            variants={containerVariants}
                        >
                            <motion.div variants={statVariants}>
                                <div className="text-3xl font-bold gradient-text">{projectCount}+</div>
                                <div className="text-sm text-gray-500">Projects Delivered</div>
                            </motion.div>
                            <motion.div variants={statVariants}>
                                <div className="text-3xl font-bold gradient-text">100%</div>
                                <div className="text-sm text-gray-500">Client Satisfaction</div>
                            </motion.div>
                            <motion.div variants={statVariants}>
                                <div className="text-3xl font-bold gradient-text">24/7</div>
                                <div className="text-sm text-gray-500">AI Support</div>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Content - Abstract Visual */}
                    <motion.div
                        className="relative hidden lg:block"
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <div className="relative w-full aspect-square animate-float">
                            {/* Decorative circles */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-80 h-80 rounded-full border border-primary-500/20"></div>
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: -360 }}
                                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-64 h-64 rounded-full border border-purple-500/30"></div>
                            </motion.div>

                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                            >
                                <div className="w-48 h-48 rounded-full border border-pink-500/40"></div>
                            </motion.div>

                            {/* Center card */}
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            >
                                <div className="glass-card rounded-3xl p-8 w-72">
                                    <div className="flex items-center justify-between mb-4">
                                        <motion.div
                                            className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center"
                                            whileHover={{ rotate: 180 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CodeIcon className="w-6 h-6" />
                                        </motion.div>
                                        <span className="px-3 py-1 rounded-full bg-green-500/20 text-green-400 text-sm">Active</span>
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2">Your Website</h3>
                                    <p className="text-gray-400 text-sm mb-4">Generating leads 24/7</p>
                                    <div className="flex items-center gap-2">
                                        <div className="flex -space-x-2">
                                            <motion.div
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500"
                                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                            ></motion.div>
                                            <motion.div
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-rose-500"
                                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                            ></motion.div>
                                            <motion.div
                                                className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500"
                                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                            ></motion.div>
                                        </div>
                                        <span className="text-sm text-gray-400">+127 visitors today</span>
                                    </div>
                                </div>
                            </motion.div>

                            {/* Floating elements */}
                            <motion.div
                                className="absolute top-10 right-10 glass-card rounded-2xl p-4"
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <Bot className="w-8 h-8 text-primary-400" />
                            </motion.div>

                            <motion.div
                                className="absolute bottom-20 left-0 glass-card rounded-2xl p-4"
                                animate={{ y: [10, -10, 10] }}
                                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                                whileHover={{ scale: 1.1 }}
                            >
                                <PhoneCall className="w-8 h-8 text-green-400" />
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Scroll indicator */}
            <motion.div
                className="absolute bottom-8 left-1/2 -translate-x-1/2"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                <a href="#about" className="flex flex-col items-center text-gray-500 hover:text-white transition-colors">
                    <span className="text-sm mb-2">Scroll Down</span>
                    <ChevronDown className="w-6 h-6" />
                </a>
            </motion.div>
        </section>
    );
}

export default Hero;
