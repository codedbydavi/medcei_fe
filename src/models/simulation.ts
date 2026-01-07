export default class SimulationParameters {
    constructor(
        public N: number,
        public I: number,
        public R: number,
        public beta: number,
        public gamma: number,
        public duration: number,
    ) {}
}