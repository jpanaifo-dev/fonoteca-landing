import React, { useEffect, useState } from 'react';

const rawData = [
    { category: 'Anfibios', active: 485, library: 40 },
    { category: 'Aves', active: 132, library: 70 },
    { category: 'Murciélagos', active: 100, library: 5 },
    { category: 'Grillos', active: 56, library: 16 },
];

const maxVal = 500;

export const StatsChart: React.FC = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <div className="w-full mx-auto container">
            <div className="bg-white dark:bg-gray-800 p-8 md:p-12 rounded-3xl transition-colors duration-300">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
                    <div>
                        <h3 className="text-4xl md:text-5xl lg:text-6xl text-primary-dark dark:text-white font-light leading-tight mb-2">
                            Biblioteca vs. Grabaciones Activas
                        </h3>
                        <p className="text-gray-500 dark:text-gray-400">
                            Comparativa de registros por grupo taxonómico
                        </p>
                    </div>

                    <div className="flex gap-6 text-sm font-medium">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#E49E00] ring-4 ring-[#E49E00]/20"></span>
                            <span className="text-gray-700 dark:text-gray-300">Grabaciones activas</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-[#56B4E9] ring-4 ring-[#56B4E9]/20"></span>
                            <span className="text-gray-700 dark:text-gray-300">En biblioteca</span>
                        </div>
                    </div>
                </div>

                <div className="relative h-[450px] w-full mt-8">
                    {/* Grid Lines */}
                    {[0, 100, 200, 300, 400, 500].map((val) => (
                        <div
                            key={val}
                            className="absolute w-full flex items-center group"
                            style={{ bottom: `${(val / maxVal) * 100}%` }}
                        >
                            <span className="absolute -left-12 text-xs font-medium text-gray-400 w-8 text-right group-hover:text-gray-600 dark:group-hover:text-gray-300 transition-colors">
                                {val}
                            </span>
                            <div className="w-full border-t border-gray-100 dark:border-gray-700 border-dashed group-hover:border-gray-300 dark:group-hover:border-gray-600 transition-colors"></div>
                        </div>
                    ))}

                    {/* Bars Container */}
                    <div className="absolute inset-x-0 bottom-0 top-0 flex justify-around items-end pl-0 md:pl-4">
                        {rawData.map((item, index) => (
                            <div key={item.category} className="flex flex-col items-center gap-4 w-full max-w-[140px] h-full justify-end group">
                                <div className="flex gap-2 sm:gap-4 items-end justify-center w-full h-full pb-[1px]">
                                    {/* Active Bar */}
                                    <div
                                        className="w-8 sm:w-12 bg-[#E49E00] rounded-t-lg relative transition-all duration-1000 ease-out hover:shadow-[0_0_20px_rgba(228,158,0,0.3)] hover:brightness-110"
                                        style={{
                                            height: isVisible ? `${(item.active / maxVal) * 100}%` : '0%',
                                            transitionDelay: `${index * 100}ms`
                                        }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                            {item.active}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    </div>

                                    {/* Library Bar */}
                                    <div
                                        className="w-8 sm:w-12 bg-[#56B4E9] rounded-t-lg relative transition-all duration-1000 ease-out hover:shadow-[0_0_20px_rgba(86,180,233,0.3)] hover:brightness-110"
                                        style={{
                                            height: isVisible ? `${(item.library / maxVal) * 100}%` : '0%',
                                            transitionDelay: `${index * 100 + 100}ms`
                                        }}
                                    >
                                        <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10 pointer-events-none">
                                            {item.library}
                                            <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* X Axis Labels */}
                <div className="flex justify-around mt-6 border-t border-gray-100 dark:border-gray-700 pt-6">
                    {rawData.map((item) => (
                        <div key={item.category} className="text-center w-full">
                            <span className="block font-semibold text-primary-dark dark:text-white text-sm md:text-base">
                                {item.category}
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};
