import { IoMailOutline, IoLogoLinkedin, IoLogoGithub } from "react-icons/io5";
import { useDocument } from "../hooks/useContent";
import localResume from "../data/Adi_Bhuvaneswar.pdf";

export default function ContactInfo() {
    const { data: bioData } = useDocument("config", "bio");
    const { data: resumeData } = useDocument("config", "resume");

    const EMAIL = bioData?.email || "bhuvaneswar88862@gmail.com";
    const GITHUB = bioData?.github || "https://github.com/Bhuvanswar";
    const LINKEDIN = bioData?.linkedin || "https://www.linkedin.com/in/bhuvaneswar-adi-6ba43426a";

    const contacts = [
        {
            icon: <IoMailOutline className="w-6 h-6" />,
            label: "Email",
            value: EMAIL,
            link: `mailto:${EMAIL}`,
            color: "text-cyan-400",
            bg: "bg-cyan-500/10"
        },
        {
            icon: <IoLogoLinkedin className="w-6 h-6" />,
            label: "LinkedIn",
            value: "bhuvaneswar-adi",
            link: LINKEDIN,
            color: "text-blue-400",
            bg: "bg-blue-500/10"
        },
        {
            icon: <IoLogoGithub className="w-6 h-6" />,
            label: "GitHub",
            value: "@Bhuvanswar",
            link: GITHUB,
            color: "text-emerald-400",
            bg: "bg-emerald-500/10"
        }
    ];

    return (
        <div className="flex flex-col gap-6 w-full">
            {contacts.map((contact, index) => (
                <a
                    key={index}
                    href={contact.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-6 p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-300 group"
                >
                    <div className={`p-4 rounded-2xl ${contact.bg} ${contact.color} group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-black/20`}>
                        {contact.icon}
                    </div>
                    <div>
                        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-1">{contact.label}</p>
                        <p className="text-lg font-medium text-white group-hover:text-cyan-400 transition-colors">{contact.value}</p>
                    </div>
                </a>
            ))}

            {/* Resume Placeholder */}
            <div className="mt-8 p-10 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-emerald-500/10 border border-white/5 text-center relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/20 blur-[60px] rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                <h4 className="text-xl font-bold text-white mb-2">Want my Resume?</h4>
                <p className="text-sm text-gray-400 mb-6">Download the latest version of my CV.</p>
                <a
                    href={resumeData?.url || localResume}
                    download="Adi_Bhuvaneswar_Resume.pdf"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block px-8 py-3 bg-white/10 border border-white/20 rounded-full text-white font-semibold hover:bg-white/20 transition-all active:scale-95"
                >
                    Download CV
                </a>
            </div>
        </div>
    );
}
