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
        { ...content.s1, value: parseInt(content.s1.count) || 0, label: 'Audios en el catálogo' },
        { ...content.s2, value: parseInt(content.s2.count) || 0, label: 'Especies documentadas' },
        { ...content.s3, value: parseInt(content.s3.count) || 0, label: 'Familias taxonómicas' },
    ];

    return (
        <section className="relative py-28 overflow-hidden bg-[#0A0C10]">
            {/* Dark background image overlay */}
            <div 
                className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30" 
                style={{ 
                    backgroundImage: "url('https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?q=80&w=2572&auto=format&fit=crop')", // Example jungle/forest dark context
                    filter: "grayscale(50%) brightness(0.6)"
                }}
            ></div>
            
            {/* Gradient overlay to blend with surrounding sections */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#04070a] via-transparent to-[#04070a]"></div>
            <div className="absolute inset-0 bg-black/50"></div> {/* Additional darkening to ensure text readability */}

            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {statsList.map((stat, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8, delay: i * 0.2 }}
                            className="flex flex-col flex-1"
                        >
                            <div className="flex flex-col text-left">
                                <span className="text-6xl md:text-7xl lg:text-[5.5rem] font-medium text-white tracking-tight mb-2">
                                    <CountUp value={stat.value} />
                                    <span className="text-accent-green">+</span>
                                </span>
                                <p className="text-base md:text-lg text-gray-300 font-light max-w-[220px] leading-snug">
                                    {stat.label}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
