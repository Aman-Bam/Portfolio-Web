import { MessageSquare, Code, Rocket } from 'lucide-react';

function HowItWorks() {
    const steps = [
        {
            icon: MessageSquare,
            number: 1,
            title: 'Share Your Requirements',
            description: "Tell me about your business, goals, and what you need. We'll discuss your vision and requirements in detail.",
            gradient: 'from-primary-600 to-purple-600',
            borderColor: 'border-primary-500',
            delay: '0s'
        },
        {
            icon: Code,
            number: 2,
            title: 'I Design & Develop',
            description: "I create your custom solution with regular updates. You'll see progress and can provide feedback along the way.",
            gradient: 'from-purple-600 to-pink-600',
            borderColor: 'border-purple-500',
            delay: '0.2s'
        },
        {
            icon: Rocket,
            number: 3,
            title: 'You Get Customers Online',
            description: 'Your website goes live and starts attracting customers. I provide support to ensure everything runs smoothly.',
            gradient: 'from-pink-600 to-rose-600',
            borderColor: 'border-pink-500',
            delay: '0.4s'
        }
    ];

    return (
        <section id="how-it-works" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-dark-900 via-dark-800 to-dark-900"></div>

            <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Process
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        How It <span className="gradient-text">Works</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Getting your website or AI solution is simple. Here&apos;s my streamlined process.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 steps-container">
                    {steps.map((step, index) => (
                        <div key={index} className="reveal text-center" style={{ transitionDelay: step.delay }}>
                            <div className="relative inline-block mb-6">
                                <div className={`w-24 h-24 rounded-3xl bg-gradient-to-br ${step.gradient} flex items-center justify-center mx-auto`}>
                                    <step.icon className="w-10 h-10" />
                                </div>
                                <div className={`absolute -top-2 -right-2 w-10 h-10 rounded-full bg-dark-900 border-2 ${step.borderColor} flex items-center justify-center text-lg font-bold`}>
                                    {step.number}
                                </div>
                            </div>
                            <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                            <p className="text-gray-400">
                                {step.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default HowItWorks;
