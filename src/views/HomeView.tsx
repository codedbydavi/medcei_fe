import { Box, Menu } from "@mui/material";
import { NavBar } from "../components/NavBar";
import BackgroundDecoration from "../utils/BackgroundDeco";
import SummaryCard from "../components/SummaryCard";
import { MenuButton } from "../components/MenuButton";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/Paths";
import { useEffect, useState } from "react";
import { SimulationData } from "../models/SimulationModel";
import { formatRelativeTime } from "../utils/FormatRelativeTime";
import { useAuth } from "../context/AuthContext";
import { UserStats } from "../models/StatsModel";
import { statsService } from "../apis/Stats";

const HomeView = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [simulations, setSimulations] = useState<SimulationData[]>([]);
  const [stats, setStats] = useState<UserStats>();
  const [errorSims, setErrorSims] = useState<boolean>(false);
  const [errorStats, setErrorStats] = useState<boolean>(false);
  const { role, user } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        await Promise.allSettled([
          statsService
            .getRecentUserSimulations()
            .then((data) => {
              setSimulations(data.simulations);
            })
            .catch(() => setErrorSims(true)),
          statsService
            .getUserStats()
            .then((data) => setStats(data))
            .catch(() => setErrorStats(true)),
        ]);
      } catch (err) {
        console.error("Erro crítico na Home:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const isAdmin = role === "admin";

  const handleNewSim = () => {
    navigate(PATHS.SIMULATION_MANAGER);
  };

  const handleSimHistory = () => {
    navigate(PATHS.SIMULATION_HISTORY);
  };

  const handleManageUsers = () => {
    navigate(PATHS.MANAGE_USERS);
  };

  const handleDashboard = () => {
    navigate(PATHS.DAHSBOARD);
  }
  return (
    <div className="h-screen relative flex flex-col pb-10 overflow-hidden">
      <BackgroundDecoration />

      <Box sx={{ zIndex: 1, width: "100%" }}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <header className="mb-6 md:mb-8">
            <h1 className="text-xl md:text-3xl font-bold text-gray-800">
              Bem-vindo, {user?.fullName || "Utilizador"}
            </h1>
            <p className="text-gray-500 text-xs md:text-sm">
              O que gostaria de realizar hoje?
            </p>
          </header>

          {/* Seção de Estatísticas (Summary Cards) */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-8 md:mb-10">
            {loading ? (
              Array(4).fill(0).map((_, i) => (
                <div key={i} className="h-20 md:h-24 bg-gray-200 animate-pulse rounded-xl" />
              ))
            ) : errorStats ? (
              <div className="col-span-full p-4 bg-red-50 border border-red-100 rounded-lg text-center">
                <p className="text-red-600 text-xs md:text-sm">
                  Não foi possível carregar as estatísticas.
                </p>
              </div>
            ) : (
               <>
                <SummaryCard label="Total de Simulações" value={stats?.total_simulations || 0} color="green" />
                <SummaryCard label="Média mensal" value={stats?.average_simulations_per_month || 0} color="yellow" />
                <SummaryCard label="Este mês" value={stats?.simulations_this_month || 0} color="green" />
                <SummaryCard label="Média duração" value={`${stats?.average_duration_days || 0}d`} color="yellow" />
              </>
            )}
          </div>

          {/* Grid Principal: Ações Rápidas e Atividade Recente */}
          <div className="flex flex-col lg:grid lg:grid-cols-3 gap-6 md:gap-8">
            
            {/* Coluna de Botões de Ação */}
            <div className="order-1 lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4 auto-rows-min">
              <MenuButton label="Nova Simulação" color="green" onClick={handleNewSim} />
              <MenuButton label="Histórico Completo" color="yellow" onClick={handleSimHistory} />

              {isAdmin && (
                <>
                  <MenuButton label="Dashboard Estatísticas" color="yellow" onClick={handleDashboard} />
                  <MenuButton label="Gerenciar Utilizadores" color="blue" onClick={handleManageUsers} />
                </>
              )}
            </div>

            {/* Coluna Lateral: Simulações Recentes */}
            <div className="hidden lg:flex bg-white/60 backdrop-blur-md rounded-2xl p-6 border border-white shadow-sm h-[450px] flex-col">
              <h3 className="font-bold text-gray-700 mb-4 flex justify-between items-center flex-shrink-0">
                Simulações Recentes
                <span className="text-[10px] bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full uppercase tracking-wider">
                  Recentes
                </span>
              </h3>

              <div className="flex-grow overflow-y-auto space-y-3 pr-1 custom-scrollbar">
                {loading ? (
                   <div className="space-y-4">
                    {[1, 2, 3].map((n) => (
                      <div key={n} className="h-12 bg-gray-200/50 animate-pulse rounded-lg" />
                    ))}
                  </div>
                ) : errorSims ? (
                  <div className="h-full flex items-center justify-center text-center">
                    <p className="text-red-400 text-[10px]">Erro ao obter simulações.</p>
                  </div>
                ) : simulations.length > 0 ? (
                  <div className="space-y-3">
                    {simulations.slice(0, 5).map((sim) => (
                      <div
                        key={sim.id}
                        onClick={() => navigate(PATHS.SIMULATION_MANAGER, { state: { editSim: sim } })}
                        className="group flex items-center justify-between border-b border-gray-100 pb-3 text-sm cursor-pointer hover:bg-white/40 transition-all rounded-lg p-2"
                      >
                        <div className="flex flex-col min-w-0 pr-2">
                          <span className="text-gray-700 font-semibold group-hover:text-emerald-600 transition-colors truncate">
                            {sim.name}
                          </span>
                          <span className={`text-[10px] font-bold uppercase ${
                              sim.status === "FINISHED" ? "text-emerald-500" : "text-amber-500"
                            }`}>
                            {sim.status === "FINISHED" ? "● Concluída" : "○ Em Curso"}
                          </span>
                        </div>
                        <span className="text-gray-400 text-[9px] whitespace-nowrap">
                          {formatRelativeTime(sim.created_at)}
                        </span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex flex-col items-center justify-center text-center">
                    <p className="text-gray-400 text-sm italic">Nenhuma encontrada.</p>
                  </div>
                )}
              </div>

              {!loading && simulations.length > 0 && (
                <div className="pt-3 mt-auto border-t border-gray-100 flex-shrink-0">
                  <button
                    className="w-full text-center text-emerald-600 text-xs font-bold py-2"
                    onClick={handleSimHistory}
                  >
                    Ver todo o histórico →
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </Box>
    </div>
  );
};

export default HomeView;
