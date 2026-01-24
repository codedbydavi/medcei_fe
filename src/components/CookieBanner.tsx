import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";

const CookieBanner = () => {
  const [shouldRender, setShouldRender] = useState(false);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const hasAccepted = localStorage.getItem("cookies-accepted");
    if (!hasAccepted) {
      setShouldRender(true);
      const timer = setTimeout(() => setIsActive(true), 100);
      return () => clearTimeout(timer);
    }
  }, []);

  const closeBanner = (saveToStorage: boolean) => {
    setIsActive(false); 
    setTimeout(() => {
      if (saveToStorage) {
        localStorage.setItem("cookies-accepted", "true");
      }
      setShouldRender(false);
    }, 500);
  };

  if (!shouldRender) return null;

  return (
    <div
      className={`
        fixed bottom-6 left-1/2 -translate-x-1/2 z-[100] w-[95%] max-w-4xl
        transition-all duration-700 ease-out
        ${isActive 
          ? "opacity-100 translate-y-0" 
          : "opacity-0 translate-y-20"
        }
      `}
    >
      <div className="relative bg-white/95 backdrop-blur-sm border border-slate-200 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-2xl p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
        
        {/* Botão Fechar (X) no Canto Superior */}
        <button 
          onClick={() => closeBanner(false)} // Fecha sem salvar no storage (aparecerá na próxima visita)
          className="absolute top-3 right-3 text-slate-400 hover:text-slate-600 transition-colors p-1"
          aria-label="Fechar aviso"
        >
          <X size={18} />
        </button>

        <div className="bg-teal-50 p-3 rounded-full hidden sm:block">
          <Cookie className="text-teal-600 w-6 h-6 animate-pulse" />
        </div>
        
        <div className="flex-1 text-center md:text-left pr-4">
          <h4 className="text-sm font-bold text-slate-800 uppercase tracking-wider mb-1">
            Cookies Essenciais
          </h4>
          <p className="text-[11px] sm:text-xs text-slate-500 leading-relaxed">
            Utilizamos apenas cookies necessários para o funcionamento e segurança da plataforma Medcei.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full md:w-auto">
          <button
            onClick={() => closeBanner(true)} // Aceita e salva no storage
            className="flex-1 md:flex-none bg-[#5FB08C] hover:bg-[#4a9675] text-white text-xs font-bold py-2.5 px-8 rounded-xl transition-all shadow-md active:scale-95 whitespace-nowrap"
          >
            Aceitar e Continuar
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;