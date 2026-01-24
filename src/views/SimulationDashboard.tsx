import { Download, RefreshCw, Edit3, CheckCircle } from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Line,
  ReferenceDot,
  LineChart,
} from "recharts";
import { MetricBar } from "../components/MetricBar";
import { StatCard } from "../components/StatCard";
import SimulationParameters from "../models/SimulationModel";
import { simulationService } from "../apis/Simulation";
import { toast } from "react-toastify";
import { getBatchSize } from "../utils/getBatchSize";
import BackgroundDecoration from "../utils/BackgroundDeco";
import html2pdf from "html2pdf.js";

interface SimulationDashboardProps {
  sim_id: string | number;
  params: SimulationParameters;
  initialData: any[];
  onBack: () => void;
}

const SimulationDashboard = ({
  sim_id,
  params,
  initialData,
  onBack,
}: SimulationDashboardProps) => {
  const [data, setData] = useState<any[]>(initialData || []);
  const [loading, setLoading] = useState(false);

  const isExecuting = useRef(false);
  const lastFetchedId = useRef<string | number | null>(null);
  const pdfRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    if (isExecuting.current || !sim_id) return;
    const isAlreadyFinished = (data?.length || 0) >= params.duration;
    if (isAlreadyFinished) return;

    try {
      isExecuting.current = true;
      setLoading(true);
      let allData: any[] = [...data];
      let finishedSimulation = false;
      const batchSize = getBatchSize(params.duration, 20);

      while (!finishedSimulation) {
        const response = await simulationService.runSimulation(sim_id, batchSize);
        if (!response) break;
        const { new_data, finished, status } = response;

        if (finished || status === "FINISHED") finishedSimulation = true;

        if (new_data && new_data.length > 0) {
          const uniqueNewData = new_data.filter(
            (newItem: any) => !allData.some((oldItem) => oldItem.day === newItem.day)
          );
          allData = [...allData, ...uniqueNewData];
          setData([...allData]);
        }
        if (finishedSimulation) break;
      }
      if (finishedSimulation) toast.info("Simulação concluída.");
    } catch (error: any) {
      console.error("Erro no fetch:", error);
      toast.error("Falha ao processar lote.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (lastFetchedId.current !== sim_id) {
      isExecuting.current = false;
      lastFetchedId.current = sim_id;
      setData(initialData || []);
    }
    const isAlreadyFinished = (initialData?.length || 0) >= params.duration;
    if (!isExecuting.current && !isAlreadyFinished) {
      fetchData();
    }
  }, [sim_id, initialData]);

  const metrics = useMemo(() => {
    if (!data || data.length === 0)
      return { peak: 0, peakDay: 0, recovered: 0, attackRate: "0", peakPrevalence: "0", currentDay: 0 };

    let maxI = 0;
    let maxIDay = 0;
    data.forEach((point) => {
      if (point.I > maxI) {
        maxI = point.I;
        maxIDay = point.day;
      }
    });

    const lastPoint = data[data.length - 1];
    const totalPop = params.N;
    const attackRate = (((lastPoint.R + (lastPoint.D || 0)) / totalPop) * 100).toFixed(1);
    const peakPrevalence = ((maxI / totalPop) * 100).toFixed(1);

    return {
      peak: Math.round(maxI),
      peakDay: maxIDay,
      recovered: Math.round(lastPoint.R),
      attackRate,
      peakPrevalence,
      currentDay: lastPoint.day,
    };
  }, [data, params]);

  const handleExportPDF = () => {
    if (!pdfRef.current) return;

    const element = pdfRef.current;

    const opt = {
      margin: 10,
      filename: `simulacao_${sim_id}.pdf`,
      image: {
        type: "jpeg" as const,
        quality: 0.98,
      },
      html2canvas: {
        scale: 2,
        useCORS: true,
      },
      jsPDF: {
        unit: "mm" as const,
        format: "a4" as const,
        orientation: "portrait" as const,
      },
    };

    html2pdf().set(opt).from(element).save();
  };

  const formattedDate = params.created_at 
    ? new Date(params.created_at).toLocaleString("pt-BR") 
    : new Date().toLocaleString("pt-BR");

  return (
    <div ref={pdfRef} className="min-h-screen w-full p-4 md:p-6 lg:p-8 font-sans relative overflow-x-hidden bg-gray-50">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* CABEÇALHO AJUSTADO */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-teal-600 flex-shrink-0" size={28} />
              <h1 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800 truncate">
                Resultados da Simulação
              </h1>
            </div>
            <p className="text-xs md:text-sm text-gray-500 truncate">
              {params.name} • ID: #{sim_id} • {formattedDate}
            </p>
          </div>
          <button
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 text-sm font-medium shadow-sm transition-all active:scale-95"
            onClick={handleExportPDF}
          >
            <Download size={16} /> Exportar PDF
          </button>
        </div>

        {/* CARTÕES KPI - Grid mais flexível */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-6">
          <StatCard title="Pico de Infeções" value={metrics.peak.toLocaleString()} sub={`Dia ${metrics.peakDay}`} color="bg-yellow-50 text-yellow-700" />
          <StatCard title="Total Recuperados" value={metrics.recovered.toLocaleString()} sub={`Até o Dia ${metrics.currentDay}`} color="bg-emerald-50 text-emerald-700" />
          <StatCard title="Duração Atual" value={`${metrics.currentDay} dias`} sub="Tempo decorrido" color="bg-gray-100 text-gray-700" />
          <StatCard title="Valor R₀" value={(params.beta / params.gamma).toFixed(2)} sub="Taxa reprodutiva" color="bg-blue-50 text-blue-700" />
        </div>

        {/* CONTEÚDO PRINCIPAL - Mudança para grid 3 colunas apenas em telas XL (1280px+) */}
        <div className="flex flex-col xl:grid xl:grid-cols-3 gap-6">
          
          {/* GRÁFICO */}
          <div className="xl:col-span-2 bg-white p-4 md:p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <h3 className="font-bold text-gray-700 text-sm md:text-base">Dinâmica Populacional</h3>
              <div className="flex flex-wrap gap-3 text-[10px] md:text-xs font-bold uppercase tracking-wider">
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-emerald-500"></div> Suscetíveis</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-yellow-400"></div> Infetados</span>
                <span className="flex items-center gap-1.5"><div className="w-3 h-3 rounded-full bg-gray-800"></div> Recuperados</span>
              </div>
            </div>

            <div className="h-[300px] md:h-[400px] lg:h-[450px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#9ca3af" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(val) => val >= 1000 ? `${val / 1000}k` : val} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)' }}
                  />
                  <Line type="monotone" dataKey="S" stroke="#10b981" strokeWidth={3} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="I" stroke="#facc15" strokeWidth={3} dot={false} isAnimationActive={false} />
                  <Line type="monotone" dataKey="R" stroke="#1f2937" strokeWidth={3} dot={false} isAnimationActive={false} />
                  {metrics.peakDay > 0 && <ReferenceDot x={metrics.peakDay} y={metrics.peak} r={5} fill="#facc15" stroke="white" />}
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* BARRA LATERAL */}
          <div className="space-y-6">
            {/* Impacto */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-6 uppercase text-xs tracking-widest">Métricas de Impacto</h3>
              <div className="space-y-6">
                <MetricBar label="Taxa de Ataque" value={metrics.attackRate} color="bg-emerald-500" />
                <MetricBar label="Prevalência de Pico" value={metrics.peakPrevalence} color="bg-yellow-400" />
                
                <div className="pt-2">
                  <div className="flex justify-between text-[10px] font-black text-gray-400 uppercase mb-2">
                    <span>Progresso</span>
                    <span>{Math.round((metrics.currentDay / params.duration) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div 
                      className="bg-gray-800 h-2 rounded-full transition-all duration-500" 
                      style={{ width: `${Math.min((metrics.currentDay / params.duration) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Parâmetros */}
            <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-700 mb-4 text-sm">Parâmetros de Entrada</h3>
              <div className="space-y-3 text-xs md:text-sm text-gray-600">
                <div className="flex justify-between"><span>População (N)</span><span className="font-mono font-bold text-gray-900">{params.N.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>β (Transmissão)</span><span className="font-mono font-bold text-gray-900">{params.beta}</span></div>
                <div className="flex justify-between"><span>γ (Recuperação)</span><span className="font-mono font-bold text-gray-900">{params.gamma}</span></div>
              </div>
            </div>

            {/* AÇÕES FIXAS NO FINAL DA BARRA */}
            <div className="flex flex-col gap-3">
              <button
                onClick={fetchData}
                disabled={loading}
                className="w-full py-3.5 rounded-xl bg-emerald-600 text-white font-bold flex justify-center items-center gap-2 hover:bg-emerald-700 transition-all shadow-md disabled:opacity-50 active:scale-95"
              >
                <RefreshCw size={18} className={loading ? "animate-spin" : ""} />
                {loading ? "Calculando..." : "Simular Novamente"}
              </button>

              <button
                onClick={onBack}
                className="w-full py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-bold flex justify-center items-center gap-2 hover:bg-gray-50 transition-all active:scale-95"
              >
                <Edit3 size={18} /> Mudar Parâmetros
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimulationDashboard;