import { Star, Quote, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { getImg } from '../utils/imageKit';

function Testimonials() {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const testimonials = [
        {
            rating: 5,
            text: "Aman built our restaurant website in just one week! The design is beautiful and we've seen a 40% increase in online reservations. Highly recommended!",
            author: 'Marco Rodriguez',
            role: 'Owner, Bella Italia Restaurant',
            image: getImg('testimonials/marco.webp'),
            chapter: 'Chapter 1',
            title: 'The Restaurant Revival',
            journey: 'From empty tables to fully booked weekends',
            accentColor: 'from-orange-500 to-red-500',
            bgPattern: 'radial-gradient(circle at 20% 80%, rgba(251, 146, 60, 0.1) 0%, transparent 50%)',
        },
        {
            rating: 5,
            text: "The AI voice agent Aman set up for my clinic handles after-hours calls perfectly. Patients love being able to book appointments anytime. Game changer!",
            author: 'Dr. Sarah Mitchell',
            role: 'Director, Smith Medical Clinic',
            image: getImg('testimonials/sarah.webp'),
            chapter: 'Chapter 2',
            title: 'The 24/7 Solution',
            journey: 'From missed calls to round-the-clock care',
            accentColor: 'from-blue-500 to-cyan-500',
            bgPattern: 'radial-gradient(circle at 80% 20%, rgba(59, 130, 246, 0.1) 0%, transparent 50%)',
        },
        {
            rating: 5,
            text: "My landing page converts like crazy! Aman understood exactly what I needed and delivered beyond expectations. Professional, fast, and affordable.",
            author: 'Jennifer Adams',
            role: 'Life Coach & Consultant',
            image: getImg('testimonials/jennifer.webp'),
            chapter: 'Chapter 3',
            title: 'The Conversion Catalyst',
            journey: 'From visitors to loyal clients',
            accentColor: 'from-purple-500 to-pink-500',
            bgPattern: 'radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.1) 0%, transparent 50%)',
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
            }
        }
    };

    const cardVariants = {
        hidden: { opacity: 0, y: 50, rotateX: -10 },
        visible: {
            opacity: 1,
            y: 0,
            rotateX: 0,
            transition: {
                type: 'spring',
                stiffness: 100,
                damping: 20,
            }
        }
    };

    return (
        <section id="testimonials" className="relative py-24 overflow-hidden">
            {/* Background elements */}
            <div className="orb w-96 h-96 bg-purple-600 top-1/2 -right-48 opacity-20" />
            <div className="absolute inset-0 bg-grid opacity-20" />

            {/* Timeline connector line */}
            <div className="absolute left-1/2 top-40 bottom-40 w-px bg-gradient-to-b from-transparent via-primary-500/30 to-transparent hidden lg:block" />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Success Stories
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Client <span className="gradient-text">Journeys</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Every project tells a story. Here are the transformations that made a difference.
                    </p>
                </div>

                {/* Story cards grid */}
                <motion.div
                    className="grid lg:grid-cols-3 gap-8 relative"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {testimonials.map((testimonial, index) => (
                        <motion.div
                            key={index}
                            className="relative group"
                            variants={cardVariants}
                            onMouseEnter={() => setHoveredIndex(index)}
                            onMouseLeave={() => setHoveredIndex(null)}
                        >
                            {/* Card */}
                            <motion.div
                                className="relative glass-card rounded-3xl p-8 h-full overflow-hidden cursor-pointer"
                                whileHover={{
                                    y: -8,
                                    transition: { type: 'spring', stiffness: 300, damping: 20 }
                                }}
                                style={{ background: testimonial.bgPattern }}
                            >
                                {/* Chapter badge */}
                                <div className="flex items-center justify-between mb-6">
                                    <span className={`text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r ${testimonial.accentColor} text-white`}>
                                        {testimonial.chapter}
                                    </span>
                                    <div className="flex items-center gap-0.5">
                                        {[...Array(testimonial.rating)].map((_, i) => (
                                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                        ))}
                                    </div>
                                </div>

                                {/* Story title */}
                                <h3 className="text-xl font-bold mb-2">{testimonial.title}</h3>
                                <p className={`text-sm font-medium bg-gradient-to-r ${testimonial.accentColor} bg-clip-text text-transparent mb-4`}>
                                    {testimonial.journey}
                                </p>

                                {/* Quote icon */}
                                <div className="absolute -right-4 -top-4 opacity-10">
                                    <Quote className="w-24 h-24" />
                                </div>

                                {/* Testimonial text */}
                                <div className="relative">
                                    <p className="text-gray-300 leading-relaxed mb-6 relative z-10">
                                        &quot;{testimonial.text}&quot;
                                    </p>
                                </div>

                                {/* Author info */}
                                <div className="flex items-center gap-4 pt-6 border-t border-white/10">
                                    <motion.div
                                        className="relative"
                                        whileHover={{ scale: 1.1 }}
                                    >
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.author}
                                            className="w-14 h-14 rounded-full object-cover"
                                        />
                                        <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${testimonial.accentColor} opacity-0 group-hover:opacity-30 transition-opacity`} />
                                    </motion.div>
                                    <div className="flex-1">
                                        <h4 className="font-semibold text-white">{testimonial.author}</h4>
                                        <p className="text-sm text-gray-500">{testimonial.role}</p>
                                    </div>
                                    <motion.div
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{
                                            opacity: hoveredIndex === index ? 1 : 0,
                                            x: hoveredIndex === index ? 0 : -10
                                        }}
                                        className={`p-2 rounded-full bg-gradient-to-r ${testimonial.accentColor}`}
                                    >
                                        <ArrowRight className="w-4 h-4 text-white" />
                                    </motion.div>
                                </div>

                                {/* Hover glow effect */}
                                <motion.div
                                    className={`absolute inset-0 rounded-3xl bg-gradient-to-r ${testimonial.accentColor} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                                />
                            </motion.div>

                            {/* Timeline dot (desktop only) */}
                            <div className="hidden lg:block absolute -left-[calc(50vw-50%)] top-1/2 -translate-y-1/2">
                                <motion.div
                                    className={`w-4 h-4 rounded-full bg-gradient-to-r ${testimonial.accentColor} shadow-lg`}
                                    animate={{
                                        scale: hoveredIndex === index ? 1.5 : 1,
                                        boxShadow: hoveredIndex === index
                                            ? '0 0 20px rgba(99, 102, 241, 0.5)'
                                            : '0 0 0px rgba(99, 102, 241, 0)',
                                    }}
                                />
                            </div>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Bottom CTA */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                >
                    <p className="text-gray-500 mb-4">Ready to write your success story?</p>
                    <a
                        href="#contact"
                        className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors font-medium"
                    >
                        Start your chapter
                        <ArrowRight className="w-4 h-4" />
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

export default Testimonials;
