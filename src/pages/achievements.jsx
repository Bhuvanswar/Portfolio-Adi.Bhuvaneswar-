import React from "react";
import AchievementCard from "../components/AchievementCard";
import { useCollection } from "../hooks/useContent";

export default function Achievements() {
    const { data: firestoreAchievements, loading } = useCollection("achievements", "date", "desc");

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading achievements...</div>;
    }

    const achievements = firestoreAchievements || [];

    return (
        <div className="min-h-screen py-32 px-6 flex flex-col items-center relative bg-black/10 overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute top-1/2 left-0 w-96 h-96 bg-cyan-500/10 blur-[120px] rounded-full -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute top-1/4 right-0 w-64 h-64 bg-emerald-500/10 blur-[100px] rounded-full translate-x-1/2" />

            {/* Header */}
            <div className="text-center mb-24 relative z-10">
                <h2 className="text-sm uppercase tracking-[0.4em] text-cyan-400 font-semibold mb-4">Milestones</h2>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6">
                    Key <span className="text-emerald-400 italic">Achievements</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
                    Celebrating successful projects, competitive highlights, and professional recognition.
                </p>
                <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mt-10 rounded-full"></div>
            </div>

            {/* Achievements List */}
            <div className="w-full max-w-5xl grid grid-cols-1 gap-16 relative z-10 px-4 md:px-0">
                {achievements.map((achievement) => (
                    <AchievementCard key={achievement.id} achievement={achievement} />
                ))}

                {/* Placeholder for future expansion */}
                <div className="border-2 border-dashed border-white/10 rounded-3xl p-12 flex flex-col items-center justify-center opacity-40 hover:opacity-60 transition-opacity">
                    <div className="p-4 rounded-full bg-white/5 mb-4">
                        <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                    </div>
                    <p className="text-gray-400 font-medium tracking-wider">MORE MILESTONES COMING SOON</p>
                </div>
            </div>
        </div>
    );
}
