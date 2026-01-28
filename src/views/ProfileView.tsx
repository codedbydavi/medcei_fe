import ProfileCard from "../components/Profile/ProfileCard";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileSection from "../components/Profile/ProfileSection";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { statsService } from "../apis/Stats";
import { SimulationData } from "../models/SimulationModel";
import { formatRelativeTime } from "../utils/FormatRelativeTime";
import { PATHS } from "../routes/Paths";
import { useNavigate } from "react-router-dom";
import BackgroundDecoration from "../utils/BackgroundDeco";
import { UserStats } from "../models/StatsModel";

const ProfileView = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState<UserStats>({
    total_simulations: 0,
    simulations_this_month: 0,
    average_duration_days: 0,
    average_simulations_per_month: 0,
  });
  const [simulations, setSimulations] = useState<SimulationData[]>([]);
  const [errorSims, setErrorSims] = useState<boolean>(false);
  const [errorStats, setErrorStats] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      await Promise.allSettled([
        statsService
          .getRecentUserSimulations()
          .then((data) => setSimulations(data.simulations))
          .catch(() => setErrorSims(true)),
        statsService
          .getUserStats()
          .then((data) => setStats(data))
          .catch(() => setErrorStats(true)),
      ]);
      setLoading(false);
    };
    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative bg-slate-50/50">
      <BackgroundDecoration />
      
      {/* Ajuste de padding responsivo: p-4 no mobile, p-10 no desktop */}
      <div className="max-w-6xl mx-auto p-4 md:p-10 relative z-10">
        
        {/* Card principal - rounded-2xl no mobile para ganhar espaço */}
        <div className="bg-white/80 backdrop-blur-md rounded-2xl md:rounded-3xl shadow-xl p-5 md:p-10 border border-white">
          
          {/* Grid: Stack no mobile, 2 colunas no XL */}
          <div className="grid grid-cols-1 xl:grid-cols-[350px_1fr] gap-6 md:gap-10">
            
            {/* Coluna esquerda (Perfil e Stats) */}
            <div className="flex flex-col gap-6">
              <ProfileCard user={user!} />
              <ProfileStats stats={stats} />
            </div>

            {/* Coluna direita (Informações e Atividade) */}
            <div className="flex flex-col gap-6">
              <ProfileSection title="Informações de Conta">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6 text-sm">
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">Nome Completo</p>
                    <p className="font-semibold text-gray-800">{user?.fullName}</p>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl">
                    <p className="text-[10px] uppercase tracking-wider text-gray-400 font-bold mb-1">E-mail</p>
                    <p className="font-semibold text-gray-800 truncate">{user?.email}</p>
                  </div>
                </div>
              </ProfileSection>

              <ProfileSection title="Atividades Recentes">
                <div className="space-y-3">
                  {loading ? (
                    <div className="animate-pulse space-y-2">
                       <div className="h-4 bg-gray-100 rounded w-3/4"></div>
                       <div className="h-4 bg-gray-100 rounded w-1/2"></div>
                    </div>
                  ) : simulations.length > 0 ? (
                    <>
                      {simulations.slice(0, 5).map((sim) => (
                        <div key={sim.id} className="flex items-center justify-between p-3 hover:bg-slate-50 rounded-xl transition-colors border-b border-gray-50 last:border-0">
                          <span className="text-gray-700 font-medium truncate pr-4 text-sm">
                            {sim.name}
                          </span>
                          <span className="text-gray-400 text-[10px] whitespace-nowrap uppercase font-bold">
                            {formatRelativeTime(sim.created_at)}
                          </span>
                        </div>
                      ))}
                      <button
                        className="w-full mt-2 py-2 text-teal-600 text-xs font-bold hover:bg-teal-50 rounded-lg transition-colors"
                        onClick={() => navigate(PATHS.SIMULATION_HISTORY)}
                      >
                        Ver Histórico Completo →
                      </button>
                    </>
                  ) : (
                    <p className="text-gray-400 text-sm italic py-4 text-center">Nenhuma atividade recente.</p>
                  )}
                </div>
              </ProfileSection>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;
