import { Building2, Target, ShoppingCart, User, Phone, Settings, Check } from 'lucide-react';
import { motion } from 'framer-motion';


function Services() {
    const services = [
        {
            icon: Building2,
            title: 'Business Websites',
            description: 'Professional, modern websites for businesses of all sizes. Build trust and credibility with a stunning online presence.',
            features: ['Mobile Responsive', 'SEO Optimized', 'Fast Loading'],
            gradient: 'from-blue-500 to-cyan-500',
        },
        {
            icon: Target,
            title: 'Landing Pages',
            description: 'High-converting landing pages designed to capture leads and drive sales. Perfect for marketing campaigns.',
            features: ['Conversion Focused', 'A/B Testing Ready', 'Analytics Integrated'],
            gradient: 'from-primary-500 to-purple-500',
        },
        {
            icon: ShoppingCart,
            title: 'E-commerce Websites',
            description: 'Full-featured online stores with secure payments, inventory management, and beautiful product showcases.',
            features: ['Secure Checkout', 'Inventory System', 'Payment Integrations'],
            gradient: 'from-emerald-500 to-teal-500',
        },
        {
            icon: User,
            title: 'Portfolio Websites',
            description: 'Showcase your work with stunning portfolio websites that highlight your skills and attract clients.',
            features: ['Gallery Showcase', 'Resume Integration', 'Contact Forms'],
            gradient: 'from-pink-500 to-rose-500',
        },
        {
            icon: Phone,
            title: 'AI Automation Agent',
            description: '24/7 AI-powered phone agents that handle customer calls, book appointments, and capture leads automatically.',
            features: ['24/7 Availability', 'Natural Conversations', 'Lead Qualification'],
            gradient: 'from-amber-500 to-orange-500',
            popular: true
        },
        {
            icon: Settings,
            title: 'Custom Web Solutions',
            description: 'Tailored web applications and automation solutions built specifically for your unique business needs.',
            features: ['Custom Development', 'API Integrations', 'Workflow Automation'],
            gradient: 'from-violet-500 to-indigo-500',
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                delayChildren: 0.2
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50 },
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

    return (
        <section id="services" className="relative py-24 overflow-hidden">
            <div className="orb w-96 h-96 bg-purple-600 -top-48 right-0 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                >
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Services
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Solutions That <span className="gradient-text">Drive Results</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        From stunning websites to intelligent AI systems, I provide everything your business needs to succeed online.
                    </p>
                </motion.div>

                <motion.div
                    className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            className="card-hover glass-card rounded-3xl p-8 group relative overflow-hidden gpu"

                            whileHover={{
                                y: -8,
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                        >
                            {service.popular && (
                                <motion.div
                                    className="absolute top-4 right-4 px-3 py-1 rounded-full bg-gradient-to-r from-primary-600 to-purple-600 text-xs font-medium"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.5, type: "spring" }}
                                >
                                    Popular
                                </motion.div>
                            )}

                            <motion.div
                                className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6`}
                                whileHover={{
                                    scale: 1.15,
                                    rotate: [0, -10, 10, -10, 0],
                                }}
                                transition={{ duration: 0.5 }}
                            >
                                <service.icon className="w-7 h-7" />
                            </motion.div>

                            <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                            <p className="text-gray-400 mb-4">
                                {service.description}
                            </p>

                            <motion.ul className="space-y-2 text-sm text-gray-500">
                                {service.features.map((feature, idx) => (
                                    <motion.li
                                        key={idx}
                                        className="flex items-center gap-2"
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: idx * 0.1 }}
                                    >
                                        <Check className="w-4 h-4 text-green-400" />
                                        {feature}
                                    </motion.li>
                                ))}
                            </motion.ul>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
}

export default Services;
