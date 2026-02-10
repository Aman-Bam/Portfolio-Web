import { useEffect, useCallback, useRef } from 'react';
import SoundManager from '../utils/SoundManager';

const sections = [
    'hero',
    'about',
    'services',
    'why-me',
    'portfolio',
    'casestudy',
    'how-it-works',
    'testimonials',
    'cta',
    'contact',
];

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];

export function useKeyboardNav({ onToggleMute, onToggleTheme, onToggleShortcuts }) {
    const currentSectionIndex = useRef(0);
    const konamiIndex = useRef(0);

    const scrollToSection = useCallback((index) => {
        const clampedIndex = Math.max(0, Math.min(sections.length - 1, index));
        const section = document.getElementById(sections[clampedIndex]);

        if (section) {
            currentSectionIndex.current = clampedIndex;
            section.scrollIntoView({ behavior: 'smooth' });
            SoundManager.whoosh();
        }
    }, []);

    const handleKeyDown = useCallback((e) => {
        // Skip if user is typing in an input
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
            return;
        }

        // Konami code detection
        if (e.code === konamiCode[konamiIndex.current]) {
            konamiIndex.current++;
            if (konamiIndex.current === konamiCode.length) {
                konamiIndex.current = 0;
                // Trigger easter egg
                window.dispatchEvent(new CustomEvent('konamiCode'));
                SoundManager.success();
            }
        } else {
            konamiIndex.current = 0;
        }

        switch (e.code) {
            case 'ArrowDown':
            case 'KeyJ':
                e.preventDefault();
                scrollToSection(currentSectionIndex.current + 1);
                break;

            case 'ArrowUp':
            case 'KeyK':
                e.preventDefault();
                scrollToSection(currentSectionIndex.current - 1);
                break;

            case 'Home':
                e.preventDefault();
                scrollToSection(0);
                break;

            case 'End':
                e.preventDefault();
                scrollToSection(sections.length - 1);
                break;

            case 'KeyM':
                if (onToggleMute) {
                    onToggleMute();
                    SoundManager.pop();
                }
                break;

            case 'KeyT':
                if (onToggleTheme) {
                    onToggleTheme();
                    SoundManager.transition();
                }
                break;

            case 'Slash':
                if (e.shiftKey) { // '?' key
                    e.preventDefault();
                    if (onToggleShortcuts) {
                        onToggleShortcuts();
                        SoundManager.pop();
                    }
                }
                break;

            case 'Escape':
                if (onToggleShortcuts) {
                    onToggleShortcuts(false);
                }
                break;

            // Number keys 1-9 for direct section navigation
            case 'Digit1':
            case 'Digit2':
            case 'Digit3':
            case 'Digit4':
            case 'Digit5':
            case 'Digit6':
            case 'Digit7':
            case 'Digit8':
            case 'Digit9':
                if (!e.ctrlKey && !e.altKey && !e.metaKey) {
                    const index = parseInt(e.code.replace('Digit', '')) - 1;
                    if (index < sections.length) {
                        e.preventDefault();
                        scrollToSection(index);
                    }
                }
                break;
        }
    }, [scrollToSection, onToggleMute, onToggleTheme, onToggleShortcuts]);

    // Update current section based on intersection
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        const index = sections.indexOf(entry.target.id);
                        if (index !== -1) {
                            currentSectionIndex.current = index;
                        }
                    }
                });
            },
            {
                root: null,
                rootMargin: '-45% 0px -45% 0px', // Active when element is in middle 10% of screen
                threshold: 0
            }
        );

        sections.forEach(id => {
            const element = document.getElementById(id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handleKeyDown]);

    return {
        currentSection: sections[0], // simplified for now, as dynamic update needs state not ref
        scrollToSection,
        sections,
    };
}

export default useKeyboardNav;
