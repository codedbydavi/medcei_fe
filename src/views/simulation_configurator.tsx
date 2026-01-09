import { Activity, Clock, Play, Save, Users } from "lucide-react";
import SimulationParameters from "../models/simulation";
import { useState } from "react";
import medcei_logo_simples from "../assets/medcei_logo_simples_verde.png";
import BackgroundDecoration from "../utils/background_deco";

const SimulationConfigurator = () => {
  const [params, setParams] = useState<SimulationParameters>(
    new SimulationParameters(1000, 1, 0, 0.3, 0.1, 160)
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setParams((prev) => ({
      ...prev,
      [name]:
        name === "N" || name === "I" || name === "R" || name === "duration"
          ? parseInt(value)
          : parseFloat(value),
    }));
  };

  const S = params.N - params.I - params.R;
  const R0 = params.gamma !== 0 ? (params.beta / params.gamma).toFixed(2) : "∞";

  const applyPreset = (disease: "COVID" | "FLU" | "MEASLES") => {
    switch (disease) {
      case "COVID":
        setParams(new SimulationParameters(1000, 1, 0, 0.3, 0.1, 160));
        break;
      case "FLU":
        setParams(new SimulationParameters(1000, 1, 0, 0.2, 0.1, 120));
        break;
      case "MEASLES":
        setParams(new SimulationParameters(1000, 1, 0, 0.8, 0.1, 200));
        break;
    }
  };

  const handleRunClick = () => {
    // Lógica para rodar a simulação com os parâmetros atuais
    console.log("Rodando simulação com parâmetros:", params);
  };

  return (
    <div className="relative min-h-screen p-8 font-sans text-gray-700 bg-[#F0F8F8] overflow-hidden">
      {/* Decoração de Fundo */}
      <BackgroundDecoration />

      <div className="relative z-10">
      {/* Header */}
      <div className="flex justify-between items-center mb-8">
        <div className="flex space-around items-center gap-4">
          <img
            src={medcei_logo_simples}
            alt="Medcei Logo"
            className="h-12 md:h-16 object-contain"
          />

          <div>
            <h1 className="text-3xl font-bold">Configurador de Simulação</h1>
            <p className="text-sm text-gray-500">
              Defina os parâmetros da sua simulação abaixo
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- COLUNA DA ESQUERDA (INPUTS) --- */}
        <div className="lg:col-span-2 space-y-6">
          {/* CARD 1: Population */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-emerald-700 font-semibold">
              <div className="bg-emerald-100 p-2 rounded-lg">
                <Users size={20} />
              </div>
              <h3>Population Parameters</h3>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="col-span-2">
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  População Total (N)
                </label>
                <input
                  type="number"
                  name="N"
                  value={params.N}
                  onChange={handleChange}
                  className="w-full border-gray-300 border rounded-lg p-2 focus:ring-2 focus:ring-emerald-500 outline-none transition"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Susceptível (S₀)
                </label>
                <div className="relative">
                  <input
                    disabled
                    value={S}
                    className="w-full bg-gray-50 border-gray-200 border rounded-lg p-2 text-gray-500 cursor-not-allowed"
                  />
                  <span className="absolute right-3 top-2 text-xs text-emerald-500 font-bold">
                    {((S / params.N) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Infectados (I₀)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="I"
                    value={params.I}
                    onChange={handleChange}
                    className="w-full border-gray-300 border rounded-lg p-2 focus:ring-2 focus:ring-yellow-500 outline-none"
                  />
                  <span className="absolute right-3 top-2 text-xs text-yellow-500 font-bold">
                    {((params.I / params.N) * 100).toFixed(2)}%
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* CARD 2: Transmissão */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-yellow-700 font-semibold">
              <div className="bg-yellow-100 p-2 rounded-lg">
                <Activity size={20} />
              </div>
              <h3>Transmission Parameters</h3>
            </div>

            <div className="space-y-6">
              {/* Beta Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-gray-500">
                    Taxa Transmissão (β)
                  </label>
                  <span className="text-xs font-bold bg-emerald-100 text-emerald-700 px-2 rounded">
                    {params.beta}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="2"
                  step="0.01"
                  name="beta"
                  value={params.beta}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-emerald-500"
                />
              </div>

              {/* Gamma Slider */}
              <div>
                <div className="flex justify-between mb-1">
                  <label className="text-xs font-bold text-gray-500">
                    Taxa Recuperação (γ)
                  </label>
                  <span className="text-xs font-bold bg-yellow-100 text-yellow-700 px-2 rounded">
                    {params.gamma}
                  </span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  name="gamma"
                  value={params.gamma}
                  onChange={handleChange}
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                />
              </div>

              {/* R0 Display */}
              <div className="flex justify-between items-center bg-gray-50 p-4 rounded-lg">
                <span className="text-sm font-medium text-gray-600">
                  Número de Reprodução Básica (R₀ = β/γ)
                </span>
                <div
                  className={`text-xl font-bold px-4 py-1 rounded-lg ${
                    parseFloat(R0 as string) > 1
                      ? "bg-red-100 text-red-600"
                      : "bg-emerald-100 text-emerald-600"
                  }`}
                >
                  {R0}
                </div>
              </div>
            </div>
          </div>

          {/* CARD 3: Tempo */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <div className="flex items-center gap-2 mb-4 text-gray-700 font-semibold">
              <div className="bg-gray-100 p-2 rounded-lg">
                <Clock size={20} />
              </div>
              <h3>Time Parameters</h3>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Duração (dias)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={params.duration}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded p-2"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Time Step
                </label>
                <input
                  disabled
                  value="1 day"
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-gray-500"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1">
                  Pontos de Dados
                </label>
                <input
                  disabled
                  value={params.duration}
                  className="w-full bg-gray-50 border border-gray-200 rounded p-2 text-gray-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* --- COLUNA DA DIREITA (VISUAL & AÇÕES) --- */}
        <div className="space-y-6">
          {/* SIR FLOW DIAGRAM */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 mb-4">
              SIR Modelo Flow
            </h3>

            <div className="flex flex-col gap-2 items-center w-full">
              {/* S Block */}
              <div className="w-full bg-emerald-500 text-white py-3 rounded-lg text-center shadow-md relative">
                <span className="text-xs opacity-80 block">Susceptível</span>
                <span className="font-bold text-xl">S</span>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-emerald-500">
                  ▼
                </div>
              </div>

              {/* Arrow Rate */}
              <div className="py-2 text-xs text-blue-400 font-mono bg-blue-50 px-4 rounded-full my-1">
                β (transmission)
              </div>

              {/* I Block */}
              <div className="w-full bg-yellow-400 text-white py-3 rounded-lg text-center shadow-md relative">
                <span className="text-xs opacity-80 block">Infectados</span>
                <span className="font-bold text-xl">I</span>
                <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 text-yellow-400">
                  ▼
                </div>
              </div>

              {/* Arrow Rate */}
              <div className="py-2 text-xs text-orange-400 font-mono bg-orange-50 px-4 rounded-full my-1">
                γ (recovery)
              </div>

              {/* R Block */}
              <div className="w-full bg-gray-800 text-white py-3 rounded-lg text-center shadow-md">
                <span className="text-xs opacity-80 block">Recuperados</span>
                <span className="font-bold text-xl">R</span>
              </div>
            </div>
          </div>

          {/* PRESETS */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
            <h3 className="text-sm font-bold text-gray-500 mb-4">
              Predefinições Rápidas
            </h3>
            <div className="space-y-2">
              <button
                onClick={() => applyPreset("COVID")}
                className="w-full flex justify-between items-center px-4 py-3 border rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  COVID-19
                </span>
                <span className="text-gray-400 text-xs">›</span>
              </button>
              <button
                onClick={() => applyPreset("FLU")}
                className="w-full flex justify-between items-center px-4 py-3 border rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  Influenza
                </span>
                <span className="text-gray-400 text-xs">›</span>
              </button>
              <button
                onClick={() => applyPreset("MEASLES")}
                className="w-full flex justify-between items-center px-4 py-3 border rounded-lg hover:bg-emerald-50 hover:border-emerald-200 transition group"
              >
                <span className="text-sm font-medium text-gray-700 group-hover:text-emerald-700">
                  Sarampo
                </span>
                <span className="text-gray-400 text-xs">›</span>
              </button>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="space-y-3">
            {/* Botão Simplificado: Sempre é "Run" pois ao clicar a tela muda */}
            <button
              onClick={handleRunClick}
              className="w-full py-4 rounded-lg shadow-lg text-white font-bold flex justify-center items-center gap-2 transition transform active:scale-95 bg-emerald-600 hover:bg-emerald-700"
            >
              <Play size={20} /> Rodar Simulação
            </button>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
};

export default SimulationConfigurator;
