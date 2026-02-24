import { useState, useEffect, memo } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { supabase } from "../supabaseClient";
import profile from "../assets/profile.jpg";
import localResume from "../data/Adi_Bhuvaneswar.pdf";

const TypewriterText = memo(({ roles }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    const safeRoles = Array.isArray(roles) ? roles : [];

    useEffect(() => {
        if (!safeRoles.length) return;
        const currentRole = safeRoles[currentRoleIndex];
        let typingSpeed = isDeleting ? 50 : 100;

        const timeout = setTimeout(() => {
            if (!isDeleting) {
                setDisplayedText(currentRole.substring(0, displayedText.length + 1));

                if (displayedText === currentRole) {
                    setTimeout(() => setIsDeleting(true), 1000);
                }
            } else {
                setDisplayedText(currentRole.substring(0, displayedText.length - 1));

                if (displayedText === "") {
                    setIsDeleting(false);
                    setCurrentRoleIndex((prev) => (prev + 1) % safeRoles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, safeRoles]);

    return (
        <span className="text-emerald-400 font-bold decoration-cyan-500/30 underline decoration-4 underline-offset-8">
            {displayedText}
            <span className="animate-pulse text-cyan-400">|</span>
        </span>
    );
});

export default function Home() {
    const [bioData, setBioData] = useState(null);
    const [loading, setLoading] = useState(true);

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

    const defaultRoles = ["Data Analyst", "Java Developer", "Python Developer", "Machine Learning Engineer"];
    
    let roles;
    if (Array.isArray(bioData?.role)) {
        roles = bioData.role;
    } else if (typeof bioData?.role === 'string') {
        roles = bioData.role.split(',').map(r => r.trim());
    } else {
        roles = defaultRoles;
    }

    // Fixed values that cannot be changed
    const fixedData = {
        name: "Adi Bhuvaneswar",
        email: "bhuvaneswar88862@gmail.com",
        linkedin: "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a/",
        github: "https://github.com/Bhuvanswar"
    };
    
    const displayName = bioData?.name || fixedData.name;
    const EMAIL_ADDRESS = bioData?.email || fixedData.email;
    const displayLinkedIn = bioData?.linkedin || fixedData.linkedin;
    const displayGithub = bioData?.github || fixedData.github;
    const resumeUrl = bioData?.resume_url || localResume;

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen text-white">Loading...</div>;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/10 backdrop-blur-[2px] py-20 md:py-0">
            <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl gap-8 md:gap-12">

                {/* Left Side - Image */}
                <div className="md:w-1/2 flex justify-center mb-4 md:mb-0">
                    <img
                        src={profile}
                        alt={bioData?.name || "Adi Bhuvaneswar"}
                        className="w-48 h-48 sm:w-56 sm:h-56 md:w-72 md:h-72 object-cover rounded-full shadow-lg border-4 border-white/5"
                    />
                </div>

                {/* Right Side - Text */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Hello, I'm <span className="text-cyan-400 break-words">{displayName}</span>
                    </h1>

                    <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-gray-300 mb-6 md:mb-8 min-h-[2rem] md:min-h-[3rem]">
                        I am a <TypewriterText roles={roles} />
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-4 sm:gap-6 mb-8 md:mb-10">
                        {/* Resume Button */}
                        <a
                            href={resumeUrl}
                            download="Adi_Bhuvaneswar_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 sm:px-8 py-3 sm:py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-bold hover:bg-white/20 hover:border-cyan-500/50 transition-all duration-300 shadow-xl shadow-black/20 active:scale-95 flex items-center gap-2 text-sm sm:text-base whitespace-nowrap"
                        >
                            Download CV
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-4 sm:gap-6 text-2xl sm:text-3xl">
                            <a
                                href={displayGithub}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href={displayLinkedIn}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-400 hover:text-blue-300 transition-all duration-300 hover:scale-110"
                            >
                                <FaLinkedin />
                            </a>
                            <a
                                href={`mailto:${EMAIL_ADDRESS}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-emerald-400 hover:text-emerald-300 transition-all duration-300 hover:scale-110"
                            >
                                <FaEnvelope />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
