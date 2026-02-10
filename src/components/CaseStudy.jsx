import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Layers, Palette, Rocket, TrendingUp, Clock, Zap, ExternalLink } from 'lucide-react';

const caseStudies = [
    {
        id: 1,
        title: 'Restaurant Booking Platform',
        client: 'Bella Italia',
        description: 'Complete digital transformation with online reservations and menu showcase.',
        stages: {
            wireframe: {
                title: 'Wireframe',
                description: 'Information architecture and user flow planning',
                details: ['User journey mapping', 'Core feature identification', 'Mobile-first approach'],
            },
            design: {
                title: 'Design',
                description: 'Visual design with brand integration',
                details: ['Custom color palette', 'Typography system', 'Component library'],
            },
            final: {
                title: 'Final Product',
                description: 'Fully functional booking system',
                details: ['Real-time availability', 'Email confirmations', 'Admin dashboard'],
            },
        },
        metrics: [
            { label: 'Load Time', value: '1.2s', icon: Clock, color: 'text-green-400' },
            { label: 'Performance', value: '98', icon: Zap, color: 'text-blue-400' },
            { label: 'Conversion', value: '+40%', icon: TrendingUp, color: 'text-purple-400' },
        ],
        techStack: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
        gradient: 'from-orange-500 to-red-600',
    },
    {
        id: 2,
        title: 'AI Voice Agent System',
        client: 'Smith Medical Clinic',
        description: 'Intelligent voice assistant for 24/7 patient appointment scheduling.',
        stages: {
            wireframe: {
                title: 'Architecture',
                description: 'System design and API planning',
                details: ['Voice flow design', 'Integration mapping', 'Fallback scenarios'],
            },
            design: {
                title: 'Development',
                description: 'AI model training and integration',
                details: ['Natural language processing', 'Calendar API sync', 'HIPAA compliance'],
            },
            final: {
                title: 'Deployment',
                description: 'Live system with monitoring',
                details: ['24/7 availability', 'Call analytics', 'Continuous learning'],
            },
        },
        metrics: [
            { label: 'Response Time', value: '0.8s', icon: Clock, color: 'text-green-400' },
            { label: 'Accuracy', value: '96%', icon: Zap, color: 'text-blue-400' },
            { label: 'Calls Handled', value: '500+/mo', icon: TrendingUp, color: 'text-purple-400' },
        ],
        techStack: ['Python', 'OpenAI', 'Twilio', 'AWS'],
        gradient: 'from-blue-500 to-cyan-600',
    },
];

const stageIcons = {
    wireframe: Layers,
    design: Palette,
    final: Rocket,
};

function CaseStudy() {
    const [activeCase, setActiveCase] = useState(0);
    const [activeStage, setActiveStage] = useState('wireframe');

    const currentCase = caseStudies[activeCase];
    const StageIcon = stageIcons[activeStage];

    return (
        <section id="casestudy" className="relative py-24 overflow-hidden bg-gradient-to-b from-transparent via-white/[0.02] to-transparent">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="orb w-80 h-80 bg-blue-600 -top-40 -right-40 opacity-20" />
            <div className="orb w-64 h-64 bg-purple-600 bottom-20 -left-32 opacity-20" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                {/* Section header */}
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Behind the Build
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Case <span className="gradient-text">Studies</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From concept to launch — see how ideas transform into high-performing digital products.
                    </p>
                </div>

                {/* Case study selector */}
                <div className="flex justify-center gap-4 mb-12">
                    {caseStudies.map((study, index) => (
                        <motion.button
                            key={study.id}
                            onClick={() => {
                                setActiveCase(index);
                                setActiveStage('wireframe');
                            }}
                            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${activeCase === index
                                    ? `bg-gradient-to-r ${study.gradient} text-white shadow-lg`
                                    : 'glass hover:bg-white/10'
                                }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {study.client}
                        </motion.button>
                    ))}
                </div>

                {/* Main case study content */}
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentCase.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="grid lg:grid-cols-2 gap-12 items-start"
                    >
                        {/* Left: Visual stages */}
                        <div className="space-y-6">
                            {/* Stage tabs */}
                            <div className="flex gap-2 p-1.5 glass rounded-2xl">
                                {Object.entries(currentCase.stages).map(([key, stage]) => {
                                    const Icon = stageIcons[key];
                                    return (
                                        <button
                                            key={key}
                                            onClick={() => setActiveStage(key)}
                                            className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${activeStage === key
                                                    ? `bg-gradient-to-r ${currentCase.gradient} text-white`
                                                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                                                }`}
                                        >
                                            <Icon className="w-4 h-4" />
                                            <span className="hidden sm:inline">{stage.title}</span>
                                        </button>
                                    );
                                })}
                            </div>

                            {/* Stage content */}
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeStage}
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    transition={{ duration: 0.2 }}
                                    className="glass-card rounded-3xl p-8 min-h-[320px] relative overflow-hidden"
                                >
                                    {/* Stage visual representation */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${currentCase.gradient} opacity-5`} />

                                    <div className="relative">
                                        <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br ${currentCase.gradient} mb-6`}>
                                            <StageIcon className="w-7 h-7 text-white" />
                                        </div>

                                        <h4 className="text-xl font-semibold mb-2">
                                            {currentCase.stages[activeStage].title}
                                        </h4>
                                        <p className="text-gray-400 mb-6">
                                            {currentCase.stages[activeStage].description}
                                        </p>

                                        <ul className="space-y-3">
                                            {currentCase.stages[activeStage].details.map((detail, i) => (
                                                <motion.li
                                                    key={i}
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: i * 0.1 }}
                                                    className="flex items-center gap-3"
                                                >
                                                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${currentCase.gradient}`} />
                                                    <span className="text-gray-300">{detail}</span>
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Progress indicator */}
                                    <div className="absolute bottom-6 left-8 right-8">
                                        <div className="flex gap-2">
                                            {Object.keys(currentCase.stages).map((key, i) => (
                                                <div
                                                    key={key}
                                                    className={`flex-1 h-1 rounded-full transition-all duration-300 ${Object.keys(currentCase.stages).indexOf(activeStage) >= i
                                                            ? `bg-gradient-to-r ${currentCase.gradient}`
                                                            : 'bg-white/10'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* Right: Details & Metrics */}
                        <div className="space-y-6">
                            {/* Project info */}
                            <div className="glass-card rounded-3xl p-8">
                                <h3 className="text-2xl font-bold mb-2">{currentCase.title}</h3>
                                <p className="text-gray-400 mb-6">{currentCase.description}</p>

                                {/* Tech stack */}
                                <div className="mb-6">
                                    <h5 className="text-sm text-gray-500 mb-3">Tech Stack</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {currentCase.techStack.map((tech, i) => (
                                            <motion.span
                                                key={tech}
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                transition={{ delay: i * 0.1 }}
                                                className="px-3 py-1.5 rounded-full bg-white/5 text-sm text-gray-300 border border-white/10"
                                            >
                                                {tech}
                                            </motion.span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Metrics */}
                            <div className="grid grid-cols-3 gap-4">
                                {currentCase.metrics.map((metric, i) => {
                                    const Icon = metric.icon;
                                    return (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 + 0.3 }}
                                            className="glass-card rounded-2xl p-4 text-center"
                                        >
                                            <Icon className={`w-5 h-5 ${metric.color} mx-auto mb-2`} />
                                            <div className={`text-2xl font-bold ${metric.color}`}>
                                                {metric.value}
                                            </div>
                                            <div className="text-xs text-gray-500 mt-1">
                                                {metric.label}
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            {/* CTA */}
                            <motion.a
                                href="#contact"
                                className={`flex items-center justify-center gap-2 w-full py-4 rounded-2xl bg-gradient-to-r ${currentCase.gradient} font-semibold text-lg shadow-lg hover:shadow-xl transition-all`}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                Start Your Project
                                <ExternalLink className="w-5 h-5" />
                            </motion.a>
                        </div>
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}

export default CaseStudy;
