import React from 'react';
import { type translations } from '../../i18n/data';

interface ServicesGridProps {
    content: typeof translations.es.species;
}

const ICONS = ["🐸", "🐦", "🦇", "🦗"];

export const ServicesGrid: React.FC<ServicesGridProps> = ({ content }) => {
    return (
        <section id="species" className="py-24 bg-light-bg">
            <div className="container mx-auto px-6">
                <div className="mb-16">
                    <span className="text-accent-green font-bold tracking-widest uppercase text-sm mb-4 block">
                        {content.label}
                    </span>
                    <h2 className="text-4xl md:text-5xl text-primary-dark font-light">
                        {content.title} <strong className="font-bold">{content.title_strong}</strong>
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {content.items.map((item, index) => (
                        <div key={index} className="group bg-white p-10 border border-gray-100 rounded-[2.5rem] hover:border-accent-green/30 transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-accent-green/10 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-accent-green/5 rounded-bl-[100px] -mr-8 -mt-8 transition-transform duration-500 group-hover:scale-150 group-hover:bg-accent-green/10"></div>
                            <div className="text-4xl mb-6 grayscale group-hover:grayscale-0 transition-all duration-300 transform group-hover:scale-110 origin-left relative z-10">
                                {ICONS[index % ICONS.length]}
                            </div>

                            <h3 className="text-2xl text-primary-dark font-light mb-2 group-hover:text-accent-green transition-colors">
                                {item.title}
                            </h3>
                            <p className="text-gray-400 text-sm mb-12">
                                {item.count}
                            </p>

                            <div className="absolute bottom-8 right-8 w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-300 group-hover:border-accent-green group-hover:bg-accent-green group-hover:text-primary-dark transition-all duration-300">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="w-5 h-5 transform -rotate-45 group-hover:rotate-0 transition-transform duration-300"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
                                    ></path>
                                </svg>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
