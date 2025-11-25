"use client";
import { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { CalculatorForm } from "@/components/features/calc/CalculatorForm";
import { BalanceChart } from "@/components/features/calc/BalanceChart";
import { ScheduleTable } from "@/components/features/calc/ScheduleTable";
import { initialCalculatorData } from "@/components/schemas/calculatorForm";
import { APP_NAME } from "@/constants/appConstants";
import { ChartNoAxesColumn } from "lucide-react";
import SummarySection from "@/components/features/calc/SummarySection";
import { Skeleton } from "@/components/ui/skeleton";
import { ModeToggle } from "@/components/features/common/ModeToggle";

export default function InvestmentCalculatorPage() {
  const [formData, setFormData] = useState(initialCalculatorData);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("finormance-form-data");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setFormData(parsed);
      } catch (e) {
        console.error("Error parsing saved form data", e);
      }
    }
    setLoading(false);
  }, []);

  const onChangeField = (field, value) =>
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      localStorage.setItem("finormance-form-data", JSON.stringify(newData));
      return newData;
    });

  const parseNumber = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  const computeEffectiveAnnual = (value, type, freq) => {
    const r = value / 100;
    return type === "EA" ? r : Math.pow(1 + r / freq, freq) - 1;
  };

  const generateSchedule = (parsed) => {
    const {
      initialCapital,
      rateValue,
      nominalFreq,
      extraContribution,
      periods,
      rateType,
      granularity,
      contributionTiming,
    } = parsed;

    const cap = parseNumber(initialCapital);
    const rate = parseNumber(rateValue);
    const extra = parseNumber(extraContribution);
    const per = parseInt(periods) || 0;
    const freq = parseInt(nominalFreq) || 1;
    const base = 365;

    const tea = computeEffectiveAnnual(rate, rateType, freq);
    const dailyRate = Math.pow(1 + tea, 1 / base) - 1;
    const monthlyRate = Math.pow(1 + tea, 1 / 12) - 1;
    const r = granularity === "daily" ? dailyRate : monthlyRate;

    let balance = cap;
    let invested = cap;
    const entries = [];

    for (let i = 1; i <= per; i++) {
      let interestPeriod = 0;

      if (contributionTiming === "start") {
        // aporte al inicio
        balance += extra;
        invested += extra;
        // interés sobre el nuevo principal
        interestPeriod = balance * r;
        balance += interestPeriod;
      } else {
        // interés sobre el saldo actual
        interestPeriod = balance * r;
        balance += interestPeriod;
        // aporte al final
        balance += extra;
        invested += extra;
      }

      entries.push({
        Period: i,
        Balance: balance,
        Invested: invested,
        InterestPeriod: interestPeriod,
      });
    }

    return entries;
  };

  const handleCalculate = () => setSchedule(generateSchedule(formData));

  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(schedule);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");
    XLSX.writeFile(wb, "investment_schedule.xlsx");
  };

  const summary = schedule.length ? schedule[schedule.length - 1] : {};

  return (
    <main className="flex flex-col w-full h-full md:h-screen md:flex-row bg-background">
      <section className="flex flex-col w-full md:max-w-1/3 lg:max-w-3/12 pb-8 rounded-bl-4xl rounded-br-4xl md:rounded-bl-none md:rounded-br-none px-10 md:px-6 gap-1 bg-primary h-full">
        <div className="w-full pt-6 pb-2 md:pt-4 flex flex-row gap-2 select-none justify-between text-white">
          <div></div>
          <div className="flex items-center gap-2">
            <ChartNoAxesColumn className="[&_svg]:size-1 size-8"></ChartNoAxesColumn>
            <h1 className="text-2xl font-bold">{APP_NAME}</h1>
          </div>
          <ModeToggle />
        </div>
        <div className="w-full h-full flex flex-col overflow-y-auto gap-2 md:gap-4">
          {loading ? (
            <div className="md:pt-4 flex flex-col font-bold text-xs gap-2 md:gap-4 text-white">
              <article className="flex flex-col">
                <Skeleton className="h-10 w-full" />
              </article>
              <article className="flex flex-wrap gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </article>
              <article className="flex flex-col">
                <Skeleton className="h-10 w-full" />
              </article>
              <article className="flex flex-col">
                <Skeleton className="h-10 w-full" />
              </article>
              <article className="flex flex-col">
                <Skeleton className="h-10 w-full" />
              </article>
              <article className="flex flex-wrap gap-2">
                <Skeleton className="h-10 flex-1" />
                <Skeleton className="h-10 flex-1" />
              </article>
            </div>
          ) : (
            <CalculatorForm
              className="md:pt-4 flex font-bold text-xs gap-1 md:gap-2 text-white"
              formData={formData}
              onChangeField={onChangeField}
              onSubmit={handleCalculate}
              onExport={handleExport}
              hasSchedule={schedule.length > 0}
            />
          )}
        </div>
      </section>

      <section className="w-full flex flex-col bg-muted overflow-hidden">
        {loading ? (
          <div className="w-full h-full overflow-y-auto">
            <div className="w-full flex flex-col overflow-y-auto gap-2 md:gap-4 pt-2 pb-4 p-2 md:p-4">
              {/* Skeleton for Summary */}
              <div className="w-full">
                <Skeleton className="h-8 w-32 mb-4" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                  <Skeleton className="h-16 w-full" />
                </div>
              </div>

              <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4 max-h-[80%] overflow-hidden">
                {/* Skeleton for Chart */}
                <Skeleton className="w-full h-64" />

                {/* Skeleton for Table */}
                <Skeleton className="w-full h-64" />
              </div>
            </div>
          </div>
        ) : (
          schedule.length > 0 && (
            <>
              <div className="w-full flex  flex-row bg-background p-4 justify-between">
                <h2 className="text-lg font-bold">Resumen</h2>
                {/* <ModeToggle /> */}
              </div>
              <div className="w-full h-full overflow-y-auto">
                <div className="w-full flex flex-col overflow-y-auto gap-2 md:gap-4 pt-2 pb-4 p-2 md:p-4 justify-center items-center">
                  {/* Resumen */}
                  <SummarySection summary={summary} formData={formData} />

                  <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4 max-h-[80%] overflow-hidden">
                    {/* Gráfico */}
                    <BalanceChart
                      className="w-full"
                      height={300}
                      data={schedule}
                    />

                    {/* Tabla detalle */}
                    <ScheduleTable
                      data={schedule}
                      className="w-full flex text-xs md:text-sm"
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center max-w-xl">
                    Esta aplicación es un simulador. Los resultados no
                    representan garantías de rendimiento real y no deben
                    considerarse asesoría financiera. Úsala como una herramienta
                    de apoyo para tomar decisiones informadas.
                  </p>
                </div>
              </div>
            </>
          )
        )}
      </section>
    </main>
  );
}
