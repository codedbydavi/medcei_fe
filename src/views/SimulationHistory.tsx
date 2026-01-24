import { Box } from "@mui/material";
import { Search, Loader2, History } from "lucide-react";
import { NavBar } from "../components/NavBar";
import BackgroundDecoration from "../utils/BackgroundDeco";
import { HistoryRow } from "../components/HistoryRow";
import { useState, useEffect } from "react";
import { statsService } from "../apis/Stats";
import { SimulationData } from "../models/SimulationModel";
import { simulationService } from "../apis/Simulation";
import { toast } from "react-toastify";
import ConfirmDialog from "../components/ConfirmDialog";

const SimulationHistoryView = () => {
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [simulations, setSimulations] = useState<SimulationData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [simulationToDelete, setSimulationToDelete] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const data = await statsService.getAllUserSimulations();
        setSimulations(data.simulations);
      } catch (err) {
        setError("Não foi possível carregar os dados.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredSimulations = simulations.filter(
    (sim) =>
      sim.name.toLowerCase().includes(search.toLowerCase()) ||
      sim.id.includes(search),
  );

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(filteredSimulations.map((s) => s.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectOne = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id],
    );
  };

  const handleDelete = async (id: string | number) => {
    setConfirmDialogOpen(true);
    setSimulationToDelete(id.toString());
  };

  const deleteSimulation = async (id: string) => {
    try {
      setLoading(true);
      await simulationService.deleteSimulation(id);
      setSimulations((prev) => prev.filter((sim) => sim.id !== id));
      toast.success("Simulação excluída com sucesso!");
    } catch (err) {
      toast.error("Erro ao excluir a simulação.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex h-screen ">
      <BackgroundDecoration />
      <Box sx={{ zIndex: 1, width: "100%" }}>
        <div className="p-4 md:p-8 max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 gap-4">
            <div>
              <div className="flex items-center gap-2">
                <History className="text-teal-600" size={28} />
                <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                  Histórico
                </h1>
              </div>
              <p className="text-gray-400 text-sm">
                Controle as suas simulações
              </p>
            </div>

            <div className="relative w-full md:w-72">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Procurar..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-100 rounded-xl focus:ring-2 focus:ring-teal-500/20 outline-none shadow-sm"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
              />
            </div>
          </div>

          <div className="bg-white rounded-[2rem] shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto max-h-[65vh] scrollbar-thin scrollbar-thumb-teal-200">
              <table className="w-full text-left border-collapse min-w-[850px]">
                <thead className="bg-gray-50/50 sticky top-0 z-10 backdrop-blur-md">
                  <tr className="text-gray-400 text-[11px] uppercase tracking-widest font-bold">
                    <th className="px-6 py-5 w-10">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer accent-teal-600"
                        onChange={handleSelectAll}
                        checked={
                          selectedIds.length === filteredSimulations.length &&
                          filteredSimulations.length > 0
                        }
                      />
                    </th>
                    <th className="px-6 py-5">Nome/Modelo</th>
                    <th className="px-6 py-5">Data</th>
                    <th className="px-6 py-5">Duração (Dias)</th>
                    <th className="px-6 py-5">Estado</th>
                    <th className="px-6 py-5 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {loading ? (
                    <tr>
                      <td colSpan={6} className="py-20 text-center">
                        <Loader2 className="w-8 h-8 animate-spin text-teal-500 mx-auto" />
                      </td>
                    </tr>
                  ) : error ? (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-red-500"
                      >
                        {error}
                      </td>
                    </tr>
                  ) : filteredSimulations.length > 0 ? (
                    filteredSimulations.map((sim) => (
                      <HistoryRow
                        key={sim.id}
                        id={sim.id}
                        name={sim.name}
                        created_at={new Date(sim.created_at).toLocaleDateString(
                          "pt-PT",
                        )}
                        duration_days={sim.duration_days}
                        status={
                          sim.status === "FINISHED" ? "Finalizado" : "Error"
                        }
                        isSelected={selectedIds.includes(sim.id)}
                        onSelect={() => handleSelectOne(sim.id)}
                        color={sim.status === "FINISHED" ? "green" : "yellow"}
                        onDelete={handleDelete}
                      />
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="py-10 text-center text-gray-400"
                      >
                        Nenhuma simulação encontrada.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </Box>
      <ConfirmDialog
        title="Confirmar Exclusão"
        message="Tem certeza que deseja excluir esta simulação?"
        isOpen={confirmDialogOpen}
        onConfirm={() => {
          if (simulationToDelete) {
            deleteSimulation(simulationToDelete);
          }
          setConfirmDialogOpen(false);
        }}
        onCancel={() => setConfirmDialogOpen(false)}
      />
    </div>
  );
};

export default SimulationHistoryView;
