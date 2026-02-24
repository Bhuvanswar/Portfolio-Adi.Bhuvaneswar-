import { useState, useEffect } from "react";
import { IoMailOutline, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import { supabase } from "../supabaseClient";
import localResume from "../data/Adi_Bhuvaneswar.pdf";

export default function ContactInfo() {
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

    const EMAIL = bioData?.email || "bhuvaneswar88862@gmail.com";
    const GITHUB = bioData?.github || "https://github.com/Bhuvanswar";
    const LINKEDIN = bioData?.linkedin || "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a";
    const resumeUrl = bioData?.resume_url || localResume;

    const contacts = [
        {
            icon: <IoMailOutline className="w-5 h-5 sm:w-6 sm:h-6" />,
            label: "Email",
            value: EMAIL,
            link: `mailto:${EMAIL}`,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },
        {
            icon: <IoLogoLinkedin className="w-5 h-5 sm:w-6 sm:h-6" />,
            label: "LinkedIn",
            value: "bhuvaneswar-adi",
            link: LINKEDIN,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            icon: <IoLogoGithub className="w-5 h-5 sm:w-6 sm:h-6" />,
            label: "GitHub",
            value: "@Bhuvanswar",
            link: GITHUB,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        }
    ];

    if (loading) {
        return <div className="text-white">Loading...</div>;
    }

    return (
        <div className="flex flex-col gap-4 sm:gap-6 w-full">
            {contacts.map((contact, index) => (
                <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 sm:gap-6 p-4 sm:p-6 rounded-2xl sm:rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                    <div className={`p-3 sm:p-4 rounded-xl sm:rounded-2xl ${contact.bg} ${contact.color} group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20 flex-shrink-0`}>
                        {contact.icon}
                    </div>
                    <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-0.5 sm:mb-1">{contact.label}</p>
                        <p className="text-sm sm:text-lg font-medium text-white group-hover:text-cyan-400 transition-colors truncate">{contact.value}</p>
                    </div>
                </a>
            ))}

            {/* Resume Placeholder */}
            <div className="mt-6 sm:mt-8 p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-white/5 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 sm:w-32 h-24 sm:h-32 bg-cyan-500/20 blur-[40px] sm:blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">Want my Resume?</h4>
                <p className="text-sm text-gray-400 mb-4 sm:mb-6">Download the latest version of my CV.</p>
                <a
                    href={resumeUrl}
                    download="Adi_Bhuvaneswar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-6 sm:px-8 py-2 sm:py-3 bg-white/10 border border-white/20 rounded-full text-sm sm:text-base text-white font-semibold hover:bg-white/20 transition-all active:scale-95"
                >
                    Download CV
                </a>
            </div>
        </div>
    );
}
