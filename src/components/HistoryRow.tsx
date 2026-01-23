import { FileText, Trash } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { PATHS } from "../routes/Paths";
import { on } from "events";

interface HistoryRowProps {
  name: string;
  id: string;
  created_at: string;
  duration_days: number;
  status: string | null;
  isSelected: boolean;
  onSelect: () => void;
  onDelete?: (id: number | string) => void;
  color?: "green" | "yellow";
}

export const HistoryRow = ({
  name,
  id,
  created_at,
  duration_days,
  status,
  isSelected,
  onSelect,
  onDelete,
  color,
}: HistoryRowProps) => {
  const bgColor = color === "green" ? "bg-teal-500" : "bg-amber-400";
  const badgeColor =
    color === "green"
      ? "bg-teal-50 text-teal-600"
      : "bg-amber-50 text-amber-600";
  const navigate = useNavigate();

  return (
    <tr
      className={`hover:bg-gray-50/50 transition-colors border-b border-gray-100 ${
        isSelected ? "bg-teal-50/20" : ""
      }`}
    >
      <td className="px-6 py-5">
        <input
          type="checkbox"
          className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500 cursor-pointer accent-teal-600"
          checked={isSelected}
          onChange={onSelect}
        />
      </td>
      <td className="px-6 py-5 flex items-center gap-4 text-left">
        <div
          className={`h-12 w-12 rounded-xl ${bgColor} flex items-center justify-center text-white shadow-sm shrink-0`}
        >
          <div className="w-3 h-3 bg-white rounded-full" />
        </div>
        <div>
          <div className="font-bold text-gray-700 text-sm md:text-base">
            {name}
          </div>
          <div className="text-xs text-gray-400">Simulação #{id}</div>
        </div>
      </td>
      <td className="px-6 py-5 text-sm text-gray-400">{created_at}</td>
      <td className="px-6 py-5">
        <span
          className={`px-2.5 py-1 rounded-md text-xs font-bold ${badgeColor}`}
        >
          {duration_days} dias
        </span>
      </td>
      <td className="px-6 py-5">
        <div className="flex items-center gap-2 text-sm text-teal-600 font-medium">
          <div className="w-2 h-2 bg-teal-500 rounded-full" />
          {status || "Processando"}
        </div>
      </td>
      <td className="px-6 py-5 text-right">
        <div className="flex gap-4 justify-end text-gray-300">
          <FileText
            className="w-5 h-5 cursor-pointer hover:text-teal-600 transition-colors"
            onClick={() =>
              navigate(PATHS.SIMULATION_MANAGER, { state: { editSim: id } })
            }
          />
          <Trash
            className="w-5 h-5 cursor-pointer hover:text-red-500 transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              onDelete?.(id);
            }}
          />
        </div>
      </td>
    </tr>
  );
};
