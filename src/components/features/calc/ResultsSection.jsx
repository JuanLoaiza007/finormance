"use client";
import { useCalculator } from "@/context/CalculatorContext";
import { UI_CONFIG } from "@/lib/ui-config";
import { BlurredBackground } from "@/components/features/common/BlurredBackground";
import { ResultsSkeleton } from "./CalculatorSkeletons";
import SummarySection from "./SummarySection";
import { BalanceChart } from "./BalanceChart";
import { ScheduleTable } from "./ScheduleTable";

export function ResultsSection() {
  const { schedule, loading, summary, formData } = useCalculator();

  return (
    <section className={`${UI_CONFIG.results.container}`}>
      <BlurredBackground location="results" />
      {loading ? (
        <ResultsSkeleton />
      ) : (
        schedule.length > 0 && (
          <>
            <div
              className={`w-full flex flex-row p-4 md:p-6 justify-between border-b border-border/50 relative z-10 ${UI_CONFIG.blur.summaryBar}`}
            >
              <h2 className="text-lg font-bold text-foreground">Resumen</h2>
            </div>
            <div className="w-full h-full overflow-y-auto relative z-10">
              <div className="w-full flex flex-col overflow-y-auto gap-4 md:gap-6 p-4 pb-16 md:pb-6 md:p-6 justify-center items-center">
                <SummarySection summary={summary} formData={formData} />
                <div className="w-full flex flex-col lg:flex-row gap-4 md:gap-6 max-h-[80%] overflow-hidden">
                  <BalanceChart
                    className="w-full"
                    height={300}
                    data={schedule}
                  />
                  <ScheduleTable
                    data={schedule}
                    className="w-full flex text-xs md:text-sm"
                    formData={formData}
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
