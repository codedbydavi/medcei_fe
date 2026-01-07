export const FeaturePill = ({ icon, text }: { icon: string; text: string }) => (
    <div className="bg-white p-4 rounded-2xl shadow-lg flex items-center gap-4 w-full max-w-md hover:scale-105 transition-transform duration-300 border border-slate-50">
        <div className="flex-shrink-0">
            <img src={icon} alt="" className="w-10 h-10 object-contain" />
        </div>
        <span className="text-slate-700 font-medium text-sm leading-tight">
            {text}
        </span>
    </div>
);