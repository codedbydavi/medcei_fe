import { useEffect, useState } from "react";
import SimulationConfigurator from "./SimulationConfigurator";
import SimulationDashboard from "./SimulationDashboard";
import SimulationParameters from "../models/SimulationModel";
import { useLocation } from "react-router-dom";
import { simulationService } from "../apis/Simulation";

const SimulationManager = () => {
  const location = useLocation();
  const [view, setView] = useState<"config" | "dashboard">("config");
  const [activeSimId, setActiveSimId] = useState<string | number | null>(null);
  const [currentParams, setCurrentParams] =
    useState<SimulationParameters | null>(null);
  const [initialHistory, setInitialHistory] = useState<any[]>([]);

  const handleStartSimulation = (
    id: string | number,
    params: SimulationParameters,
  ) => {
    setActiveSimId(id);
    setCurrentParams(params);
    setView("dashboard");
  };

  const handleBackToConfig = () => {
    setView("config");
  };

  useEffect(() => {
    const editSim = location.state?.editSim;
    const simIdToLoad =
      editSim?.id ||
      (typeof editSim === "string" || typeof editSim === "number"
        ? editSim
        : null);

    if (simIdToLoad) {
      const loadExistingSim = async () => {
        try {
          const fullData =
            await simulationService.getSimulationDetails(simIdToLoad);
            
          const params = Object.assign(
            new SimulationParameters(
              fullData.name,
              fullData.model_id,
              fullData.parameters.population,
              fullData.parameters.i_initial,
              fullData.parameters.r_initial,
              fullData.parameters.beta,
              fullData.parameters.gamma,
              fullData.duration_days,
            ),
            { created_at: fullData.created_at },
          );

          setActiveSimId(fullData.id);
          setCurrentParams(params);
          setInitialHistory(fullData.history);
          setView("dashboard");
        } catch (error) {
          console.error("Erro ao carregar simulação existente");
        }
      };

      loadExistingSim();
    }
  }, [location.state]);

  return (
    <>
      {view === "config" ? (
        <SimulationConfigurator onRun={handleStartSimulation} onBackReceived={currentParams} />
      ) : (
        <SimulationDashboard
          sim_id={activeSimId!}
          params={currentParams!}
          initialData={initialHistory}
          onBack={handleBackToConfig}
        />
      )}
    </>
  );
};

export default SimulationManager;
