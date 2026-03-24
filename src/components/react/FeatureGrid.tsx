import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

interface FeatureItem {
    title: string;
    description: string;
}

interface FeatureGridProps {
    data: {
        title: string;
        items: FeatureItem[];
    };
}

export const FeatureGrid: React.FC<FeatureGridProps> = ({ data }) => {
    // Memoize the items to ensure stable rendering
    const items = useMemo(() => data.items, [data.items]);

    return (
        <section className="py-24 bg-light-bg dark:bg-[#0c141d]">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <h4 className="text-secondary-green uppercase font-bold tracking-widest text-sm mb-4">
                        WHAT WE DO
                    </h4>
                    <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary-dark dark:text-white font-light leading-tight">
                        {data.title.split(',').map((part, index) => (
                            <span key={index} className="block">
                                {part.trim()}{index < 1 ? ',' : ''}
                            </span>
                        ))}
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Card 1: Dark Blue, Top Left */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="bg-primary-dark text-white p-10 flex flex-col justify-between min-h-[320px]"
                    >
                        <h3 className="text-2xl font-light mb-4">{items[0]?.title}</h3>
                        <p className="text-gray-300 text-sm leading-relaxed mb-auto">
                            {items[0]?.description}
                        </p>
                        <div className="mt-8 flex justify-start">
                            <div className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-secondary-green">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 2: White, Border */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="bg-white dark:bg-[#121b28] border border-gray-200 dark:border-gray-800 p-10 flex flex-col justify-between min-h-[320px] hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-2xl font-light text-primary-dark dark:text-white mb-4">{items[1]?.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-auto">
                            {items[1]?.description}
                        </p>
                        <div className="mt-8">
                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-secondary-green">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 3: White, Rounded Top Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="bg-white dark:bg-[#121b28] border border-gray-200 dark:border-gray-800 p-10 flex flex-col justify-between min-h-[320px] rounded-tr-[5rem] hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-2xl font-light text-primary-dark dark:text-white mb-4">{items[2]?.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-auto">
                            {items[2]?.description}
                        </p>
                        <div className="mt-8">
                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-secondary-green">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 4: White, Border  */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        className="bg-white dark:bg-[#121b28] border border-gray-200 dark:border-gray-800 p-10 flex flex-col justify-between min-h-[320px] hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-2xl font-light text-primary-dark dark:text-white mb-4">{items[3]?.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-auto">
                            {items[3]?.description}
                        </p>
                        <div className="mt-8">
                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-secondary-green">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 5: White, Border */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className="bg-white dark:bg-[#121b28] border border-gray-200 dark:border-gray-800 p-10 flex flex-col justify-between min-h-[320px] hover:shadow-lg transition-shadow"
                    >
                        <h3 className="text-2xl font-light text-primary-dark dark:text-white mb-4">{items[4]?.title}</h3>
                        <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed mb-auto">
                            {items[4]?.description}
                        </p>
                        <div className="mt-8">
                            <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-secondary-green">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                                </svg>
                            </div>
                        </div>
                    </motion.div>

                    {/* Card 6: Green, Rounded Bottom Right */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.5 }}
                        className="bg-secondary-green text-white p-10 flex flex-col justify-between min-h-[320px] rounded-br-[5rem]"
                    >
                        {/* Empty or decorative content could go here, or just a solid block as per design */}
                        <div className="h-full w-full"></div>
                    </motion.div>

                </div>
            </div>
        </section>
    );
};
