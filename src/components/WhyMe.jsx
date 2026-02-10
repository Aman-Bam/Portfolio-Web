import { Zap, DollarSign, Headphones, Search, Smartphone, Sparkles } from 'lucide-react';

function WhyMe() {
    const features = [
        {
            icon: Zap,
            title: 'Fast Delivery',
            description: 'Get your website live in days, not weeks. Quick turnaround without compromising quality.',
            gradient: 'from-green-500/20 to-emerald-500/20',
            iconColor: 'text-green-400',
            delay: '0s'
        },
        {
            icon: DollarSign,
            title: 'Affordable Pricing',
            description: 'Premium quality at prices that make sense for small businesses. No hidden fees.',
            gradient: 'from-blue-500/20 to-cyan-500/20',
            iconColor: 'text-blue-400',
            delay: '0.1s'
        },
        {
            icon: Headphones,
            title: 'Personal Support',
            description: 'Direct communication with me throughout the project. No middlemen or ticket systems.',
            gradient: 'from-purple-500/20 to-pink-500/20',
            iconColor: 'text-purple-400',
            delay: '0.2s'
        },
        {
            icon: Search,
            title: 'SEO Friendly',
            description: 'Every website is built with SEO best practices to help you rank higher on Google.',
            gradient: 'from-amber-500/20 to-orange-500/20',
            iconColor: 'text-amber-400',
            delay: '0.3s'
        },
        {
            icon: Smartphone,
            title: 'Mobile Responsive',
            description: 'Looks perfect on every device — phones, tablets, and desktops. Modern responsive design.',
            gradient: 'from-rose-500/20 to-red-500/20',
            iconColor: 'text-rose-400',
            delay: '0.4s'
        },
        {
            icon: Sparkles,
            title: 'Modern Design',
            description: 'Cutting-edge aesthetics that make your brand stand out. No outdated templates.',
            gradient: 'from-indigo-500/20 to-violet-500/20',
            iconColor: 'text-indigo-400',
            delay: '0.5s'
        }
    ];

    return (
        <section id="why-me" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Why Choose Me
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Built for <span className="gradient-text">Your Success</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        I&apos;m committed to delivering exceptional results that help your business grow. Here&apos;s what sets me apart.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="reveal flex items-start gap-4 p-6 glass-card rounded-2xl"
                            style={{ transitionDelay: feature.delay }}
                        >
                            <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center flex-shrink-0`}>
                                <feature.icon className={`w-6 h-6 ${feature.iconColor}`} />
                            </div>
                            <div>
                                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                                <p className="text-gray-400 text-sm">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default WhyMe;
