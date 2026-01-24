import { SimulationData } from "../models/SimulationModel";
import { AdminSummary, ChartData, SystemLogEntry, UserStats } from "../models/StatsModel";
import api from "./api";

export const statsService = {
  // GET /stats/summary (Apenas Admin)
  getAdminSummary: async () => {
    const response = await api.get<AdminSummary>("/stats/summary");
    return response.data;
  },

  getDashboardStats: async () => {
    const response = await api.get<ChartData>("/stats/dashboard-charts");
    return response.data;
  },

  getSystemLogs: async (limit: number) => {
    const response = await api.get<SystemLogEntry[]>(`/stats/logs/${limit}`);
    return response.data;
  },

  // GET /stats/user_simulations (Histórico do utilizador)
  getRecentUserSimulations: async () => {
    const response = await api.get<any>("/stats/recent_user_sim");
    if (response.data.recent_simulation && !response.data.simulations) {
      return {
        simulations: [response.data.recent_simulation],
      };
    }
    return {
      simulations: response.data.simulations || [],
    };
  },

  getAllUserSimulations: async () => {
    const response = await api.get<any>("/stats/all_user_sim");
    if (response.data.recent_simulation && !response.data.simulations) {
      return {
        simulations: [response.data.recent_simulation],
      };
    }
    return {
      simulations: response.data.simulations || [],
    };
  },

  // GET /stats/user_stats (Cards de resumo do utilizador)
  getUserStats: async () => {
    const response = await api.get<UserStats>("/stats/user_stats");
    return response.data;
  },
};
