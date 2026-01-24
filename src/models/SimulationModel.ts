export default class SimulationParameters {
    created_at?: string;

    constructor(
        public name: string,
        public model_id: number,
        public N: number,
        public I: number,
        public R: number,
        public beta: number,
        public gamma: number,
        public duration: number,
    ) {}

    static fromJson(data: any): SimulationParameters {
        return new SimulationParameters(
            data.name || "Simulação",
            data.model_id,
            data.population,
            data.i_initial,
            data.r_initial || 0,
            data.beta,
            data.gamma,
            data.duration_days
        );
    }

    toJson() {
        return {
            model_id: this.model_id,
            name: this.name,
            population: this.N,
            s_initial: this.N - this.I - this.R,
            i_initial: this.I,
            r_initial: this.R,
            beta: this.beta,
            gamma: this.gamma,
            mu: 0,
            duration_days: this.duration,
        };
    }
}

export interface SimulationData {
  id: string;
  name: string;
  model: string | null;
  status: string | null;
  created_at: string;
  duration_days: number;
}

export interface SimulationTimeSeries {
  day: number;
  S: number;
  I: number; 
  R: number; 
  D: number; 
}