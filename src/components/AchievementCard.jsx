import { HiOutlineTrophy } from "react-icons/hi2";

export default function AchievementCard({ achievement }) {
    return (
        <div className="relative group p-8 rounded-3xl bg-white/5 backdrop-blur-md border border-white/10 transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:scale-[1.02]">
            {/* Icon */}
            <div className="absolute -top-6 -left-6 p-4 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 text-cyan-400 group-hover:scale-110 group-hover:bg-cyan-500/30 transition-all duration-500 shadow-xl shadow-cyan-500/10">
                <HiOutlineTrophy className="w-8 h-8" />
            </div>

            <div className="flex flex-col h-full">
                <div className="mb-6">
                    <div className="flex justify-between items-start mb-2">
                        <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                            {achievement.achievement_title || achievement.title}
                        </h3>
                        <span className="text-sm font-mono text-emerald-300 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20">
                            {achievement.date}
                        </span>
                    </div>
                    <p className="text-emerald-400/80 font-semibold uppercase tracking-widest text-xs">
                        {achievement.organization}
                    </p>
                </div>

                <p className="text-gray-300 leading-relaxed mb-6 italic">
                    "{achievement.description}"
                </p>

                <div className="space-y-3 mb-8 flex-grow">
                    {(achievement.highlights || []).map((point, index) => (
                        <div key={index} className="flex items-start gap-3">
                            <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-cyan-400 shrink-0" />
                            <p className="text-sm group-hover:text-yellow-400 text-white">{point}</p>
                        </div>
                    ))}
                </div>

                {achievement.images && achievement.images.length > 0 && (
                    <div className="grid grid-cols-2 gap-4 mb-8">
                        {achievement.images.map((img, index) => (
                            <div key={index} className="relative overflow-hidden rounded-xl border border-white/10 group/img">
                                <img
                                    src={img}
                                    alt={`Achievement ${index + 1}`}
                                    className="w-full h-40 object-cover transition-transform duration-500 group-hover/img:scale-110"
                                />
                                <div className="absolute inset-0 bg-cyan-900/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                                    <span className="text-white text-xs font-bold uppercase tracking-widest">Enlarge</span>
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {achievement.link && (
                    <a
                        href={achievement.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center text-cyan-400 hover:text-cyan-300 font-bold text-sm group/link transition-colors"
                    >
                        View Project Repository
                        <svg className="w-4 h-4 ml-2 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                        </svg>
                    </a>
                )}
            </div>
        </div>
    );
}
