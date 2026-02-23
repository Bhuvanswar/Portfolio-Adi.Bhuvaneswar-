import { useState, useEffect } from "react";
import { HiOutlineSave, HiOutlineUser } from "react-icons/hi";

export default function BioManager() {
    const [bioData, setBioData] = useState({
        name: "Adi Bhuvaneswar",
        roles: "Data Analyst, Java Developer, Python Developer, Machine Learning Engineer",
        bio: "Passionate about data and development.",
        email: "bhuvaneswar88862@gmail.com",
        github: "https://github.com/Bhuvanswar",
        linkedin: "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a/"
    });
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    // const bioDocRef = doc(db, "config", "bio");

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const docSnap = await getDoc(bioDocRef);
                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setBioData({
                        ...data,
                        roles: Array.isArray(data.roles) ? data.roles.join(", ") : data.roles
                    });
                }
                setLoading(false);
            } catch (err) {
                console.error("Error fetching bio:", err);
                setLoading(false);
            }
        };
        fetchBio();
    }, []);

    const handleSave = async (e) => {
        e.preventDefault();
        setStatus("Saving...");
        try {
            const rolesArray = bioData.roles.split(",").map(role => role.trim());
            await setDoc(bioDocRef, {
                ...bioData,
                roles: rolesArray
            });
            setStatus("Saved successfully!");
            setTimeout(() => setStatus(""), 3000);
        } catch (err) {
            console.error("Error saving bio:", err);
            setStatus("Error saving data.");
        }
    };

    if (loading) return <div className="text-yellow-400">Loading bio data...</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white/5 p-10 rounded-[40px] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-4 mb-10 text-yellow-400">
                    <div className="p-3 bg-yellow-400/10 rounded-2xl">
                        <HiOutlineUser size={30} />
                    </div>
                    <h3 className="text-3xl font-extrabold text-white">Profile & <span className="text-yellow-400">Bio</span></h3>
                </div>

                <form onSubmit={handleSave} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Display Name</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                                value={bioData.name}
                                onChange={(e) => setBioData({ ...bioData, name: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Roles (comma separated)</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                                value={bioData.roles}
                                onChange={(e) => setBioData({ ...bioData, roles: e.target.value })}
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-bold text-gray-400 ml-1">Short Bio / About Paragraph</label>
                        <textarea
                            className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 min-h-[160px] focus:outline-none focus:border-yellow-400 transition-all leading-relaxed"
                            value={bioData.bio}
                            onChange={(e) => setBioData({ ...bioData, bio: e.target.value })}
                            required
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">Contact Email</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                                value={bioData.email}
                                onChange={(e) => setBioData({ ...bioData, email: e.target.value })}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-gray-400 ml-1">LinkedIn URL</label>
                            <input
                                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-yellow-400 transition-all"
                                value={bioData.linkedin}
                                onChange={(e) => setBioData({ ...bioData, linkedin: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row items-center justify-between gap-6 pt-6 border-t border-white/5">
                        {status && (
                            <p className={`text-sm font-bold ${status.includes("Error") ? "text-red-400" : "text-emerald-400 animate-pulse"}`}>
                                {status}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full md:w-auto px-12 py-4 bg-yellow-400 text-black font-extrabold rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3"
                        >
                            <HiOutlineSave size={20} />
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
