import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import { supabase } from "../../supabaseClient";

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [currentProject, setCurrentProject] = useState(null);
    const [loading, setLoading] = useState(true);

    const emptyProject = {
        title: "",
        short_description: "",
        long_description: "",
        technologies: "",
        image_url: "",
        github_link: ""
    };

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

    useEffect(() => {
        fetchProjects();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();

        const techArray =
            typeof currentProject.technologies === "string"
                ? currentProject.technologies.split(",").map(item => item.trim())
                : currentProject.technologies;

        const projectData = {
            ...currentProject,
            technologies: techArray
        };

        try {
            if (currentProject.id) {
                // UPDATE
                const { error } = await supabase
                    .from("projects")
                    .update(projectData)
                    .eq("id", currentProject.id);

                if (error) throw error;
            } else {
                // INSERT (id auto-generated)
                const { error } = await supabase
                    .from("projects")
                    .insert([projectData]);

                if (error) throw error;
            }

            setIsFormOpen(false);
            setCurrentProject(null);
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
        setIsFormOpen(true);
        setCurrentProject({
            ...project,
            technologies: Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : project.technologies
        });
    };

    const startAdd = () => {
        setIsFormOpen(true);
        setCurrentProject(emptyProject);
    };

    if (loading) return <div className="text-cyan-400">Loading projects...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Form Section */}
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl mb-10">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-extrabold text-white">
                        {currentProject?.id ? "Edit Project" : "Add New Project"}
                    </h3>

                    {!isFormOpen && (
                        <button
                            onClick={startAdd}
                            className="flex items-center gap-2 px-6 py-3 bg-cyan-500 text-white font-bold rounded-xl hover:bg-cyan-600 transition-all"
                        >
                            <HiOutlinePlus size={20} />
                            Add New
                        </button>
                    )}
                </div>

                {isFormOpen && (
                    <form onSubmit={handleSave} className="space-y-6">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.title}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, title: e.target.value })
                            }
                            placeholder="Project Title"
                            required
                        />

                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.short_description}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, short_description: e.target.value })
                            }
                            placeholder="Short Description"
                            required
                        />

                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.long_description}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, long_description: e.target.value })
                            }
                            placeholder="Long Description"
                            required
                        />

                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.technologies}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, technologies: e.target.value })
                            }
                            placeholder="React, Node.js"
                        />

                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.image_url}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, image_url: e.target.value })
                            }
                            placeholder="Image URL"
                        />

                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4"
                            value={currentProject.github_link}
                            onChange={(e) =>
                                setCurrentProject({ ...currentProject, github_link: e.target.value })
                            }
                            placeholder="GitHub Link"
                        />

                        <div className="flex gap-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsFormOpen(false);
                                    setCurrentProject(null);
                                }}
                                className="px-6 py-3 bg-white/10 rounded-xl"
                            >
                                Cancel
                            </button>

                            <button
                                type="submit"
                                className="px-6 py-3 bg-cyan-500 rounded-xl font-bold"
                            >
                                {currentProject?.id ? "Update Project" : "Save Project"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            {/* Project List */}
            <div className="grid gap-4">
                {projects.map((project) => (
                    <div key={project.id} className="flex justify-between p-6 bg-white/5 rounded-2xl">
                        <div>
                            <h4 className="font-bold">{project.title}</h4>
                            <p className="text-gray-400 text-sm">{project.short_description}</p>
                        </div>
                        <div className="flex gap-3">
                            <button onClick={() => startEdit(project)}>
                                <HiOutlinePencilAlt size={20} />
                            </button>
                            <button onClick={() => handleDelete(project.id)}>
                                <HiOutlineTrash size={20} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}