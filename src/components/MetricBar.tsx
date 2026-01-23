type MetricBarProps = {
    label: string;
    value: number | string;
    color: string;
};

export const MetricBar: React.FC<MetricBarProps> = ({ label, value, color }) => (
    <div>
        <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-500">{label}</span>
            <span className="font-bold text-gray-700">{value}%</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-2">
            <div className={`${color} h-2 rounded-full transition-all duration-500`} style={{ width: `${Math.min(Number(value), 100)}%` }}></div>
        </div>
    </div>
);