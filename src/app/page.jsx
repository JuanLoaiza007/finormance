"use client";
import { useState } from "react";
import { CalculatorForm } from "@/components/features/calc/CalculatorForm";
import { UI_CONFIG } from "@/lib/ui-config";
import { BlurredBackground } from "@/components/features/common/BlurredBackground";
import { CalculatorProvider, useCalculator } from "@/context/CalculatorContext";
import { FormSkeleton } from "@/components/features/calc/CalculatorSkeletons";
import { ResultsSection } from "@/components/features/calc/ResultsSection";
import { CalculatorHeader } from "@/components/features/calc/CalculatorHeader";

function CalculatorContent() {
  const { loading } = useCalculator();
  const [isFormExpanded, setIsFormExpanded] = useState(true);

  return (
    <main className="flex flex-col w-full h-full md:h-screen md:flex-row bg-background">
      <section
        className={`relative flex flex-col dark:bg-[oklch(0.2_0.1_285)] ${UI_CONFIG.form.container} ${UI_CONFIG.form.shadow}`}
      >
        <BlurredBackground location="form" />

        <CalculatorHeader
          isFormExpanded={isFormExpanded}
          setIsFormExpanded={setIsFormExpanded}
        />

        <div
          className={`relative z-10 w-full flex flex-col overflow-y-auto gap-2 md:gap-4 transition-[max-height,opacity,margin] duration-500 ease-in-out ${isFormExpanded ? "max-h-[2000px] opacity-100 mt-2" : "max-h-0 opacity-0 md:max-h-full md:opacity-100"}`}
        >
          {loading ? (
            <FormSkeleton />
          ) : (
            <CalculatorForm className="pb-3 flex font-bold text-xs gap-1 md:gap-2 text-foreground" />
          )}
        </div>
      </section>

      <ResultsSection />
    </main>
  );
}

export default function InvestmentCalculatorPage() {
  return (
    <CalculatorProvider>
      <CalculatorContent />
    </CalculatorProvider>
  );
}
