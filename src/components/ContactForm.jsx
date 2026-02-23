import { useState } from "react";

export default function ContactForm() {
    const [status, setStatus] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // Placeholder for Formspree or similar
        setStatus("Message sent successfully!");
        e.target.reset();
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-6 w-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-cyan-400 uppercase tracking-widest pl-1">Name</label>
                    <input
                        type="text"
                        required
                        placeholder="Your Name"
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
                    />
                </div>
                <div className="flex flex-col gap-2">
                    <label className="text-sm font-semibold text-cyan-400 uppercase tracking-widest pl-1">Email</label>
                    <input
                        type="email"
                        required
                        placeholder="your@email.com"
                        className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
                    />
                </div>
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-cyan-400 uppercase tracking-widest pl-1">Subject</label>
                <input
                    type="text"
                    required
                    placeholder="Project Inquiry"
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder:text-gray-500"
                />
            </div>

            <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold text-cyan-400 uppercase tracking-widest pl-1">Message</label>
                <textarea
                    rows="5"
                    required
                    placeholder="Let's build something amazing together..."
                    className="p-4 rounded-2xl bg-white/5 border border-white/10 focus:border-cyan-500/50 focus:bg-white/10 outline-none transition-all duration-300 text-white placeholder:text-gray-500 resize-none"
                ></textarea>
            </div>

            <button
                type="submit"
                className="mt-4 px-10 py-4 bg-gradient-to-r from-cyan-600 to-emerald-600 text-white font-bold rounded-2xl hover:from-cyan-500 hover:to-emerald-500 transition-all duration-300 shadow-xl shadow-cyan-500/10 hover:shadow-cyan-500/20 active:scale-95"
            >
                Send Message
            </button>

            {status && <p className="text-emerald-400 font-medium text-center animate-pulse">{status}</p>}
        </form>
    );
}
