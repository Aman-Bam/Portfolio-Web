import { Code, Brain, Rocket, HeartHandshake, MessageCircle } from 'lucide-react';

function About() {
    return (
        <section id="about" className="relative py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-2 gap-16 items-center">
                    {/* Left - Image/Visual */}
                    <div className="reveal">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-3xl blur-2xl opacity-20"></div>
                            <div className="relative glass-card rounded-3xl p-8">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="glass rounded-2xl p-6 text-center">
                                        <Code className="w-10 h-10 mx-auto mb-3 text-primary-400" />
                                        <h4 className="font-semibold">Full-Stack Web Developer</h4>
                                        <p className="text-sm text-gray-400 mt-1">Scalable, High-Performance App</p>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center">
                                        <Brain className="w-10 h-10 mx-auto mb-3 text-purple-400" />
                                        <h4 className="font-semibold">AI Expert</h4>
                                        <p className="text-sm text-gray-400 mt-1">Intelligent Automation Systems</p>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center">
                                        <Rocket className="w-10 h-10 mx-auto mb-3 text-pink-400" />
                                        <h4 className="font-semibold">Fast Delivery</h4>
                                        <p className="text-sm text-gray-400 mt-1">Efficient & Reliable Execution</p>
                                    </div>
                                    <div className="glass rounded-2xl p-6 text-center">
                                        <HeartHandshake className="w-10 h-10 mx-auto mb-3 text-rose-400" />
                                        <h4 className="font-semibold">Dedicated Support</h4>
                                        <p className="text-sm text-gray-400 mt-1">Always Available</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right - Content */}
                    <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                        <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                            About Me
                        </span>
                        <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                            Hi, I&apos;m <span className="gradient-text">Aman</span> — Your Tech Partner for Business Growth
                        </h2>
                        <p className="text-gray-400 text-lg mb-6">
                            I design and develop modern web solutions and AI automation that help businesses grow digitally. Leveraging cutting-edge web technologies and intelligent AI agents, I deliver systems built to perform 24/7.
                        </p>
                        <p className="text-gray-400 mb-8">
                            From local restaurants and medical clinics to coaches and personal brands, I build digital solutions designed to attract and convert customers. Every project is delivered with a focus on speed, affordability, and results-driven design.
                        </p>

                        {/* Skills */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            <span className="px-4 py-2 rounded-full glass text-sm">Full Stack Systems</span>
                            <span className="px-4 py-2 rounded-full glass text-sm">UI/UX</span>
                            <span className="px-4 py-2 rounded-full glass text-sm">REST API Development</span>
                            <span className="px-4 py-2 rounded-full glass text-sm">AI/ML</span>
                            <span className="px-4 py-2 rounded-full glass text-sm">AI Automation</span>
                        </div>

                        <a href="#contact" className="btn-glow inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full font-semibold">
                            <MessageCircle className="w-5 h-5" />
                            Let&apos;s Work Together
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default About;
