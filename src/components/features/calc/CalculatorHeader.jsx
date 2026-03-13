"use client";
import { APP_NAME } from "@/constants/appConstants";
import { ChartNoAxesColumn, ChevronDown, ChevronUp } from "lucide-react";
import { ModeToggle } from "@/components/features/common/ModeToggle";

export function CalculatorHeader({ isFormExpanded, setIsFormExpanded }) {
  return (
    <div
      className="relative z-10 w-full pt-6 pb-2 md:pt-4 flex flex-row gap-4 select-none text-foreground dark:text-white items-start group"
      data-form-field="true"
    >
      <div className="flex flex-col flex-1">
        <div className="flex items-center gap-2">
          <ChartNoAxesColumn className="[&_svg]:size-1 size-8 text-primary dark:text-white shrink-0" />
          <h1 className="text-2xl uppercase font-bold leading-none">
            {APP_NAME}
          </h1>
        </div>
        <p className="text-[10px] uppercase tracking-widest font-bold text-foreground/70 dark:text-white/70 mt-1">
          Simulador de rendimientos
        </p>
      </div>
      <div className="flex items-center gap-2 shrink-0">
        <button
          onClick={() => setIsFormExpanded(!isFormExpanded)}
          className="md:hidden p-2 rounded-full hover:bg-primary/10 dark:hover:bg-white/10 transition-colors text-primary dark:text-white"
          aria-label={
            isFormExpanded ? "Contraer formulario" : "Expandir formulario"
          }
        >
          {isFormExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
        </button>
        <ModeToggle />
      </div>
    </div>
  );
}
