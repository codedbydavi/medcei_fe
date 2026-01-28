import SimulationParameters, { SimulationData, SimulationTimeSeries } from "../models/SimulationModel";
import api from "./Api";

export const simulationService = {
  // POST /simulate/start - Inicia os parâmetros
  startSimulation: async (data: any) => {
    const response = await api.post("/simulation/start", data, {});
    return response.data
  },

  // POST /simulate/run_chunk/:sim_id - Executa um chunk da simulação
  runSimulation: async (sim_id: number | string, chunk: number) => {
    const response = await api.post(`/simulation/run_chunk/${sim_id}`, {batch_size: chunk});
    return response.data;
  },

  // GET /history/all - Obtém todas as simulações do utilizador
  getSimulationDetails: async (sim_id: number | string) => {
    const response = await api.get(`/history/details/${sim_id}`, {});
    return response.data;
  },

  // DELETE /history/delete/:sim_id - Elimina uma simulação do utilizador
  deleteSimulation: async (sim_id: number | string) => {
    const response = await api.delete(`/history/delete/${sim_id}`, {});
    return response.data;
  }
  
};