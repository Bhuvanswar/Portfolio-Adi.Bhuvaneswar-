import { useState, useEffect, memo } from "react";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
import { useDocument } from "../hooks/useContent";
import profile from "../assets/profile.jpg";
import localResume from "../data/Adi_Bhuvaneswar.pdf";

const TypewriterText = memo(({ roles }) => {
    const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
    const [displayedText, setDisplayedText] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (!roles.length) return;
        const currentRole = roles[currentRoleIndex];
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
                    setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
                }
            }
        }, typingSpeed);

        return () => clearTimeout(timeout);
    }, [displayedText, isDeleting, currentRoleIndex, roles]);

    return (
        <span className="text-emerald-400 font-bold decoration-cyan-500/30 underline decoration-4 underline-offset-8">
            {displayedText}
            <span className="animate-pulse text-cyan-400">|</span>
        </span>
    );
});

export default function Home() {
    const { data: bioData } = useDocument("config", "bio");
    const { data: resumeData } = useDocument("config", "resume");

    const defaultRoles = ["Data Analyst", "Java Developer", "Python Developer", "Machine Learning Engineer"];
    const roles = bioData?.roles || defaultRoles;

    const EMAIL_ADDRESS = bioData?.email || "bhuvaneswar88862@gmail.com";

    return (
        <div className="min-h-screen flex items-center justify-center bg-black/10 backdrop-blur-[2px]">
            <div className="flex flex-col md:flex-row items-center justify-between w-11/12 max-w-6xl">

                {/* Left Side - Image */}
                <div className="md:w-1/2 flex justify-center mb-8 md:mb-0">
                    <img
                        src={profile}
                        alt={bioData?.name || "Adi Bhuvaneswar"}
                        className="w-72 h-72 object-cover rounded-full shadow-lg border-4 border-white/5"
                    />
                </div>

                {/* Right Side - Text */}
                <div className="md:w-1/2 text-center md:text-left">
                    <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight">
                        Hello, I'm <span className="text-cyan-400">{bioData?.name || "Adi Bhuvaneswar"}</span>
                    </h1>

                    <h2 className="text-2xl md:text-3xl text-gray-300 mb-8 h-12">
                        I am a{" "}
                        <TypewriterText roles={roles} />
                    </h2>

                    <div className="flex flex-col sm:flex-row items-center justify-center md:justify-start gap-8 mb-10">
                        {/* Resume Button */}
                        <a
                            href={resumeData?.url || localResume}
                            download="Adi_Bhuvaneswar_Resume.pdf"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-8 py-4 bg-white/10 border border-white/20 rounded-2xl text-white font-bold hover:bg-white/20 hover:border-cyan-500/50 transition-all duration-300 shadow-xl shadow-black/20 active:scale-95 flex items-center gap-2"
                        >
                            Download CV
                        </a>

                        {/* Social Icons */}
                        <div className="flex gap-6 text-3xl">
                            <a
                                href={bioData?.github || "https://github.com/Bhuvanswar"}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white hover:text-cyan-400 transition-all duration-300 hover:scale-110"
                            >
                                <FaGithub />
                            </a>

                            <a
                                href={bioData?.linkedin || "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a/"}
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
