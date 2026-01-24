import { UserStats } from "../../models/StatsModel";

interface ProfileStatsProps {
  stats: UserStats;
}

const ProfileStats = ({ stats }: ProfileStatsProps) => {
  const statsList = [
    { label: "Total", value: stats.total_simulations },
    { label: "Este Mês", value: stats.simulations_this_month },
    { label: "Média Mensal", value: stats.average_simulations_per_month },
    { label: "Média Duração", value: `${stats.average_duration_days}d` },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-6">Estatísticas</h3>

      <div className="grid grid-cols-2 gap-4">
        {statsList.map((stat, index) => (
          <div key={index} className="flex flex-col">
            <span className="text-[10px] text-gray-400 font-bold uppercase">{stat.label}</span>
            <span className="text-xl font-bold text-gray-800">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;