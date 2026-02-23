import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, query, orderBy } from "firebase/firestore";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";

export default function ProjectManager() {
    const [projects, setProjects] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentProject, setCurrentProject] = useState({
        title: "",
        description: "",
        longDescription: "",
        technologies: "",
        image: "",
        link: ""
    });
    const [loading, setLoading] = useState(true);

    const projectsCollection = collection(db, "projects");

    const fetchProjects = async () => {
        try {
            const q = query(projectsCollection, orderBy("title", "asc"));
            const data = await getDocs(q);
            setProjects(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

        if (isEditing) {
            const projectDoc = doc(db, "projects", currentProject.id);
            await updateDoc(projectDoc, projectData);
        } else {
            await addDoc(projectsCollection, projectData);
        }

        setIsEditing(false);
        setCurrentProject({ title: "", description: "", longDescription: "", technologies: "", image: "", link: "" });
        fetchProjects();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this project?")) {
            const projectDoc = doc(db, "projects", id);
            await deleteDoc(projectDoc);
            fetchProjects();
        }
    };

    const startEdit = (project) => {
        setIsEditing(true);
        setCurrentProject({
            ...project,
            technologies: project.technologies.join(", ")
        });
    };

    if (loading) return <div className="text-cyan-400">Loading projects...</div>;

    return (
        <div className="space-y-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-cyan-400">
                    <HiOutlinePlus /> {isEditing ? "Edit Project" : "Add New Project"}
                </h3>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="Project Title"
                            value={currentProject.title}
                            onChange={(e) => setCurrentProject({ ...currentProject, title: e.target.value })}
                            required
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="Short Description"
                            value={currentProject.description}
                            onChange={(e) => setCurrentProject({ ...currentProject, description: e.target.value })}
                            required
                        />
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-cyan-500"
                            placeholder="Long Description"
                            value={currentProject.longDescription}
                            onChange={(e) => setCurrentProject({ ...currentProject, longDescription: e.target.value })}
                        />
                    </div>
                    <div className="space-y-4">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="Technologies (comma separated)"
                            value={currentProject.technologies}
                            onChange={(e) => setCurrentProject({ ...currentProject, technologies: e.target.value })}
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="Image URL"
                            value={currentProject.image}
                            onChange={(e) => setCurrentProject({ ...currentProject, image: e.target.value })}
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-cyan-500"
                            placeholder="GitHub Link"
                            value={currentProject.link}
                            onChange={(e) => setCurrentProject({ ...currentProject, link: e.target.value })}
                        />
                    </div>
                    <div className="md:col-span-2 flex justify-end gap-4 mt-4">
                        {isEditing && (
                            <button
                                type="button"
                                onClick={() => setIsEditing(false)}
                                className="px-6 py-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all font-semibold"
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
            </div>

            <div className="grid grid-cols-1 gap-4">
                <h3 className="text-2xl font-bold mb-4">Existing Projects</h3>
                {projects.map((project) => (
                    <div key={project.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-6">
                            <img src={project.image} alt="" className="w-16 h-10 object-cover rounded-md" />
                            <div>
                                <h4 className="font-bold text-lg">{project.title}</h4>
                                <p className="text-gray-400 text-sm">{project.description}</p>
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
