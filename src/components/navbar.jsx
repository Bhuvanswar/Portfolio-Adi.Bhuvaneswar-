import { useState, useEffect } from "react";

const navLinks = [
    { name: "Home", id: "home" },
    { name: "About", id: "about" },
    { name: "Projects", id: "projects" },
    { name: "Achievements", id: "achievements" },
    { name: "Contact", id: "contact" },
];

export default function Navbar() {
    const [activeSection, setActiveSection] = useState("home");

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px", // Triggers when section is in the top portion
            threshold: 0,
        };

        const handleIntersect = (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveSection(entry.target.id);
                }
            });
        };

        const observer = new IntersectionObserver(handleIntersect, observerOptions);

        navLinks.forEach((link) => {
            const element = document.getElementById(link.id);
            if (element) observer.observe(element);
        });

        return () => observer.disconnect();
    }, []);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md px-4 py-2 md:w-[90%] md:max-w-6xl md:px-8 md:py-4">
            <nav className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-full px-6 py-3">
                <ul className="flex items-center justify-between gap-2">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.id
                                    ? "bg-white text-black shadow-lg"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}