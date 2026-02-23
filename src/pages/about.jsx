import React from "react";
import { useDocument } from "../hooks/useContent";

export default function About() {
    const { data: bioData } = useDocument("config", "bio");
    const skills = bioData?.roles || ["Java", "Python", "SQL", "Web Development", "Machine Learning"];

    return (
        <div className="min-h-screen flex items-center justify-center text-white backdrop-blur-lg pt-20">
            <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl gap-12">

                {/* Image Section */}
                <div className="md:w-1/2 flex justify-center">
                    <div className="relative group">
                        <img
                            src="/profile.jpg"
                            alt="Bhuvaneswar Profile"
                            className="w-80 h-80 object-cover rounded-2xl shadow-2xl border-4 border-white/10 transition-transform duration-500 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </div>
                </div>

                {/* Content Section */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-5xl font-extrabold text-white mb-6">
                        Hi, I'm <span className="text-cyan-400">{bioData?.name || "Bhuvaneswar"}</span>
                    </h1>

                    <div className="space-y-6 text-lg text-emerald-100/80 leading-relaxed mb-8">
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

                    {/* Skill Tags */}
                    <div className="flex flex-wrap justify-center md:justify-start gap-3">
                        {skills.map((skill) => (
                            <span
                                key={skill}
                                className="px-5 py-2 bg-white/5 backdrop-blur-md border border-white/10 rounded-full text-sm font-semibold text-cyan-400 shadow-sm transition-all hover:bg-white/10 hover:-translate-y-1"
                            >
                                {skill}
                            </span>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}
