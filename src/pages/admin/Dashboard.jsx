import { auth } from "../../firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import ProjectManager from "./ProjectManager";
import AchievementManager from "./AchievementManager";
import BioManager from "./BioManager";
import ResumeManager from "./ResumeManager";
import { migrateData } from "../../data/migrate";

export default function Dashboard() {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState("projects");
    const [syncing, setSyncing] = useState(false);

    const handleLogout = async () => {
        await auth.signOut();
        navigate("/login");
    };

    const handleSync = async () => {
        if (window.confirm("This will migrate your existing JSON data to Firestore. Proceed?")) {
            setSyncing(true);
            const result = await migrateData();
            setSyncing(false);
            alert(result.message || "Migration complete!");
        }
    };

    const tabs = [
        { id: "projects", name: "Projects", color: "text-cyan-400" },
        { id: "achievements", name: "Achievements", color: "text-emerald-400" },
        { id: "bio", name: "Bio & Info", color: "text-yellow-400" },
        { id: "resume", name: "Resume", color: "text-red-400" },
    ];

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white">
            <header className="border-b border-white/10 bg-black/40 backdrop-blur-md sticky top-0 z-50">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <h1 className="text-xl font-bold tracking-tight">Portfolio <span className="text-cyan-400">Adi Bhuvaneswar</span></h1>
                    <div className="flex items-center gap-6">
                        <button
                            onClick={handleSync}
                            disabled={syncing}
                            className={`text-sm font-bold px-4 py-2 rounded-xl transition-all ${syncing ? "bg-white/5 text-gray-500" : "bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20"
                                }`}
                        >
                            {syncing ? "Syncing..." : "Sync Initial Data"}
                        </button>
                        <button onClick={() => navigate("/")} className="text-sm text-gray-400 hover:text-white transition-colors">View Site</button>
                        <button
                            onClick={handleLogout}
                            className="px-6 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-semibold hover:bg-white/10 transition-all"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            </header>

            <main className="max-w-7xl mx-auto p-6 md:p-10">
                <div className="flex flex-col gap-12">
                    {/* Welcome Header */}
                    <div>
                        <h2 className="text-4xl font-extrabold mb-2">Admin Dashboard</h2>
                        <p className="text-gray-400">Manage your portfolio content in real-time.</p>
                    </div>

                    {/* Tab Navigation */}
                    <div className="flex flex-wrap gap-4 border-b border-white/5 pb-6">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-8 py-3 rounded-2xl font-bold transition-all ${activeTab === tab.id
                                    ? `bg-white/10 ${tab.color} border border-white/20 shadow-xl`
                                    : "text-gray-500 hover:text-white"
                                    }`}
                            >
                                {tab.name}
                            </button>
                        ))}
                    </div>

                    {/* Content Sections */}
                    <div className="mt-4">
                        {activeTab === "projects" && <ProjectManager />}
                        {activeTab === "achievements" && <AchievementManager />}
                        {activeTab === "bio" && <BioManager />}
                        {activeTab === "resume" && <ResumeManager />}
                    </div>
                </div>
            </main>
        </div>
    );
}
