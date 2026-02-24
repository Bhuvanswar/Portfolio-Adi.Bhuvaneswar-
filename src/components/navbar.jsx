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
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: "-20% 0px -70% 0px",
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
        setIsMenuOpen(false);
    };

    return (
        <header className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-md px-2 py-2 md:w-[90%] md:max-w-6xl md:px-8 md:py-4">
            <nav className="backdrop-blur-md bg-white/10 border border-white/20 shadow-2xl rounded-full px-3 py-2 md:px-6 md:py-3">
                {/* Mobile Menu Button */}
                <button 
                    className="md:hidden flex items-center justify-center w-full py-1 text-white font-medium"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    <span className="text-sm">Menu</span>
                    <svg 
                        className={`w-5 h-5 ml-2 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} 
                        fill="none" 
                        viewBox="0 0 24 24" 
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>

                {/* Desktop Navigation */}
                <ul className="hidden md:flex items-center justify-between gap-1">
                    {navLinks.map((link) => (
                        <li key={link.id}>
                            <button
                                onClick={() => scrollToSection(link.id)}
                                className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 whitespace-nowrap ${activeSection === link.id
                                    ? "bg-white text-black shadow-lg"
                                    : "text-white/70 hover:text-white hover:bg-white/10"
                                    }`}
                            >
                                {link.name}
                            </button>
                        </li>
                    ))}
                </ul>

                {/* Mobile Navigation */}
                {isMenuOpen && (
                    <ul className="md:hidden flex flex-col gap-1 mt-2 pb-2">
                        {navLinks.map((link) => (
                            <li key={link.id}>
                                <button
                                    onClick={() => scrollToSection(link.id)}
                                    className={`w-full px-3 py-2 rounded-full text-sm font-medium transition-all duration-300 text-left ${activeSection === link.id
                                        ? "bg-white text-black shadow-lg"
                                        : "text-white/70 hover:text-white hover:bg-white/10"
                                        }`}
                                >
                                    {link.name}
                                </button>
                            </li>
                        ))}
                    </ul>
                )}
            </nav>
        </header>
    );
}
