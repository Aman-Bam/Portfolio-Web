import { useState, useRef } from 'react';
import emailjs from '@emailjs/browser';
import { Send, MessageCircle, Mail, Clock, CalendarCheck, ArrowRight } from 'lucide-react';

function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        business: '',
        message: ''
    });
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validateField = (name, value) => {
        switch (name) {
            case 'name':
                return value.trim().length >= 2 ? '' : 'Please enter your name';
            case 'email':
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? '' : 'Please enter a valid email address';
            case 'phone':
                return /^[+]?[(]?[0-9]{1,4}[)]?[-\s./0-9]*$/.test(value) && value.length >= 10 ? '' : 'Please enter a valid phone number';
            case 'business':
                return value !== '' ? '' : 'Please select your business type';
            default:
                return '';
        }
    };

    const handleBlur = (e) => {
        const { name, value } = e.target;
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    const formRef = useRef();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validate all fields
        const newErrors = {
            name: validateField('name', formData.name),
            email: validateField('email', formData.email),
            phone: validateField('phone', formData.phone),
            business: validateField('business', formData.business)
        };

        setErrors(newErrors);

        if (Object.values(newErrors).some(error => error !== '')) {
            return;
        }

        setIsSubmitting(true);

        try {
            // REPLACE THESE WITH YOUR ACTUAL EMAILJS KEYS
            // Service ID, Template ID, Public Key
            await emailjs.sendForm(
                'service_1icvjck', // Service ID
                'template_fgpktlu', // Template ID
                formRef.current,
                'uHXVHHY-KbkF2fUML'  // Public Key
            );

            setIsSuccess(true);
            setTimeout(() => {
                setFormData({ name: '', email: '', phone: '', business: '', message: '' });
                setIsSuccess(false);
            }, 5000);
        } catch (error) {
            console.error('EmailJS Error:', error);
            alert('Failed to send message. Please try again or contact via WhatsApp.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <section id="contact" className="relative py-24 overflow-hidden">
            <div className="orb w-80 h-80 bg-primary-600 -bottom-40 -left-40 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Contact
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Let&apos;s <span className="gradient-text">Talk</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Have a project in mind? Fill out the form below and I&apos;ll get back to you within 24 hours.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    {/* Contact Form */}
                    <div className="reveal">
                        {!isSuccess ? (
                            <form ref={formRef} onSubmit={handleSubmit} className="glass-card rounded-3xl p-8">
                                <div className="space-y-6">
                                    {/* Name */}
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium mb-2">Full Name *</label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`input-focus w-full px-4 py-3 rounded-xl bg-dark-700/50 border ${errors.name ? 'border-red-500' : 'border-white/10'} focus:outline-none placeholder-gray-500`}
                                            placeholder="John Smith"
                                        />
                                        {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                                    </div>

                                    {/* Email */}
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium mb-2">Email Address *</label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`input-focus w-full px-4 py-3 rounded-xl bg-dark-700/50 border ${errors.email ? 'border-red-500' : 'border-white/10'} focus:outline-none placeholder-gray-500`}
                                            placeholder="john@example.com"
                                        />
                                        {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                                    </div>

                                    {/* Phone */}
                                    <div>
                                        <label htmlFor="phone" className="block text-sm font-medium mb-2">Phone Number *</label>
                                        <input
                                            type="tel"
                                            id="phone"
                                            name="phone"
                                            value={formData.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`input-focus w-full px-4 py-3 rounded-xl bg-dark-700/50 border ${errors.phone ? 'border-red-500' : 'border-white/10'} focus:outline-none placeholder-gray-500`}
                                            placeholder="+1 (555) 123-4567"
                                        />
                                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                                    </div>

                                    {/* Business Type */}
                                    <div>
                                        <label htmlFor="business" className="block text-sm font-medium mb-2">Business Type *</label>
                                        <select
                                            id="business"
                                            name="business"
                                            value={formData.business}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            required
                                            className={`input-focus w-full px-4 py-3 rounded-xl bg-dark-700/50 border ${errors.business ? 'border-red-500' : 'border-white/10'} focus:outline-none text-white`}
                                        >
                                            <option value="" className="bg-dark-800">Select your business type</option>
                                            <option value="restaurant" className="bg-dark-800">Restaurant / Cafe</option>
                                            <option value="healthcare" className="bg-dark-800">Healthcare / Clinic</option>
                                            <option value="coach" className="bg-dark-800">Coach / Consultant</option>
                                            <option value="retail" className="bg-dark-800">Retail / E-commerce</option>
                                            <option value="startup" className="bg-dark-800">Startup</option>
                                            <option value="other" className="bg-dark-800">Other</option>
                                        </select>
                                        {errors.business && <p className="text-red-400 text-sm mt-1">{errors.business}</p>}
                                    </div>

                                    {/* Message */}
                                    <div>
                                        <label htmlFor="message" className="block text-sm font-medium mb-2">Your Message (Optional)</label>
                                        <textarea
                                            id="message"
                                            name="message"
                                            value={formData.message}
                                            onChange={handleChange}
                                            rows="4"
                                            className="input-focus w-full px-4 py-3 rounded-xl bg-dark-700/50 border border-white/10 focus:outline-none placeholder-gray-500 resize-none"
                                            placeholder="Tell me about your project..."
                                        ></textarea>
                                    </div>

                                    {/* Submit Button */}
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="btn-glow w-full py-4 bg-gradient-to-r from-primary-600 to-purple-600 rounded-xl font-semibold text-lg flex items-center justify-center gap-2 disabled:opacity-50"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"></span>
                                                Sending...
                                            </>
                                        ) : (
                                            <>
                                                <Send className="w-5 h-5" />
                                                <span>Send Message</span>
                                            </>
                                        )}
                                    </button>
                                </div>
                            </form>
                        ) : (
                            <div className="glass-card rounded-3xl p-8 text-center">
                                <div className="w-20 h-20 rounded-full bg-green-500/20 flex items-center justify-center mx-auto mb-6">
                                    <Send className="w-10 h-10 text-green-400" />
                                </div>
                                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                                <p className="text-gray-400">Thank you for reaching out. I&apos;ll get back to you within 24 hours.</p>
                            </div>
                        )}
                    </div>

                    {/* Contact Info */}
                    <div className="reveal" style={{ transitionDelay: '0.2s' }}>
                        <div className="space-y-6">
                            {/* WhatsApp */}
                            <a href="https://wa.me/919259269317" target="_blank" rel="noopener noreferrer" className="block card-hover glass-card rounded-2xl p-6 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-green-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <MessageCircle className="w-7 h-7 text-green-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">WhatsApp</h4>
                                        <p className="text-gray-400">+91 9259269317</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 ml-auto text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </a>

                            {/* Email */}
                            <a href="mailto:amanbam6040@gmail.com" className="block card-hover glass-card rounded-2xl p-6 group">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-primary-500/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <Mail className="w-7 h-7 text-primary-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Email</h4>
                                        <p className="text-gray-400">amanbam6040@gmail.com</p>
                                    </div>
                                    <ArrowRight className="w-5 h-5 ml-auto text-gray-500 group-hover:text-white group-hover:translate-x-1 transition-all" />
                                </div>
                            </a>

                            {/* Response Time */}
                            <div className="glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-amber-500/20 flex items-center justify-center">
                                        <Clock className="w-7 h-7 text-amber-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Response Time</h4>
                                        <p className="text-gray-400">Within 24 hours</p>
                                    </div>
                                </div>
                            </div>

                            {/* Availability */}
                            <div className="glass-card rounded-2xl p-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-14 h-14 rounded-xl bg-purple-500/20 flex items-center justify-center">
                                        <CalendarCheck className="w-7 h-7 text-purple-400" />
                                    </div>
                                    <div>
                                        <h4 className="font-semibold mb-1">Availability</h4>
                                        <p className="text-gray-400">Mon - Sat, 9 AM - 7 PM</p>
                                    </div>
                                </div>
                            </div>

                            {/* Social Links */}
                            <div className="pt-6 border-t border-white/10">
                                <h4 className="font-semibold mb-4">Follow Me</h4>
                                <div className="flex gap-4">
                                    <a href="https://github.com/Aman-Bam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <a href="https://www.instagram.com/amanbam__/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                    <a href="https://www.linkedin.com/in/aman-bam" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-xl glass flex items-center justify-center hover:bg-white/10 transition-colors">
                                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                            <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                                        </svg>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Contact;
