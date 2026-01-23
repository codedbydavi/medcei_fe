export interface UserStats {
  total_simulations: number;
  simulations_this_month: number;
  average_duration_days: number;
  average_simulations_per_month: number;
}

export interface AdminSummary {
  total_users: number;
  total_simulations: number;
  most_used_model: string;
  model_usage_count: number;
}

export interface ChartData {
  lineChart: { date: string; count: number }[];
  pieChart: { name: string; value: number }[];
}

export interface SystemLogEntry {
  id: string;
  timestamp: string;
  log_level: 'ERROR' | 'INFO' | 'WARNING';
  event_type: string;
  message: string;
  user_id?: string;
  simulation_id?: string;
}