import { useRef, useEffect } from 'react';

const PARTICLE_COUNT = 30;
const CONNECTION_DISTANCE = 100;
const FRAME_THROTTLE = 1000 / 30; // Cap at 30fps for background effect

function InteractiveBackground({ mousePosition }) {
    const canvasRef = useRef(null);
    const particlesRef = useRef([]);
    const animationFrameRef = useRef();
    const mouseRef = useRef({ x: 0, y: 0 });
    const lastFrameTimeRef = useRef(0);
    const isVisibleRef = useRef(true);

    // Initialize particles
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        // Use lower resolution for performance
        const dpr = Math.min(window.devicePixelRatio, 1.5);

        const resizeCanvas = () => {
            const rect = canvas.getBoundingClientRect();
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
            canvas.style.width = `${rect.width}px`;
            canvas.style.height = `${rect.height}px`;

            const ctx = canvas.getContext('2d');
            ctx.scale(dpr, dpr);
        };

        resizeCanvas();

        // Debounced resize handler
        let resizeTimeout;
        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(resizeCanvas, 200);
        };

        window.addEventListener('resize', handleResize);

        // Create fewer particles
        const rect = canvas.getBoundingClientRect();
        particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
            x: Math.random() * rect.width,
            y: Math.random() * rect.height,
            baseX: Math.random() * rect.width,
            baseY: Math.random() * rect.height,
            size: Math.random() * 2 + 1,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
            hue: 240 + Math.random() * 60,
            alpha: Math.random() * 0.4 + 0.2,
        }));

        // Visibility observer to pause when not in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisibleRef.current = entry.isIntersecting;
            },
            { threshold: 0.1 }
        );
        observer.observe(canvas);

        return () => {
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
            observer.disconnect();
        };
    }, []);

    // Update mouse position
    useEffect(() => {
        if (mousePosition) {
            mouseRef.current = mousePosition;
        }
    }, [mousePosition]);

    // Optimized animation loop
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d', { alpha: true });
        const particles = particlesRef.current;

        const animate = (currentTime) => {
            // Skip frame if not visible or throttled
            if (!isVisibleRef.current) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }

            const elapsed = currentTime - lastFrameTimeRef.current;
            if (elapsed < FRAME_THROTTLE) {
                animationFrameRef.current = requestAnimationFrame(animate);
                return;
            }
            lastFrameTimeRef.current = currentTime;

            const width = canvas.width / dpr;
            const height = canvas.height / dpr;

            ctx.clearRect(0, 0, width, height);

            const mouse = mouseRef.current;
            const mouseRadius = 120;

            // Update and draw particles
            for (let i = 0; i < particles.length; i++) {
                const particle = particles[i];

                // Mouse repulsion (simplified)
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distSq = dx * dx + dy * dy; // Avoid sqrt when possible

                if (distSq < mouseRadius * mouseRadius && distSq > 0) {
                    const distance = Math.sqrt(distSq);
                    const force = (mouseRadius - distance) / mouseRadius * 2;
                    particle.x -= (dx / distance) * force;
                    particle.y -= (dy / distance) * force;
                } else {
                    particle.x += (particle.baseX - particle.x) * 0.01;
                    particle.y += (particle.baseY - particle.y) * 0.01;
                }

                // Floating motion
                particle.x += particle.speedX;
                particle.y += particle.speedY;

                // Bounds check
                if (particle.x < 0 || particle.x > width) particle.speedX *= -1;
                if (particle.y < 0 || particle.y > height) particle.speedY *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
                ctx.fillStyle = `hsla(${particle.hue}, 70%, 60%, ${particle.alpha})`;
                ctx.fill();
            }

            // Draw connections (only check nearby particles, not all)
            ctx.lineWidth = 0.5;
            for (let i = 0; i < particles.length - 1; i++) {
                const p1 = particles[i];
                for (let j = i + 1; j < Math.min(i + 5, particles.length); j++) {
                    const p2 = particles[j];
                    const dx = p1.x - p2.x;
                    const dy = p1.y - p2.y;
                    const distSq = dx * dx + dy * dy;

                    if (distSq < CONNECTION_DISTANCE * CONNECTION_DISTANCE) {
                        const opacity = 0.12 * (1 - Math.sqrt(distSq) / CONNECTION_DISTANCE);
                        ctx.beginPath();
                        ctx.moveTo(p1.x, p1.y);
                        ctx.lineTo(p2.x, p2.y);
                        ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                        ctx.stroke();
                    }
                }
            }

            // Simplified cursor glow (only if mouse is in canvas)
            if (mouse.x > 0 && mouse.y > 0 && mouse.x < width && mouse.y < height) {
                const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 150);
                gradient.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
                gradient.addColorStop(1, 'transparent');
                ctx.fillStyle = gradient;
                ctx.fillRect(mouse.x - 150, mouse.y - 150, 300, 300);
            }

            animationFrameRef.current = requestAnimationFrame(animate);
        };

        animationFrameRef.current = requestAnimationFrame(animate);

        return () => {
            if (animationFrameRef.current) {
                cancelAnimationFrame(animationFrameRef.current);
            }
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 pointer-events-none z-0"
            style={{ opacity: 0.7 }}
        />
    );
}

export default InteractiveBackground;
