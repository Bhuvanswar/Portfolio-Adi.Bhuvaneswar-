import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";
import { supabase } from "../../supabaseClient";

export default function AchievementManager() {
    const [achievements, setAchievements] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState({
        achievement_title: "",
        organization: "",
        description: "",
        date: "",
        highlights: "",
        link: "",
        images: ""
    });
    const [loading, setLoading] = useState(true);

    const fetchAchievements = async () => {
        try {
            const { data, error } = await supabase
                .from("achievement")
                .select("*")
                .order("date", { ascending: false });
            
            if (error) throw error;
            setAchievements(data || []);
            setLoading(false);
        } catch (err) {
            console.error("Error fetching achievements:", err);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAchievements();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        const highlightsArray = typeof currentAchievement.highlights === 'string'
            ? currentAchievement.highlights.split("\n").filter(line => line.trim() !== "")
            : currentAchievement.highlights;

        const achievementData = {
            ...currentAchievement,
            highlights: highlightsArray
        };

        try {
            if (isEditing) {
                const { error } = await supabase
                    .from("achievement")
                    .update(achievementData)
                    .eq("id", currentAchievement.id);
                
                if (error) throw error;
            } else {
                const { error } = await supabase
                    .from("achievement")
                    .insert([achievementData]);
                
                if (error) throw error;
            }

            setIsEditing(false);
            setCurrentAchievement({ achievement_title: "", organization: "", description: "", date: "", highlights: "", link: "", images: "" });
            fetchAchievements();
        } catch (err) {
            console.error("Error saving achievement:", err);
            alert("Error saving achievement: " + err.message);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this achievement?")) {
            try {
                const { error } = await supabase
                    .from("achievement")
                    .delete()
                    .eq("id", id);
                
                if (error) throw error;
                fetchAchievements();
            } catch (err) {
                console.error("Error deleting achievement:", err);
                alert("Error deleting achievement: " + err.message);
            }
        }
    };

    const startEdit = (achievement) => {
        setIsEditing(true);
        setCurrentAchievement({
            ...achievement,
            highlights: Array.isArray(achievement.highlights) ? achievement.highlights.join("\n") : achievement.highlights
        });
    };

    const startAdd = () => {
        setIsEditing(true);
        setCurrentAchievement({ achievement_title: "", organization: "", description: "", date: "", highlights: "", link: "", images: "" });
    };

    if (loading) return <div className="text-emerald-400">Loading achievements...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            {/* Form Section */}
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl mb-10">
                <div className="flex items-center justify-between mb-10">
                    <h3 className="text-3xl font-extrabold text-white">
                        {isEditing ? "Edit Achievement" : "Add New Achievement"}
                    </h3>
                    {!isEditing && (
                        <button
                            onClick={startAdd}
                            className="flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white font-bold rounded-xl hover:bg-emerald-600 transition-all"
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
                                <label className="text-sm font-bold text-gray-400 ml-1">Title</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                    value={currentAchievement.achievement_title}
                                    onChange={(e) => setCurrentAchievement({ ...currentAchievement, achievement_title: e.target.value })}
                                    placeholder="Achievement Title"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Organization</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                    value={currentAchievement.organization}
                                    onChange={(e) => setCurrentAchievement({ ...currentAchievement, organization: e.target.value })}
                                    placeholder="Organization"
                                    required
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Date</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                    value={currentAchievement.date}
                                    onChange={(e) => setCurrentAchievement({ ...currentAchievement, date: e.target.value })}
                                    placeholder="2024-01"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Link (optional)</label>
                                <input
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                    value={currentAchievement.link}
                                    onChange={(e) => setCurrentAchievement({ ...currentAchievement, link: e.target.value })}
                                    placeholder="https://..."
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Description</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                value={currentAchievement.description}
                                onChange={(e) => setCurrentAchievement({ ...currentAchievement, description: e.target.value })}
                                placeholder="Description"
                                rows={3}
                                required
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Highlights (one per line)</label>
                            <textarea
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-emerald-400 transition-all"
                                value={currentAchievement.highlights}
                                onChange={(e) => setCurrentAchievement({ ...currentAchievement, highlights: e.target.value })}
                                placeholder="Highlight 1&#10;Highlight 2&#10;Highlight 3"
                                rows={4}
                            />
                        </div>

                        <div className="flex gap-4 pt-4">
                            {isEditing && (
                                <button
                                    type="button"
                                    onClick={() => {
                                        setIsEditing(false);
                                        setCurrentAchievement({ achievement_title: "", organization: "", description: "", date: "", highlights: "", link: "", images: "" });
                                    }}
                                    className="px-10 py-3 rounded-xl bg-white/5 text-white font-semibold hover:bg-white/10 transition-all"
                                >
                                    Cancel
                                </button>
                            )}
                            <button
                                type="submit"
                                className="px-10 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                            >
                                {isEditing ? "Update Achievement" : "Save Achievement"}
                            </button>
                        </div>
                    </form>
                )}
            </div>

            <div className="grid grid-cols-1 gap-4">
                <h3 className="text-2xl font-bold mb-4">Existing Achievements</h3>
                {achievements.map((ach) => (
                    <div key={ach.id} className="flex items-center justify-between p-6 bg-white/5 rounded-2xl border border-white/10 hover:bg-white/10 transition-all group">
                        <div className="flex items-center gap-6">
                            <div className="p-3 bg-emerald-500/10 text-emerald-400 rounded-xl">
                                <span className="font-mono text-xs">{ach.date}</span>
                            </div>
                            <div>
                                <h4 className="font-bold text-lg">{ach.achievement_title}</h4>
                                <p className="text-gray-400 text-sm">{ach.organization}</p>
                            </div>
                        </div>
                        <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all">
                            <button
                                onClick={() => startEdit(ach)}
                                className="p-3 bg-cyan-500/10 text-cyan-400 rounded-xl hover:bg-cyan-500/20 transition-all"
                            >
                                <HiOutlinePencilAlt size={20} />
                            </button>
                            <button
                                onClick={() => handleDelete(ach.id)}
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
