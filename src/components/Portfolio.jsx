import { getImg, getVideo } from '../utils/imageKit';

function Portfolio() {
    const projects = [
        {
            title: 'Dental Clinic Management System',
            description: 'Full-stack dental clinic web app with authentication, appointment booking, admin dashboard, and Supabase database.',
            image: getImg('Project_img/dental.webp'),
            link: 'https://dental-theta-ruby.vercel.app/',
            tags: ['Healthcare', 'Full-Stack', 'Supabase'],
            tagColors: ['bg-primary-500/30 text-primary-300', 'bg-purple-500/30 text-purple-300', 'bg-emerald-500/30 text-emerald-300']
        },
        {
            title: 'Apuni Sarkar – Citizen Services Portal',
            description: 'Full-stack government-style citizen services platform with authentication, service requests, admin panel, and database integration.',
            image: getImg('Project_img/apuni-sarkar.webp'),
            link: 'https://apuni-sarkar-citizen-services-done.vercel.app/',
            tags: ['Government', 'Full-Stack', 'Dashboard'],
            tagColors: ['bg-blue-500/30 text-blue-300', 'bg-purple-500/30 text-purple-300', 'bg-emerald-500/30 text-emerald-300']
        },
        {
            title: 'Real Estate Marketplace',
            description: 'Property listing platform with search, filters, property details pages, and responsive UI for buyers and sellers.',
            image: getImg('Project_img/real-estate.png'),
            link: 'https://aman-bam.github.io/real-estate-marketplace/',
            tags: ['Marketplace', 'Listings', 'Responsive'],
            tagColors: ['bg-orange-500/30 text-orange-300', 'bg-blue-500/30 text-blue-300', 'bg-emerald-500/30 text-emerald-300']
        },
        {
            title: 'SuperJarvis – AI Voice Assistant',
            description: 'Intelligent AI assistant with voice interaction, task automation, and smart responses.',
            video: getVideo('Project_img/superjarvis.mp4'),
            link: 'https://github.com/Aman-Bam/SuperJARVIS',
            tags: ['AI', 'Voice', 'Automation'],
            tagColors: ['bg-emerald-500/30 text-emerald-300', 'bg-purple-500/30 text-purple-300', 'bg-blue-500/30 text-blue-300']
        }
    ];

    return (
        <section id="portfolio" className="relative py-24 overflow-hidden">
            <div className="orb w-80 h-80 bg-primary-600 bottom-0 -left-40 opacity-30"></div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-16 reveal">
                    <span className="inline-block px-4 py-2 rounded-full glass text-primary-400 text-sm font-medium mb-4">
                        Portfolio
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        Recent <span className="gradient-text">Projects</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Take a look at some of the projects I&apos;ve delivered for happy clients across different industries.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8">
                    {projects.map((project, index) => (
                        <a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="reveal card-hover group block"
                        >
                            <div className="relative rounded-3xl overflow-hidden">
                                {/* Image or Video */}
                                <div className="aspect-video overflow-hidden bg-black">
                                    {project.video ? (
                                        <video
                                            key={project.video}
                                            className="w-full h-full object-cover"
                                            autoPlay
                                            muted
                                            loop
                                            playsInline
                                            preload="metadata"
                                        >
                                            <source src={project.video} type="video/mp4" />
                                        </video>
                                    ) : (
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                    )}
                                </div>

                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <div>
                                        <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                                        <p className="text-white text-sm mb-3">
                                            {project.description}
                                        </p>
                                        <div className="flex gap-2 flex-wrap">
                                            {project.tags.map((tag, idx) => (
                                                <span key={idx} className={`px-3 py-1 rounded-full ${project.tagColors[idx]} text-xs`}>
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Portfolio;
