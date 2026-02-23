export default function ProjectModal({ project, onClose }) {
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
            <div className="bg-gray-900 border border-white/10 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative animate-in zoom-in-95 duration-300">
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors"
                >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <div className="flex flex-col md:flex-row">
                    <div className="md:w-1/2">
                        <img
                            src={project.image}
                            alt={project.title}
                            className="w-full h-full object-cover min-h-[300px]"
                        />
                    </div>
                    <div className="md:w-1/2 p-8">
                        <h2 className="text-3xl font-bold text-cyan-400 mb-4">{project.title}</h2>

                        <div className="mb-6">
                            <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-widest mb-2">Technologies</h4>
                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech) => (
                                    <span key={tech} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-sm text-white/80">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-8">
                            <h4 className="text-sm font-semibold text-emerald-200 uppercase tracking-widest mb-2">Details</h4>
                            <p className="text-gray-300 leading-relaxed">
                                {project.longDescription}
                            </p>
                        </div>

                        <a
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-6 py-3 bg-cyan-500 text-black font-bold rounded-full hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20"
                        >
                            View Source
                            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
