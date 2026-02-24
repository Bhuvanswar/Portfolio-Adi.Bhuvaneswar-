import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import { supabase } from "../../supabaseClient";

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState({
        title: "",
        short_description: "",
        long_description: "",
        technologies: "",
        imageurl: "",
        github_link: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            const { data, error } = await supabase
                .from("projects")
                .select("*")
                .order("title", { ascending: true });
            
            if (error) throw error;
            setProjects(data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching projects:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const techArray = typeof currentProject.technologies === 'string'
            ? currentProject.technologies.split(",").map(item => item.trim())
            : currentProject.technologies;

        const projectData = {
            ...currentProject,
            technologies: techArray
        };

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", currentProject.id);
                
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("projects")
                    .insert([projectData]);
                
                if (error) throw error;
            }

            setIsEditing(false);
            setCurrentProject({ title: "", short_description: "", long_description: "", technologies: "", imageurl: "", github_link: "" });
            fetchProjects();
        } catch (err) {
            console.error("Error saving project:", err);
            alert("Error saving project: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            try {
                const { error } = await supabase
                    .from("projects")
                    .delete()
                    .eq("id", id);
                
                if (error) throw error;
                fetchProjects();
            } catch (err) {
                console.error("Error deleting project:", err);
                alert("Error deleting project: " + err.message);
            }
        }
    };

    const startEdit = (project) => {
        setIsEditing(true);
        setCurrentProject({
            ...project,
            technologies: Array.isArray(project.technologies) ? project.technologies.join(", ") : project.technologies
        });
    };

    const startAdd = () => {
        setIsEditing(true);
        setCurrentProject({ title: "", short_description: "", long_description: "", technologies: "", imageurl: "", github_link: "" });
    };

    if (loading) return <div className="text-cyan-400">Loading projects...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Form Section */}
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl mb-10">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-extrabold text-white">
                        {isEditing ? "Edit Project" : "Add New Project"}
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={startAdd}
                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all"
                        >
                            <HiOutlinePlus size={20} />
                            Add New
                        </button>
                    )}
                </div>

                {isEditing && (
                    <form onSubmit={handleSave} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Project Title</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                    value={currentProject.title}
                                    onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                                    placeholder="Project Title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Image URL</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                    value={currentProject.imageurl}
                                    onChange={(e) => setCurrentProject({ ...currentProject, imageurl: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Short Description</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                value={currentProject.short_description}
                                onChange={(e) => setCurrentProject({ ...currentProject, short_description: e.target.value })}
                                placeholder="Brief description for card"
                                rows={2}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Long Description</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                value={currentProject.long_description}
                                onChange={(e) => setCurrentProject({ ...currentProject, long_description: e.target.value })}
                                placeholder="Full description for modal"
                                rows={4}
                                required
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Technologies (comma separated)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                    value={currentProject.technologies}
                                    onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                                    placeholder="React, Node.js, MongoDB"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">GitHub Link</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-cyan-400 transition-all"
                                    value={currentProject.github_link}
                                    onChange={(e) => setCurrentProject({ ...currentProject, github_link: e.target.value })}
                                    placeholder="https://github.com/..."
                                />
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setCurrentProject({ title: "", short_description: "", long_description: "", technologies: "", imageurl: "", github_link: "" });
                                    }}
                                    className="px-10 py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-10 py-3 rounded-xl bg-cyan-500 text-white font-bold hover:bg-cyan-600 transition-all shadow-lg shadow-cyan-500/20"
                            >
                                {isEditing ? "Update Project" : "Save Project"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4">
                <h3 className="text-2xl font-bold mb-4">Existing Projects</h3>
                {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-6">
                            <img src={project.imageurl} alt="" className="w-16 h-10 object-cover rounded-md" />
                            <div>
                                <h4 className="font-bold text-lg">{project.title}</h4>
                                <p className="text-gray-400 text-sm">{project.short_description}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                                onClick={() => startEdit(project)}
                                className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500/20 transition-all"
                            >
                                <HiOutlinePencilAlt size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(project.id)}
                                className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all"
                            >
                                <HiOutlineTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
