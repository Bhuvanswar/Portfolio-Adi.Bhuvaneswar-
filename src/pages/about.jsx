import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";

export default function About() {
    const [bioData, setBioData] = useState(null);
    const [loading, setLoading] = useState(true);
    
    // Fixed values
    const fixedData = {
        name: "Bhuvaneswar",
        github: "https://github.com/Bhuvanswar"
    };

    useEffect(() => {
        const fetchBio = async () => {
            try {
                const { data, error } = await supabase
                    .from("bio")
                    .select("*")
                    .limit(1)
                    .single();
                
                if (error) throw error;
                setBioData(data);
            } catch (err) {
                console.error("Error fetching bio:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchBio();
    }, []);

    // Skills come from bio.skills field
    const skills = bioData?.skills || ["Java", "Python", "SQL", "Web Development", "Machine Learning"];

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center text-white backdrop-blur-lg pt-24 md:pt-20 pb-10">
            <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl gap-8 md:gap-12">

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center order-1 md:order-1">
                    <div className="relative group">
                        <img
                            src="/profile.jpg"
                            alt="Bhuvaneswar Profile"
                            className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/10 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 text-center md:text-left order-2 md:order-2">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mb-4 md:mb-6 leading-tight">
                        Hi, I'm <span className="text-cyan-400 break-words">{bioData?.name || fixedData.name}</span>
                    </h1>

                    <div className="space-y-4 md:space-y-6 text-base sm:text-lg text-emerald-100/80 leading-relaxed mb-6 md:mb-8">
                        {bioData?.bio ? (
                            bioData.bio.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))
                        ) : (
                            <>
                                <p>
                                    I am a passionate <span className="font-semibold text-white">Software Developer</span> and a recent <span className="font-semibold text-cyan-400">2025 Graduate</span>. I thrive on building innovative technology that solves real-world problems.
                                </p>
                                <p>
                                    With experience in developing scalable <span className="font-semibold text-white">Web Applications</span> and designing intelligent <span className="font-semibold text-white">Machine Learning Models</span>.
                                </p>
                            </>
                        )}
                    </div>

                    {/* Skill Tags - from skills field */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-2 md:gap-3">
                        {Array.isArray(skills) ? skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs sm:text-sm font-semibold text-cyan-400 shadow-sm transition-all hover:bg-white/10 hover:-translate-y-1 whitespace-nowrap"
                            >
                                {skill}
                            </span>
                        )) : skills.split(',').map((skill) => (
                            <span
                                key={skill}
                                className="px-3 sm:px-5 py-1.5 sm:py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-xs sm:text-sm font-semibold text-cyan-400 shadow-sm transition-all hover:bg-white/10 hover:-translate-y-1 whitespace-nowrap"
                            >
                                {skill.trim()}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
