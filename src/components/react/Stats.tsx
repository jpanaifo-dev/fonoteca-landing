import React, { useEffect, useState } from 'react';
import { type translations } from '../../i18n/data';
import { motion, animate } from 'framer-motion';

interface StatsProps {
    content: typeof translations.es.stats;
}

const CountUp: React.FC<{ value: number }> = ({ value }) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        const controls = animate(0, value, {
            duration: 2,
            ease: "easeOut",
            onUpdate: (latest) => setCount(Math.floor(latest))
        });
        return () => controls.stop();
    }, [value]);

    return <span>{count}</span>;
}

export const Stats: React.FC<StatsProps> = ({ content }) => {
    const statsList = [
        { ...content.s1, value: parseInt(content.s1.count) || 0 },
        { ...content.s2, value: parseInt(content.s2.count) || 0 },
        { ...content.s3, value: parseInt(content.s3.count) || 0 },
    ];

    return (
        <section className="py-24 bg-primary-dark text-white">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                    {statsList.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="flex flex-col items-center"
                        >
                            <div className="w-72 h-72 rounded-full border border-white/10 flex flex-col items-center justify-center hover:border-accent-green/50 transition-colors duration-500 bg-white/5 mb-6 group relative overflow-hidden">
                                <span className="text-7xl font-light text-accent-green mb-2 group-hover:scale-110 transition-transform duration-300 relative z-10">
                                    <CountUp value={stat.value} />
                                </span>
                                <span className="text-base text-gray-400 tracking-wider uppercase relative z-10">
                                    {stat.label}
                                </span>
                                {/* Subtle decorative circle */}
                                <div className="absolute inset-0 bg-accent-green/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full scale-0 group-hover:scale-100 transform origin-center transition-transform"></div>
                            </div>
                            <p className="text-xl font-light text-gray-300 max-w-xs text-center">{stat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
