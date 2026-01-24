/**
 * Calcula o tamanho de cada lote (batch_size) para o backend.
 * O objetivo é que o backend processe a simulação em exatamente N iterações.
 * * @param totalDays - Duração total (ex: 353)
 * @param iterations - Quantas vezes queremos atualizar o gráfico (ex: 20)
 * @returns O tamanho do lote (batch_size)
 */
export const getBatchSize = (totalDays: number, iterations: number = 20): number => {
  // Se a simulação for mais curta que o número de iterações desejado,
  // processamos 1 dia por vez.
  if (totalDays <= iterations) return 1;

  // Caso contrário, dividimos o total pelas iterações.
  // Usamos Math.ceil para garantir que cubra todo o período.
  return Math.ceil(totalDays / iterations);
};