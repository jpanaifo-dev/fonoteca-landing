import React from 'react';
import { type translations } from '../../i18n/data';

interface StatsProps {
    content: typeof translations.es.stats;
}

export const Stats: React.FC<StatsProps> = ({ content }) => {
    // Note: We could use framer-motion or react-spring for number animation here.
    // For now, keeping it static/simple to match current behavior but prepared for React logic.

    const statsList = [content.s1, content.s2, content.s3];

    return (
        <section className="py-24 bg-primary-dark text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {statsList.map((stat, i) => (
                        <div
                            key={i}
                            className="flex flex-col items-center reveal-on-scroll"
                            style={{ transitionDelay: `${i * 0.2}s` }}
                        >
                            <div className="w-48 h-48 rounded-full border border-white/10 flex flex-col items-center justify-center hover:border-accent-green/50 transition-colors duration-500 bg-white/5 mb-6 group">
                                <span className="text-5xl font-light text-accent-green mb-2 group-hover:scale-110 transition-transform duration-300">
                                    {stat.count}
                                </span>
                                <span className="text-sm text-gray-400 tracking-wider uppercase">
                                    {stat.label}
                                </span>
                            </div>
                            <p className="text-xl font-light">{stat.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
