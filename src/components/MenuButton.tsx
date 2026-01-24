interface MenuButtonProps {
  label: string;
  color: "green" | "yellow" | "blue";
  onClick?: () => void;
}

export const MenuButton = ({ label, color, onClick }: MenuButtonProps) => {
  const colorClasses = {
    green: "bg-teal-500",
    yellow: "bg-amber-400",
    blue: "bg-blue-400",
  };

  return (
    <button
      onClick={onClick}
      className="bg-white rounded-2xl p-4 md:p-6 shadow-sm border border-gray-100 w-full h-24 md:h-32 flex items-center gap-3 md:gap-5 transition-all hover:shadow-md active:scale-[0.98] cursor-pointer hover:bg-gray-50 text-left"
    >
      <div className={`h-10 w-10 md:h-14 md:w-14 rounded-xl md:rounded-2xl flex-shrink-0 ${colorClasses[color]} flex items-center justify-center shadow-inner`}>
          <div className="w-4 h-4 md:w-6 md:h-6 bg-white/30 rounded-md" />
      </div>

      <span className="text-gray-700 font-bold text-sm md:text-lg leading-tight">
        {label}
      </span>
    </button>
  );
};