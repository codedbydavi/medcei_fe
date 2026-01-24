import { Activity, Clock, Play, Settings, Users } from "lucide-react";
import SimulationParameters from "../models/SimulationModel";
import { use, useEffect, useState } from "react";
import BackgroundDecoration from "../utils/BackgroundDeco";
import { simulationService } from "../apis/Simulation";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/Paths";
import { toast } from "react-toastify";

interface ConfigProps {
  onRun: (id: string | number, params: SimulationParameters) => void;
  onBackReceived: SimulationParameters | null;
}

const SimulationConfigurator = ({ onRun, onBackReceived }: ConfigProps) => {
  const navigate = useNavigate();
  const [simulationName, setSimulationName] = useState("");
  const [params, setParams] = useState<SimulationParameters>(
    new SimulationParameters("Nova Sim", 1, 1000, 1, 0, 0.3, 0.1, 160),
  );

  useEffect(() => {
    if (onBackReceived) {
      setParams(onBackReceived);
      setSimulationName(onBackReceived.name);
    }
  }, [onBackReceived]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => {
      const newValue = ["N", "I", "R", "duration"].includes(name)
        ? parseInt(value) || 0
        : parseFloat(value) || 0;

      const updatedData = { ...prev, [name]: newValue };
      return new SimulationParameters(
        updatedData.name,
        updatedData.model_id,
        updatedData.N,
        updatedData.I,
        updatedData.R,
        updatedData.beta,
        updatedData.gamma,
        updatedData.duration,
      );
    });
  };

  const S = params.N - params.I - params.R;
  const R0 = params.gamma !== 0 ? (params.beta / params.gamma).toFixed(2) : "∞";

  const applyPreset = (disease: "COVID" | "FLU" | "MEASLES") => {
    let newParams: SimulationParameters;
    switch (disease) {
      case "COVID":
        setSimulationName("Cenário COVID-19");
        newParams = new SimulationParameters(
          "Covid-19",
          1,
          1000,
          1,
          0,
          0.3,
          0.1,
          160,
        );
        break;
      case "FLU":
        setSimulationName("Surto de Influenza");
        newParams = new SimulationParameters(
          "Influenza",
          1,
          1000,
          1,
          0,
          0.2,
          0.1,
          120,
        );
        break;
      case "MEASLES":
        setSimulationName("Epidemia de Sarampo");
        newParams = new SimulationParameters(
          "Sarampo",
          1,
          1000,
          1,
          0,
          0.8,
          0.1,
          200,
        );
        break;
      default:
        return;
    }
    setParams(newParams);
  };

  const handleRunClick = async () => {
    if (!simulationName.trim()) {
      toast.warn("Por favor, insira um nome para a simulação.");
      return;
    }
    try {
      params.name = simulationName;
      const response = await simulationService.startSimulation(params.toJson());
      if (response.simulation_id) onRun(response.simulation_id, params);
    } catch (error) {
      toast.error("Erro técnico ao iniciar simulação.");
    }
  };

  return (
    <div className="min-h-screen relative flex flex-col p-3 md:p-6 lg:p-4 xl:p-8 bg-slate-50/50 font-sans text-gray-700">
      <BackgroundDecoration />

      <div className="relative z-10 max-w-7xl mx-auto w-full">
        {/* Header */}
        <header className="mb-4 md:mb-6">
          <div className="flex justify-between items-center mb-6 md:mb-8">
            <div>
              <div className="flex items-center gap-2">
                <Settings className="text-teal-600" size={28} />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Configurador
                </h1>
              </div>
              <p className="text-xs md:text-sm text-gray-500">
                Defina os parâmetros da sua simulação
              </p>
            </div>
          </div>
        </header>

        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-4">
          {/* --- COLUNA DA ESQUERDA (INPUTS) --- */}
          <div className="lg:col-span-8 space-y-3 md:space-y-4">
            {/* Identificação */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 ring-1 ring-emerald-500/5">
              <label className="block text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">
                Nome da Simulação
              </label>
              <input
                type="text"
                placeholder="Ex: Cenário Otimista..."
                value={simulationName}
                onChange={(e) => setSimulationName(e.target.value)}
                className="w-full border-gray-200 border rounded-lg p-2.5 focus:ring-2 focus:ring-emerald-500 outline-none transition text-base font-medium"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CARD População */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3 text-emerald-700 font-bold text-sm">
                  <Users size={18} />
                  <h3>População</h3>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="col-span-2">
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">
                      Total (N)
                    </label>
                    <input
                      type="number"
                      name="N"
                      value={params.N}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded p-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">
                      Infectados (I₀)
                    </label>
                    <input
                      type="number"
                      name="I"
                      value={params.I}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded p-1.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">
                      Susceptível (S)
                    </label>
                    <div className="p-1.5 bg-gray-50 border border-gray-100 rounded text-sm text-gray-500 font-mono">
                      {S}
                    </div>
                  </div>
                </div>
              </div>

              {/* CARD Tempo */}
              <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-3 text-slate-700 font-bold text-sm">
                  <Clock size={18} />
                  <h3>Tempo</h3>
                </div>
                <div className="space-y-3">
                  <div>
                    <label className="block text-[10px] font-bold text-gray-400 uppercase">
                      Duração (Dias)
                    </label>
                    <input
                      type="number"
                      name="duration"
                      value={params.duration}
                      onChange={handleChange}
                      className="w-full border border-gray-200 rounded p-1.5 text-sm"
                    />
                  </div>
                  <div className="flex justify-between text-[10px] font-mono text-slate-400 bg-slate-50 p-2 rounded">
                    <span>Step: 1 day</span>
                    <span>Points: {params.duration}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CARD Transmissão */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <div className="flex items-center gap-2 mb-4 text-amber-600 font-bold text-sm">
                <Activity size={18} />
                <h3>Dinâmica de Infecção</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
                    <span>Taxa Transmissão (β)</span>
                    <span className="text-emerald-600">{params.beta}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="2"
                    step="0.01"
                    name="beta"
                    value={params.beta}
                    onChange={handleChange}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-emerald-500"
                  />
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between text-[10px] font-bold uppercase text-gray-500">
                    <span>Taxa Recuperação (γ)</span>
                    <span className="text-amber-600">{params.gamma}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1"
                    step="0.01"
                    name="gamma"
                    value={params.gamma}
                    onChange={handleChange}
                    className="w-full h-1.5 bg-gray-100 rounded-lg appearance-none accent-amber-500"
                  />
                </div>
              </div>
              <div className="mt-4 flex justify-between items-center bg-slate-50 px-4 py-2 rounded-lg border border-slate-100">
                <span className="text-xs font-semibold text-slate-500">
                  R₀ (Número Básico de Reprodução)
                </span>
                <span
                  className={`text-lg font-black ${parseFloat(R0) > 1 ? "text-red-500" : "text-emerald-500"}`}
                >
                  {R0}
                </span>
              </div>
            </div>
          </div>

          {/* --- COLUNA DA DIREITA (DIAGRAMA & PRESETS) --- */}
          <div className="lg:col-span-4 space-y-4">
            {/* SIR Diagram - Altura Fixa Menor */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col items-center">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3 self-start">
                Fluxo do Modelo
              </h3>
              <div className="flex items-center gap-2 w-full justify-around">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-emerald-500 flex items-center justify-center text-white font-bold shadow-sm">
                    S
                  </div>
                  <span className="text-[8px] mt-1 text-gray-400 uppercase">
                    Susc.
                  </span>
                </div>
                <div className="text-emerald-300">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-amber-400 flex items-center justify-center text-white font-bold shadow-sm">
                    I
                  </div>
                  <span className="text-[8px] mt-1 text-gray-400 uppercase">
                    Infec.
                  </span>
                </div>
                <div className="text-amber-300">→</div>
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 rounded-lg bg-slate-800 flex items-center justify-center text-white font-bold shadow-sm">
                    R
                  </div>
                  <span className="text-[8px] mt-1 text-gray-400 uppercase">
                    Recup.
                  </span>
                </div>
              </div>
            </div>

            {/* PRESETS */}
            <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
              <h3 className="text-[10px] font-bold text-gray-400 uppercase mb-3">
                Predefinições
              </h3>
              <div className="flex flex-col gap-2">
                {["COVID", "FLU", "MEASLES"].map((disease) => (
                  <button
                    key={disease}
                    onClick={() => applyPreset(disease as any)}
                    className="w-full flex justify-between items-center px-3 py-2 border border-gray-100 rounded-lg hover:bg-emerald-50 transition text-xs font-semibold text-gray-600"
                  >
                    {disease === "COVID"
                      ? "COVID-19"
                      : disease === "FLU"
                        ? "Influenza"
                        : "Sarampo"}
                    <span className="text-emerald-500 text-lg">›</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Ação Principal */}
            {/* Container da Ação Principal */}
<div className="sticky bottom-0 lg:bottom-4 z-40 mt-6 -mx-3 px-3 py-4 bg-gradient-to-t from-slate-50 via-slate-50/95 to-transparent">
  <button
    onClick={handleRunClick}
    className="
      w-full py-4 rounded-xl text-white font-black flex justify-center items-center gap-2 
      transition transform active:scale-95 bg-emerald-600 hover:bg-emerald-700 text-base
      shadow-xl shadow-emerald-200/40
    "
  >
    <Play size={18} fill="currentColor" /> Simular Agora
  </button>
</div>
          </div>
        </div>
      </div>    </div>
  );
};

export default SimulationConfigurator;
