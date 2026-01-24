type StatCardProps = {
    title: string;
    value: string | number;
    sub: string;
    color: string;
};

export const StatCard: React.FC<StatCardProps> = ({ title, value, sub, color }) => (
    <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
        <h4 className="text-gray-500 text-xs font-bold uppercase mb-2">{title}</h4>
        <div className={`text-2xl font-bold mb-1 ${color.split(' ')[1]}`}>{value}</div>
        <p className="text-xs text-gray-400">{sub}</p>
    </div>
);