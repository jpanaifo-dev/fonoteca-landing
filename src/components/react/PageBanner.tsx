import React from 'react';

interface PageBannerProps {
    title: string;
    subtitle: string;
    image: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, image }) => {
    return (
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image || '/images/logo-mini.webp'}
                    alt={title}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/logo-mini.webp';
                    }}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-dark/60 mix-blend-multiply"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide animate-fade-up">
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 font-light animate-fade-up" style={{ animationDelay: "0.2s" }}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
};
