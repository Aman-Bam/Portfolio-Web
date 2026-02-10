import { memo } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';

const sections = [
    { id: 'hero', label: 'Home', color: '#6366f1' },
    { id: 'about', label: 'About', color: '#8b5cf6' },
    { id: 'services', label: 'Services', color: '#a855f7' },
    { id: 'why-me', label: 'Why Me', color: '#ec4899' },
    { id: 'portfolio', label: 'Work', color: '#f59e0b' },
    { id: 'casestudy', label: 'Case Study', color: '#10b981' },
    { id: 'how-it-works', label: 'Process', color: '#06b6d4' },
    { id: 'testimonials', label: 'Reviews', color: '#3b82f6' },
    { id: 'contact', label: 'Contact', color: '#6366f1' },
];

const ScrollProgress = memo(function ScrollProgress() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 30, // Much softer spring
        damping: 30,   // More damping
        restDelta: 0.001 // Higher precision
    });

    const handleClick = (id) => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <>
            {/* Main progress bar - using transform for GPU acceleration */}
            <motion.div
                className="fixed top-0 left-0 right-0 h-1 z-[9999] origin-left will-change-transform"
                style={{
                    scaleX,
                    background: 'linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #ec4899, #f59e0b, #10b981, #06b6d4, #3b82f6, #6366f1)',
                }}
            />

            {/* Section markers - desktop only, simplified */}
            <div className="fixed top-4 left-1/2 -translate-x-1/2 z-[9998] hidden lg:flex items-center gap-1.5 px-4 py-2 glass rounded-full">
                {sections.map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleClick(section.id)}
                        className="group relative p-1 hover:scale-125 transition-transform"
                        aria-label={`Go to ${section.label}`}
                    >
                        <div
                            className="w-2 h-2 rounded-full opacity-40 hover:opacity-100 transition-opacity"
                            style={{ backgroundColor: section.color }}
                        />

                        {/* Simple CSS tooltip */}
                        <span className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-2 py-1 bg-gray-900/95 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                            {section.label}
                        </span>
                    </button>
                ))}
            </div>

            {/* Mobile indicator - simplified, fewer items */}
            <div className="fixed right-2 top-1/2 -translate-y-1/2 z-[9998] lg:hidden flex flex-col items-center gap-1.5 px-1.5 py-3 glass rounded-full">
                {sections.filter((_, i) => i % 2 === 0).map((section) => (
                    <button
                        key={section.id}
                        onClick={() => handleClick(section.id)}
                        className="w-1.5 h-1.5 rounded-full opacity-50 hover:opacity-100 hover:scale-150 transition-all"
                        style={{ backgroundColor: section.color }}
                        aria-label={`Go to ${section.label}`}
                    />
                ))}
            </div>
        </>
    );
});

export default ScrollProgress;
