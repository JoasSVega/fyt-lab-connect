// KPICard: Tarjeta de KPI con animación de conteo y estilo académico
import React, { useEffect, useRef, useState } from "react";

export interface KPICardProps {
  icon: React.ReactNode;
  value: number;
  label: string;
  subtitle?: string;
  colorFrom?: string; // gradiente
  colorTo?: string;
  iconBg?: string;
  numberColor?: string;
  subtitleColor?: string;
  delay?: number;
  duration?: number; // duración de la animación en ms
}

const KPICard: React.FC<KPICardProps> = ({
  icon,
  value,
  label,
  subtitle,
  colorFrom = "from-blue-50",
  colorTo = "to-white",
  iconBg = "bg-blue-50",
  numberColor = "text-blue-700",
  subtitleColor = "text-slate-600",
  delay = 0,
  duration = 2500
}) => {
  const [count, setCount] = useState(0);
  const ref = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let start = 0;
    const animDuration = duration;
    const startTime = performance.now() + delay * 1000;
    function animate(now: number) {
      if (now < startTime) {
        requestAnimationFrame(animate);
        return;
      }
      const elapsed = Math.min(now - startTime, animDuration);
      const progress = Math.min(elapsed / animDuration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        ref.current = setTimeout(() => requestAnimationFrame(animate), 16);
      } else {
        setCount(value);
      }
    }
    requestAnimationFrame(animate);
    return () => {
      if (ref.current) clearTimeout(ref.current);
    };
  }, [value, delay, duration]);

  return (
    <div
      className={
        `relative flex flex-col items-center justify-center p-6 rounded-2xl shadow-md bg-white transition-transform duration-200 hover:scale-105 border border-gray-100 min-h-[170px] group`
      }
      aria-label={label}
    >
      <div className={`w-14 h-14 flex items-center justify-center rounded-full ${iconBg} mb-3 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <span className={`text-4xl font-extrabold font-poppins tracking-tight mb-1 ${numberColor}`}>{count}</span>
      <span className="text-base font-raleway font-medium text-slate-800 text-center mb-1">{label}</span>
      {subtitle && (
        <span className={`text-sm font-inter ${subtitleColor} text-center leading-tight`}>{subtitle}</span>
      )}
      {/* Gradiente de borde sutil */}
      <div className={`absolute inset-0 rounded-2xl pointer-events-none border-2 border-transparent group-hover:border-blue-200`} style={{zIndex:1}} />
    </div>
  );
};

export default KPICard;
