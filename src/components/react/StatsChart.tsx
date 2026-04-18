import React, { useEffect, useState } from 'react';
import { 
  PieChart, 
  Pie, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  Legend
} from 'recharts';

const data = [
    { name: 'Anfibios', value: 485, color: '#3b82f6' },      // Blue
    { name: 'Aves', value: 132, color: '#8b5cf6' },          // Purple
    { name: 'Murciélagos', value: 100, color: '#ec4899' },   // Pink
    { name: 'Grillos', value: 56, color: '#14b8a6' },        // Teal
    { name: 'Reptiles', value: 42, color: '#6366f1' },       // Indigo
];

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#050514]/90 border border-indigo-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md">
        <p className="text-[10px] font-mono text-indigo-400 mb-1 uppercase tracking-widest leading-none">Category</p>
        <p className="text-white font-medium text-lg mb-2">
          {payload[0].name}
        </p>
        <div className="flex items-end gap-2">
            <span className="text-2xl font-light text-white">{payload[0].value}</span>
            <span className="text-[10px] text-gray-500 uppercase tracking-widest mb-1.5">Records</span>
        </div>
      </div>
    );
  }
  return null;
};

// Custom Legend
const renderLegend = (props: any) => {
  const { payload } = props;
  return (
    <ul className="flex flex-col gap-3">
      {payload.map((entry: any, index: number) => (
        <li key={`item-${index}`} className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: entry.color }}></span>
                <span className="text-gray-300 font-medium">{entry.value}</span>
            </div>
            <span className="text-white font-mono">{entry.payload.value}</span>
        </li>
      ))}
    </ul>
  );
};

export const StatsChart: React.FC = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return <div className="h-[450px] w-full bg-[#050515]/50 animate-pulse rounded-3xl" />;

    return (
        <div className="w-full mx-auto container py-12 px-6">
            <div className="bg-[#050514] border border-[#1e1b4b] p-8 md:p-12 rounded-[2rem] shadow-2xl relative overflow-hidden flex flex-col md:flex-row gap-12 items-center">
                {/* Decorative Glowing Orbs behind the chart */}
                <div className="absolute top-1/2 left-1/4 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-indigo-600/20 rounded-full blur-[100px] pointer-events-none"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-fuchsia-600/10 rounded-full blur-[120px] pointer-events-none"></div>

                <div className="w-full md:w-1/2 relative z-10">
                    <span className="text-indigo-400 font-semibold text-xs uppercase tracking-[0.2em] mb-4 block">
                        Analytics Overview
                    </span>
                    <h2 className="text-4xl md:text-5xl text-white font-light tracking-tight leading-tight mb-6">
                        Discover the distribution of our sound library
                    </h2>
                    <p className="text-indigo-200/60 text-lg font-light max-w-md mb-8">
                        Explore the biodiversity breakdown and uncover the species shaping our acoustic archive.
                    </p>
                    
                    <button className="px-6 py-3 bg-[#11112b] border border-[#2e2b6b] text-white rounded-full text-sm font-medium hover:bg-white hover:text-black transition-colors cursor-pointer">
                        View Complete Directory
                    </button>
                </div>

                <div className="h-[350px] w-full md:w-1/2 relative z-10 flex">
                    <div className="w-full h-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={data}
                                    cx="40%"
                                    cy="50%"
                                    innerRadius={90}
                                    outerRadius={130}
                                    paddingAngle={3}
                                    dataKey="value"
                                    stroke="none"
                                >
                                    {data.map((entry, index) => (
                                        <Cell 
                                            key={`cell-${index}`} 
                                            fill={entry.color} 
                                            className="hover:opacity-80 transition-opacity outline-none"
                                        />
                                    ))}
                                </Pie>
                                <Tooltip content={<CustomTooltip />} />
                                <Legend content={renderLegend} layout="vertical" verticalAlign="middle" align="right" />
                            </PieChart>
                        </ResponsiveContainer>
                        {/* Center text for Doughnut */}
                        <div className="absolute top-1/2 left-[40%] -translate-x-1/2 -translate-y-1/2 text-center pointer-events-none">
                            <span className="block text-3xl font-light text-white">773+</span>
                            <span className="block text-[10px] text-gray-400 uppercase tracking-widest mt-1">Total Audio</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
