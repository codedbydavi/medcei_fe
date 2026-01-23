import React from 'react';

interface VirusProps {
  className: string;
  size: number;
  style?: React.CSSProperties; // Adicionado para aceitar o estilo de animação
}

const VirusElement = ({ className, size, style }: VirusProps) => {
  const totalSpikes = 16; 

  return (
    <div 
      className={`absolute pointer-events-none ${className}`} 
      style={{ width: size, height: size, ...style }} // Mescla o tamanho com o style recebido
    >
      {/* Sombra projetada no fundo */}
      <div className="absolute inset-[15%] bg-black/10 rounded-full blur-2xl" />

      {/* Corpo principal esférico */}
      <div 
        className="absolute inset-[20%] rounded-full opacity-90 shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.2)]"
        style={{ backgroundColor: 'currentColor' }}
      />
      
      {/* Espículas (Haste + Círculo na ponta) */}
      {[...Array(totalSpikes)].map((_, i) => (
        <div
          key={i}
          className="absolute left-1/2 top-1/2"
          style={{
            width: size * 0.04,
            height: size * 0.45,
            transform: `translate(-50%, -50%) rotate(${i * (360 / totalSpikes)}deg) translateY(-55%)`,
            transformOrigin: 'center center',
          }}
        >
          {/* Haste */}
          <div className="w-full h-full bg-current opacity-70 rounded-full" />
          
          {/* Ponta Arredondada */}
          <div 
            className="absolute -top-[5%] left-1/2 -translate-x-1/2 rounded-full bg-current shadow-sm" 
            style={{ 
              width: size * 0.12, 
              height: size * 0.12,
              filter: 'brightness(1.1)' 
            }}
          />
        </div>
      ))}
    </div>
  );
};

const BackgroundDecoration = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Vírus Superior Direito (Grande) - Rotação Lenta */}
      <VirusElement 
        className="text-teal-500/20 -top-20 -right-20 animate-[spin_120s_linear_infinite]" 
        size={500} 
      />
      
      {/* Vírus Médio (Esquerda) - Rotação Inversa */}
      <VirusElement 
        className="text-teal-400/30 top-[25%] left-[5%] animate-[spin_80s_linear_infinite_reverse]" 
        size={220} 
      />

      {/* Vírus Inferior Esquerdo (Laranja) - Rotação e Pulsação */}
      <VirusElement 
        className="text-amber-500/20 -bottom-16 -left-16 animate-[spin_150s_linear_infinite]" 
        size={380} 
      />

      {/* Vírus Lateral Direito - Usando o style para duração customizada */}
      <VirusElement 
        className="text-teal-500/25 bottom-[20%] -right-10 animate-pulse" 
        style={{ animationDuration: '8s' }}
        size={180} 
      />
    </div>
  );
};

export default BackgroundDecoration;