import ContactForm from "../components/ContactForm";
import ContactInfo from "../components/ContactInfo";

export default function Contact() {
    return (
        <div className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 flex flex-col items-center relative overflow-hidden">
            {/* Background Decorative Elements */}
            <div className="absolute bottom-0 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-cyan-500/10 blur-[100px] sm:blur-[150px] rounded-full translate-y-1/2" />
            <div className="absolute top-1/2 right-0 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-emerald-500/10 blur-[80px] sm:blur-[130px] rounded-full translate-x-1/2 -translate-y-1/2" />

            {/* Header */}
            <div className="text-center mb-12 sm:mb-24 relative z-10">
                <h2 className="text-sm uppercase tracking-[0.4em] text-cyan-400 font-semibold mb-4">Get In Touch</h2>
                <h1 className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white mb-4 sm:mb-6">
                    Contact <span className="text-emerald-400 italic">Me</span>
                </h1>
                <p className="text-gray-400 max-w-2xl mx-auto text-base sm:text-lg">
                    Have a project in mind or just want to say hi? Feel free to reach out!
                </p>
                <div className="h-1.5 w-32 bg-gradient-to-r from-cyan-500 to-emerald-500 mx-auto mt-6 sm:mt-10 rounded-full"></div>
            </div>

            {/* Main Content Layout */}
            <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-16 relative z-10 px-2 md:px-0">
                {/* Left Side: Contact Info */}
                <div className="flex flex-col gap-6 sm:gap-10">
                    <div className="space-y-3 sm:space-y-4">
                        <h3 className="text-2xl sm:text-3xl font-bold text-white">Let's Talk!</h3>
                        <p className="text-gray-400 text-base sm:text-lg leading-relaxed">
                            I'm currently looking for new opportunities and collaborations. My inbox is always open!
                        </p>
                    </div>

                    <ContactInfo />
                </div>

                {/* Right Side: Contact Form */}
                <div className="p-6 sm:p-8 md:p-12 rounded-2xl sm:rounded-[40px] bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
                    <ContactForm />
                </div>
            </div>
        </div>
    );
}
