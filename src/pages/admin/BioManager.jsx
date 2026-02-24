import { useState, useEffect } from "react";
import { HiOutlineSave, HiOutlineUser, HiOutlineLockClosed, HiOutlineCode, HiOutlineShieldCheck } from "react-icons/hi";
import { supabase } from "../../supabaseClient";

export default function BioManager() {
    // Fixed values that cannot be changed
    const fixedBioData = {
        name: "Adi Bhuvaneswar",
        email: "bhuvaneswar88862@gmail.com",
        linkedin: "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a/",
        github: "https://github.com/Bhuvanswar"
    };
    
    const [activeTab, setActiveTab] = useState("bio"); // "bio" or "skills"
    
    const [bioData, setBioData] = useState({
        role: "Data Analyst, Java Developer, Python Developer, Machine Learning Engineer",
        bio: "Passionate about data and development.",
        skills: ""
    });
    const [loading, setLoading] = useState(true);
    const [status, setStatus] = useState("");

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const { data, error } = await supabase
                    .from("bio")
                    .select("*")
                    .limit(1)
                    .maybeSingle();
                
                if (error) throw error;
                
                if (data) {
                    setBioData({
                        role: Array.isArray(data.role) ? data.role.join(", ") : (data.role || ""),
                        bio: data.bio || "",
                        skills: Array.isArray(data.skills) ? data.skills.join(", ") : (data.skills || "")
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
            const roleArray = bioData.role.split(",").map(role => role.trim());
            const skillsArray = bioData.skills.split(",").map(skill => skill.trim()).filter(skill => skill !== "");
            
            // Check if bio record exists
            const { data: existingBio, error: fetchError } = await supabase
                .from("bio")
                .select("id")
                .limit(1)
                .single();
            
            if (fetchError && fetchError.code !== 'PGRST116') {
                throw fetchError;
            }

            // Include fixed values in payload
            const bioPayload = {
                role: roleArray,
                bio: bioData.bio,
                skills: skillsArray,
            };

            let error;
            if (existingBio) {
                // Update existing record
                ({ error } = await supabase
                    .from("bio")
                    .update(bioPayload)
                    .eq("id", existingBio.id));
            } else {
                // Insert new record
                ({ error } = await supabase
                    .from("bio")
                    .insert([bioPayload]));
            }
            
            if (error) throw error;
            
            setStatus("Saved successfully!");
            setTimeout(() => setStatus(""), 3000);
        } catch (err) {
            console.error("Error saving bio:", err);
            setStatus("Error saving data: " + err.message);
        }
    };

    if (loading) return <div className="text-yellow-400">Loading bio data...</div>;

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
            <div className="bg-white/5 p-6 sm:p-10 rounded-[40px] border border-white/10 backdrop-blur-xl">
                <div className="flex items-center gap-3 sm:gap-4 mb-6 sm:mb-10 text-yellow-400">
                    <div className="p-2 sm:p-3 bg-yellow-400/10 rounded-2xl">
                        <HiOutlineUser size={24} className="sm:w-[30px] sm:h-[30px]" />
                    </div>
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-white">Profile <span className="text-yellow-400">Manager</span></h3>
                </div>

                {/* Tab Navigation */}
                <div className="flex gap-2 sm:gap-4 mb-6 sm:mb-8 border-b border-white/10 pb-4 overflow-x-auto">
                    <button
                        onClick={() => setActiveTab("bio")}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm sm:text-base ${
                            activeTab === "bio" 
                            ? "bg-yellow-400 text-black" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <HiOutlineUser size={18} />
                        Bio & Roles
                    </button>
                    <button
                        onClick={() => setActiveTab("skills")}
                        className={`flex items-center gap-2 px-4 sm:px-6 py-2 sm:py-3 rounded-xl font-bold transition-all whitespace-nowrap text-sm sm:text-base ${
                            activeTab === "skills" 
                            ? "bg-yellow-400 text-black" 
                            : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
                        }`}
                    >
                        <HiOutlineCode size={18} />
                        Skills
                    </button>
                </div>

                <form onSubmit={handleSave} className="space-y-6 sm:space-y-8">
                    {/* Bio Tab Content */}
                    {activeTab === "bio" && (
                        <>
                            <div className="grid grid-cols-1 gap-4 sm:gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                        <HiOutlineLockClosed size={12} /> Display Name
                                    </label>
                                    <input
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                                        value={fixedBioData.name}
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                        <HiOutlineShieldCheck size={12} /> Roles (for Home - "I am a")
                                    </label>
                                    <input
                                        className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 focus:outline-none focus:border-yellow-400 transition-all text-sm sm:text-base"
                                        value={bioData.role}
                                        onChange={(e) => setBioData({ ...bioData, role: e.target.value })}
                                        placeholder="Data Analyst, Java Developer, Python Developer"
                                        required
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1">Short Bio / About Paragraph</label>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 min-h-[120px] sm:min-h-[160px] focus:outline-none focus:border-yellow-400 transition-all leading-relaxed text-sm sm:text-base"
                                    value={bioData.bio}
                                    onChange={(e) => setBioData({ ...bioData, bio: e.target.value })}
                                    required
                                />
                            </div>

                            {/* Fixed Fields - Display Only */}
                            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-8">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                        <HiOutlineLockClosed size={12} /> Contact Email
                                    </label>
                                    <input
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                                        value={fixedBioData.email}
                                        disabled
                                    />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                        <HiOutlineLockClosed size={12} /> LinkedIn URL
                                    </label>
                                    <input
                                        className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                                        value={fixedBioData.linkedin}
                                        disabled
                                    />
                                </div>
                            </div>

                            {/* Fixed GitHub Field */}
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                    <HiOutlineLockClosed size={12} /> GitHub URL
                                </label>
                                <input
                                    className="w-full bg-gray-800/50 border border-gray-700 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 text-gray-400 cursor-not-allowed text-sm sm:text-base"
                                    value={fixedBioData.github}
                                    disabled
                                />
                            </div>
                        </>
                    )}

                    {/* Skills Tab Content */}
                    {activeTab === "skills" && (
                        <>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                                    <HiOutlineCode size={12} /> Skills (for About Page)
                                </label>
                                <p className="text-xs text-gray-500 mb-4">
                                    Enter skills separated by commas. These will be displayed as tags on the About page.
                                </p>
                                <textarea
                                    className="w-full bg-white/5 border border-white/10 rounded-2xl px-4 sm:px-6 py-3 sm:py-4 min-h-[150px] sm:min-h-[200px] focus:outline-none focus:border-yellow-400 transition-all leading-relaxed text-sm sm:text-base"
                                    value={bioData.skills}
                                    onChange={(e) => setBioData({ ...bioData, skills: e.target.value })}
                                    placeholder="React, Node.js, Python, SQL, Machine Learning, Data Analysis, Java, MongoDB, etc."
                                />
                            </div>

                            {/* Skills Preview */}
                            {bioData.skills && (
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-gray-400 ml-1">Preview:</label>
                                    <div className="flex flex-wrap gap-2 p-3 sm:p-4 bg-white/5 rounded-2xl border border-white/10">
                                        {bioData.skills.split(",").map((skill, index) => (
                                            <span
                                                key={index}
                                                className="px-3 sm:px-4 py-1.5 sm:py-2 bg-white/10 border border-white/20 rounded-full text-xs sm:text-sm text-cyan-400"
                                            >
                                                {skill.trim()}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </>
                    )}

                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-6 pt-4 sm:pt-6 border-t border-white/5">
                        {status && (
                            <p className={`text-sm font-bold ${status.includes("Error") ? "text-red-400" : "text-emerald-400 animate-pulse"}`}>
                                {status}
                            </p>
                        )}
                        <button
                            type="submit"
                            className="w-full sm:w-auto px-8 sm:px-12 py-3 sm:py-4 bg-yellow-400 text-black font-extrabold rounded-2xl hover:bg-yellow-300 hover:scale-105 transition-all shadow-xl shadow-yellow-400/20 flex items-center justify-center gap-3 text-sm sm:text-base"
                        >
                            <HiOutlineSave size={18} />
                            Save Profile
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
