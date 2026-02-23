export default function ProjectCard({ project, onClick }) {
    return (
        <div
            onClick={onClick}
            className="group relative overflow-hidden rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 shadow-xl cursor-pointer transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-white/20"
        >
            <div className="aspect-video w-full overflow-hidden">
                <img
                    src={project.image}
                    alt={project.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
            </div>
            <div className="p-6">
                <h3 className="text-xl font-bold text-cyan-400 mb-2">{project.title}</h3>
                <p className="text-gray-300 text-sm line-clamp-2 mb-4">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.slice(0, 3).map((tech) => (
                        <span
                            key={tech}
                            className="text-[10px] px-2 py-1 rounded-full bg-white/10 border border-white/20 text-emerald-200"
                        >
                            {tech}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
