import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt, HiOutlinePlus } from "react-icons/hi";

export default function AchievementManager() {
    const [achievements, setAchievements] = useState([]);
    const [isEditing, setIsEditing] = useState(false);
    const [currentAchievement, setCurrentAchievement] = useState({
        title: "",
        organization: "",
        description: "",
        date: "",
        highlights: "",
        link: ""
    });
    const [loading, setLoading] = useState(true);

    // const achievementsCollection = collection(db, "achievements");

    const fetchAchievements = async () => {
        try {
            const q = query(achievementsCollection, orderBy("date", "desc"));
            const data = await getDocs(q);
            setAchievements(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
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

        if (isEditing) {
            const achievementDoc = doc(db, "achievements", currentAchievement.id);
            await updateDoc(achievementDoc, achievementData);
        } else {
            await addDoc(achievementsCollection, achievementData);
        }

        setIsEditing(false);
        setCurrentAchievement({ title: "", organization: "", description: "", date: "", highlights: "", link: "" });
        fetchAchievements();
    };

    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to delete this achievement?")) {
            const achievementDoc = doc(db, "achievements", id);
            await deleteDoc(achievementDoc);
            fetchAchievements();
        }
    };

    const startEdit = (achievement) => {
        setIsEditing(true);
        setCurrentAchievement({
            ...achievement,
            highlights: achievement.highlights.join("\n")
        });
    };

    if (loading) return <div className="text-emerald-400">Loading achievements...</div>;

    return (
        <div className="space-y-12">
            <div className="bg-white/5 p-8 rounded-3xl border border-white/10">
                <h3 className="text-2xl font-bold mb-6 flex items-center gap-3 text-emerald-400">
                    <HiOutlinePlus /> {isEditing ? "Edit Achievement" : "Add New Achievement"}
                </h3>
                <form onSubmit={handleSave} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                            placeholder="Achievement Title"
                            value={currentAchievement.title}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, title: e.target.value })}
                            required
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                            placeholder="Organization"
                            value={currentAchievement.organization}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, organization: e.target.value })}
                            required
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                            placeholder="Date/Year"
                            value={currentAchievement.date}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, date: e.target.value })}
                            required
                        />
                        <input
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 focus:outline-none focus:border-emerald-500"
                            placeholder="Link (Optional)"
                            value={currentAchievement.link}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, link: e.target.value })}
                        />
                    </div>
                    <div className="space-y-4">
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[100px] focus:outline-none focus:border-emerald-500"
                            placeholder="Achievement Description"
                            value={currentAchievement.description}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, description: e.target.value })}
                            required
                        />
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 min-h-[120px] focus:outline-none focus:border-emerald-500"
                            placeholder="Highlights (one per line)"
                            value={currentAchievement.highlights}
                            onChange={(e) => setCurrentAchievement({ ...currentAchievement, highlights: e.target.value })}
                            required
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
                            className="px-10 py-3 rounded-xl bg-emerald-500 text-white font-bold hover:bg-emerald-600 transition-all shadow-lg shadow-emerald-500/20"
                        >
                            {isEditing ? "Update Achievement" : "Save Achievement"}
                        </button>
                    </div>
                </form>
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
                                <h4 className="font-bold text-lg">{ach.title}</h4>
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
