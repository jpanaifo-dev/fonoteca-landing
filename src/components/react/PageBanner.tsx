import React from 'react';

interface PageBannerProps {
    title: string;
    subtitle: string;
    image: string;
    breadcrumbs?: {
        backLink: string;
        backText: string;
        currentText: string;
    };
    taxonomy?: string;
}

export const PageBanner: React.FC<PageBannerProps> = ({ title, subtitle, image, breadcrumbs, taxonomy }) => {
    return (
        <section className="relative h-[40vh] min-h-[400px] flex items-center justify-center overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0 z-0">
                <img
                    src={image || '/images/banner_fallback.webp'}
                    alt={title}
                    onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = '/images/banner_fallback.webp';
                    }}
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-primary-dark/60 mix-blend-multiply"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-6 text-center">
                {breadcrumbs && (
                    <div className="flex items-center justify-center gap-2 mb-8 text-sm md:text-base text-gray-300 animate-fade-up">
                        <a href={breadcrumbs.backLink} className="hover:text-accent-green hover:underline transition-colors">
                            {breadcrumbs.backText}
                        </a>
                        <span className="text-gray-500">|</span>
                        <span className="text-gray-400 cursor-default">
                            {breadcrumbs.currentText}
                        </span>
                    </div>
                )}

                {taxonomy && (
                    <div className="mb-4 text-accent-green font-bold text-xs md:text-sm uppercase tracking-widest animate-fade-up" style={{ animationDelay: "0.1s" }}>
                        {taxonomy}
                    </div>
                )}

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-light text-white mb-4 tracking-wide animate-fade-up" style={{ animationDelay: taxonomy ? "0.2s" : "0s" }}>
                    {title}
                </h1>
                <p className="text-lg md:text-xl text-gray-200 font-light animate-fade-up" style={{ animationDelay: taxonomy ? "0.3s" : "0.2s" }}>
                    {subtitle}
                </p>
            </div>
        </section>
    );
};
