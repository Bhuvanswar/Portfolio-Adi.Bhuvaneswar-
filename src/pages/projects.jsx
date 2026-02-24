import { useState, useEffect } from "react";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";
import { supabase } from "../supabaseClient";

export default function Projects() {
    const [selectedProject, setSelectedProject] = useState(null);
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const { data, error } = await supabase
                    .from("projects")
                    .select("*")
                    .order("title", { ascending: true });
                
                if (error) throw error;
                setProjects(data || []);
            } catch (err) {
                console.error("Error fetching projects:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchProjects();
    }, []);

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading projects...</div>;
    }

    return (
        <div className="min-h-screen py-32 px-6 flex flex-col items-center">
            {/* Header */}
            <div className="text-center mb-16">
                <h2 className="text-sm uppercase tracking-[0.3em] text-emerald-300 font-semibold mb-3">Portfolio</h2>
                <h1 className="text-5xl md:text-6xl font-extrabold text-white">
                    Featured <span className="text-cyan-400">Projects</span>
                </h1>
                <div className="h-1 w-24 bg-cyan-500 mx-auto mt-6 rounded-full opacity-50"></div>
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-11/12 max-w-7xl">
                {projects.map((project) => (
                    <ProjectCard
                        key={project.id}
                        project={project}
                        onClick={() => setSelectedProject(project)}
                    />
                ))}
            </div>

            {/* Detail Modal */}
            {selectedProject && (
                <ProjectModal
                    project={selectedProject}
                    onClose={() => setSelectedProject(null)}
                />
            )}
        </div>
    );
}
