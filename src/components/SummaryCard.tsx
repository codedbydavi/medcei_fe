import React from 'react';

interface SummaryCardProps {
  label: string;
  value: number | string;
  color: 'green' | 'yellow' | 'blue';
}

const SummaryCard: React.FC<SummaryCardProps> = ({ label, value, color }) => {
  const colorClasses = {
    green: 'bg-teal-500',
    yellow: 'bg-amber-400',
    blue: 'bg-blue-400',
  };

  return (
    <div className="relative bg-white rounded-2xl p-4 md:p-5 shadow-sm border border-gray-100 w-full h-28 md:h-32 flex flex-col justify-between overflow-hidden">
      <div className="absolute top-3 right-3 h-5 w-5 rounded-md opacity-20 flex items-center justify-center bg-gray-100">
         <div className={`h-1.5 w-1.5 rounded-full ${colorClasses[color]}`}></div>
      </div>

      <div className="flex flex-col gap-1 md:gap-2">
        <span className="text-gray-400 text-[10px] md:text-sm font-medium leading-tight">
          {label}
        </span>
        <span className={`text-2xl md:text-4xl font-bold truncate ${color === 'yellow' ? 'text-amber-500' : 'text-teal-600'}`}>
          {value}
        </span>
      </div>
    </div>
  );
};

export default SummaryCard;