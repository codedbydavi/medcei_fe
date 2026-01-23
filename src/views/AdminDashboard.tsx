import { useState, useEffect, useCallback } from "react";
import BackgroundDecoration from "../utils/BackgroundDeco";
import SummaryCard from "../components/SummaryCard";
import { AdminSummary, ChartData, SystemLogEntry } from "../models/StatsModel";
import { statsService } from "../apis/Stats";
import { toast } from "react-toastify";
import { LayoutDashboardIcon, RefreshCcw } from "lucide-react";
import {
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const COLORS = ["#4F46E5", "#10B981", "#F59E0B", "#EF4444"];

const AdminDashboard = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [stats, setStats] = useState<AdminSummary | null>(null);
  const [chartData, setChartData] = useState<ChartData | null>(null);
  const [logs, setLogs] = useState<SystemLogEntry[]>([]);
  const [error, setError] = useState<boolean>(false);

  const fetchLogs = useCallback(async () => {
    try {
      const resLogs = await statsService.getSystemLogs(10);
      setLogs(resLogs);
    } catch (err) {
      console.error(err);
      toast.error("Erro ao carregar logs");
    }
  }, []);

  const loadAllData = useCallback(async () => {
    setLoading(true);
    setError(false);
    try {
      const [resStats, resCharts] = await Promise.all([
        statsService.getAdminSummary(),
        statsService.getDashboardStats(),
      ]);
      setStats(resStats);
      setChartData(resCharts);
      await fetchLogs();
    } catch (err) {
      setError(true);
      toast.error("Erro ao sincronizar painel");
    } finally {
      setLoading(false);
    }
  }, [fetchLogs]);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  return (
    <div className="min-h-screen relative flex flex-col p-3 md:p-5 lg:p-6 bg-slate-50/50 overflow-x-hidden">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto w-full flex flex-col gap-4">
        {/* Header Compacto */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex flex-col">
            <div className="flex items-center gap-2">
              <LayoutDashboardIcon className="text-teal-600" size={28}  />
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-800 tracking-tight">
                Dashboard Estatísticas
              </h1>
            </div>
            <p className="text-slate-500 text-xs md:text-sm">
              Monitorização em tempo real do ecossistema.
            </p>
          </div>
          <button 
            onClick={loadAllData}
            className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-200 rounded-lg text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all shadow-sm w-fit"
          >
            <RefreshCcw size={14} className={loading ? "animate-spin" : ""} />
            Sincronizar
          </button>
        </header>

        {/* Cards de Sumário - Altura reduzida para economizar vertical */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {loading ? (
            Array(4).fill(0).map((_, i) => (
              <div key={i} className="h-20 bg-white/60 animate-pulse rounded-xl border border-slate-200" />
            ))
          ) : (
            <>
              <SummaryCard label="Utilizadores" value={stats?.total_users || 0} color="green" />
              <SummaryCard label="Simulações" value={stats?.total_simulations || 0} color="yellow" />
              <SummaryCard label="Modelo Top" value={stats?.most_used_model || "N/A"} color="blue" />
              <SummaryCard label="Uso/Modelo" value={stats?.model_usage_count || 0} color="blue" />
            </>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
          {/* Fluxo de Atividade - Altura dinâmica vh */}
          <div className="lg:col-span-2 bg-white p-4 rounded-xl shadow-sm border border-slate-200">
            <h3 className="text-sm font-bold text-slate-700 mb-4 flex items-center gap-2">
              <span className="w-2 h-2 bg-indigo-500 rounded-full animate-pulse" />
              Fluxo de Atividade
            </h3>
            <div className="h-[25vh] min-h-[220px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={chartData?.lineChart}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="date" fontSize={10} tickMargin={8} axisLine={false} />
                  <YAxis fontSize={10} axisLine={false} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="count"
                    stroke="#4F46E5"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "#4F46E5", strokeWidth: 2, stroke: "#fff" }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Modelos - Pie Chart Compacto */}
          <div className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col">
            <h3 className="text-sm font-bold text-slate-700 mb-2">Modelos</h3>
            <div className="h-[18vh] min-h-[160px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData?.pieChart || []}
                    innerRadius="65%"
                    outerRadius="90%"
                    paddingAngle={4}
                    dataKey="value"
                    cornerRadius={4}
                  >
                    {(chartData?.pieChart || []).map((_, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            {/* Legenda em Grid para economizar espaço */}
            <div className="mt-auto pt-3 grid grid-cols-2 gap-x-2 gap-y-1">
              {chartData?.pieChart.map((entry, index) => (
                <div key={index} className="flex items-center text-[10px]">
                  <div 
                    className="w-2 h-2 rounded-full mr-1.5 shrink-0" 
                    style={{ backgroundColor: COLORS[index % COLORS.length] }} 
                  />
                  <span className="text-slate-600 truncate">{entry.name}: {entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Tabela de Logs - Scroll interno otimizado */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-sm border border-slate-200 flex flex-col overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
              <h3 className="text-sm font-bold text-slate-700">Logs do Sistema</h3>
              <span className="text-[10px] text-slate-400 font-medium bg-slate-200/50 px-2 py-0.5 rounded-full">
                Últimos 10 eventos
              </span>
            </div>

            <div className="overflow-x-auto overflow-y-auto max-h-[25vh] min-h-[200px]">
              <table className="w-full text-left border-collapse min-w-[600px]">
                <thead className="sticky top-0 bg-slate-50 text-slate-500 text-[10px] uppercase z-20 shadow-sm">
                  <tr>
                    <th className="px-5 py-2.5 font-semibold">Nível</th>
                    <th className="px-5 py-2.5 font-semibold">Mensagem</th>
                    <th className="px-5 py-2.5 font-semibold">Evento</th>
                    <th className="px-5 py-2.5 font-semibold text-right">Data/Hora</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {logs.length > 0 ? (
                    logs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80 transition-colors group">
                        <td className="px-5 py-2.5 whitespace-nowrap">
                          <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold tracking-tight ${
                            log.log_level === "ERROR" ? "bg-red-50 text-red-600 border border-red-100" : "bg-blue-50 text-blue-600 border border-blue-100"
                          }`}>
                            {log.log_level}
                          </span>
                        </td>
                        <td className="px-5 py-2.5 text-xs text-slate-700 font-medium">
                          {log.message}
                        </td>
                        <td className="px-5 py-2.5 text-[10px] text-slate-400 font-mono">
                          {log.event_type}
                        </td>
                        <td className="px-5 py-2.5 text-[10px] text-slate-400 text-right">
                          {new Date(log.timestamp).toLocaleString("pt-BR", {
                            day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit'
                          })}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="py-12 text-center text-slate-400 italic text-xs">
                        Sem logs para apresentar.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;