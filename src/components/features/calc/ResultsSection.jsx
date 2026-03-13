"use client";
import { useCalculator } from "@/context/CalculatorContext";
import { UI_CONFIG } from "@/lib/ui-config";
import { BlurredBackground } from "@/components/features/common/BlurredBackground";
import { ResultsSkeleton } from "./CalculatorSkeletons";
import SummarySection from "./SummarySection";
import { BalanceChart } from "./BalanceChart";
import { ScheduleTable } from "./ScheduleTable";

export function ResultsSection() {
  const { comparisonData, scenarios, loading } = useCalculator();

  return (
    <section className={`${UI_CONFIG.results.container}`}>
      <BlurredBackground location="results" />
      {loading ? (
        <ResultsSkeleton />
      ) : (
        comparisonData.summaries.length > 0 && (
          <>
            <div
              className={`w-full flex flex-row p-4 md:p-6 justify-between border-b border-border/50 relative z-10 ${UI_CONFIG.blur.summaryBar}`}
            >
              <h2 className="text-lg font-bold text-foreground uppercase tracking-tight">
                Resumen Comparativo
              </h2>
            </div>
            <div className="w-full h-full overflow-y-auto relative z-10">
              <div className="w-full flex flex-col gap-4 md:gap-6 p-4 pb-16 md:pb-6 md:p-6">
                {/* Tabla de Resumen Comparativo */}
                <SummarySection comparisonData={comparisonData} />

                <div className="w-full flex flex-col lg:grid lg:grid-cols-2 gap-4 md:gap-6">
                  {/* Gráfico Multi-Línea */}
                  <BalanceChart
                    className="w-full flex flex-col"
                    data={comparisonData.combinedSchedule}
                    scenarios={scenarios}
                  />

                  {/* Tabla de Balances Comparativos */}
                  <ScheduleTable
                    data={comparisonData.combinedSchedule}
                    scenarios={scenarios}
                    className="w-full"
                  />
                </div>
              </div>
            </div>
          </>
        )
      )}
    </section>
  );
}
