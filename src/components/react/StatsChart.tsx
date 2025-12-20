import React from 'react';

const data = [
    { category: 'Anfibios', active: 485, library: 40 },
    { category: 'Aves', active: 132, library: 70 },
    { category: 'Murciélagos', active: 100, library: 5 },
    { category: 'Grillos', active: 56, library: 16 },
];

const maxVal = 500; // Based on chart scale

export const StatsChart: React.FC = () => {
    return (
        <div className="w-full max-w-4xl mx-auto bg-white p-6 md:p-8 rounded-2xl shadow-sm text-primary-dark mt-12">
            <h3 className="text-2xl font-bold text-center mb-8">Biblioteca (131 spp)</h3>

            <div className="flex justify-end gap-6 mb-6 text-sm">
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#E49E00]"></div>
                    <span>Grabaciones activas</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-[#56B4E9]"></div>
                    <span>En biblioteca</span>
                </div>
            </div>

            <div className="relative h-[400px] border-l border-b border-gray-300 ml-8 mb-4">
                {/* Horizontal Grid Lines */}
                {[0, 100, 200, 300, 400, 500].map((val) => (
                    <div key={val} className="absolute w-full flex items-center" style={{ bottom: `${(val / maxVal) * 100}%` }}>
                        <span className="absolute -left-8 text-xs text-gray-500 text-right w-6">{val}</span>
                        <div className="w-full border-t border-gray-100 border-dashed"></div>
                    </div>
                ))}

                {/* Bars */}
                <div className="absolute inset-0 flex justify-around items-end px-4">
                    {data.map((item) => (
                        <div key={item.category} className="flex flex-col items-center gap-2 w-full max-w-[120px]">
                            <div className="flex gap-1 items-end w-full h-full justify-center">
                                {/* Active Bar */}
                                <div
                                    className="w-1/2 bg-[#E49E00] relative group transition-all duration-500 ease-out hover:brightness-110"
                                    style={{ height: `${(item.active / maxVal) * 100}%` }}
                                >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.active}
                                    </span>
                                </div>
                                {/* Library Bar */}
                                <div
                                    className="w-1/2 bg-[#56B4E9] relative group transition-all duration-500 ease-out hover:brightness-110"
                                    style={{ height: `${(item.library / maxVal) * 100}%` }}
                                >
                                    <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-gray-700 opacity-0 group-hover:opacity-100 transition-opacity">
                                        {item.library}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* X Axis Labels */}
            <div className="flex justify-around px-4 ml-8">
                {data.map((item) => (
                    <span key={item.category} className="text-sm font-medium w-full text-center max-w-[120px]">
                        {item.category}
                    </span>
                ))}
            </div>
        </div>
    );
};
