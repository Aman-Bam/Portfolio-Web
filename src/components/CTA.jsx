import { Sparkles, Send, MessageCircle } from 'lucide-react';

function CTA() {
    return (
        <section id="cta" className="relative py-24 overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-900/50 via-purple-900/50 to-pink-900/50"></div>
            <div className="absolute inset-0 bg-grid opacity-30"></div>

            <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center reveal">
                <div className="inline-flex items-center px-4 py-2 rounded-full glass mb-6">
                    <Sparkles className="w-4 h-4 mr-2 text-yellow-400" />
                    <span className="text-sm">Limited Availability This Month</span>
                </div>

                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">
                    Ready to Take Your <span className="gradient-text">Business Online?</span>
                </h2>

                <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
                    Let&apos;s create something amazing together. Get a modern website or AI voice agent that works for you 24/7.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a href="#contact" className="btn-glow px-10 py-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-full font-semibold text-lg inline-flex items-center justify-center gap-2">
                        <Send className="w-5 h-5" />
                        Contact Me Now
                    </a>
                    <a href="https://wa.me/919259269317" target="_blank" rel="noopener noreferrer" className="px-10 py-4 rounded-full font-semibold text-lg glass hover:bg-white/10 transition-all inline-flex items-center justify-center gap-2">
                        <MessageCircle className="w-5 h-5 text-green-400" />
                        WhatsApp Me
                    </a>
                </div>
            </div>
        </section>
    );
}

export default CTA;
