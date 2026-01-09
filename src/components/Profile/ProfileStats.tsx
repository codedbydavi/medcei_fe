const ProfileStats = () => {
  const stats = [
    { label: "Total de Simulações", value: 47 },
    { label: "Este mês", value: 12 },
    { label: "Média de População", value: "50K" },
  ];

  return (
    <div className="bg-white rounded-2xl shadow-md p-6">
      <h3 className="font-semibold text-gray-800 mb-4">Estatísticas</h3>

      <div className="space-y-3 text-sm">
        {stats.map((stat, index) => (
          <div key={index} className="flex justify-between">
            <span className="text-gray-500">{stat.label}</span>
            <span className="font-semibold text-gray-800">
              {stat.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileStats;
