"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { CalculatorForm } from "@/components/features/calc/CalculatorForm";
import { BalanceChart } from "@/components/features/calc/BalanceChart";
import { ScheduleTable } from "@/components/features/calc/ScheduleTable";
import { initialCalculatorData } from "@/components/schemas/calculatorForm";
import { formatterToCOP } from "@/util/number";

export default function InvestmentCalculatorPage() {
  const [formData, setFormData] = useState(initialCalculatorData);
  const [schedule, setSchedule] = useState([]);

  const onChangeField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const parseNumber = (value) => {
    const n = parseFloat(value);
    return isNaN(n) ? 0 : n;
  };

  const computeEffectiveAnnual = (value, type, freq) => {
    const r = value / 100;
    return type === "EA" ? r : Math.pow(1 + r / freq, freq) - 1;
  };

  const generateSchedule = () => {
    const {
      initialCapital,
      rateValue,
      nominalFreq,
      extraContribution,
      periods,
      rateType,
      baseAnnual,
      granulari,
    } = formData;
    const cap = parseNumber(initialCapital);
    const rate = parseNumber(rateValue);
    const extra = parseNumber(extraContribution);
    const per = parseInt(periods) || 0;
    const freq = parseInt(nominalFreq) || 1;
    const base = parseInt(baseAnnual) || 360;
    const tea = computeEffectiveAnnual(rate, rateType, freq);
    const dailyRate = Math.pow(1 + tea, 1 / base) - 1;
    const monthlyRate = Math.pow(1 + tea, 1 / 12) - 1;
    let balance = cap;
    let invested = cap;
    const entries = [];
    for (let i = 1; i <= per; i++) {
      const r = formData.granularity === "daily" ? dailyRate : monthlyRate;
      balance *= 1 + r;
      if (formData.contributionTiming === "start") {
        balance += extra;
        invested += extra;
      }
      if (formData.contributionTiming === "end") {
        invested += extra;
        balance += extra;
      }
      entries.push({
        Period: i,
        Balance: balance,
        Invested: invested,
        Interest: balance - invested,
      });
    }
    return entries;
  };

  const handleCalculate = () => setSchedule(generateSchedule());
  const handleExport = () => {
    const ws = XLSX.utils.json_to_sheet(schedule);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Schedule");
    XLSX.writeFile(wb, "investment_schedule.xlsx");
  };

  const summary = schedule.length ? schedule[schedule.length - 1] : {};

  return (
    <main className="flex flex-col w-full h-screen md:flex-row gap-4">
      <section className="flex flex-col w-full md:max-w-1/3 pt-4 pb-8 rounded-bl-4xl rounded-br-4xl md:rounded-bl-none md:rounded-br-none px-8 md:p-8 gap-8 bg-purple-200">
        <h2 className="text-2xl font-bold text-center text-purple-700 md:pt-10">
          Calculadora de Rendimientos
        </h2>
        <CalculatorForm
          className="flex font-bold text-sm gap-2"
          formData={formData}
          onChangeField={onChangeField}
          onSubmit={handleCalculate}
          onExport={handleExport}
          hasSchedule={schedule.length > 0}
        />
      </section>
      <section className="w-full flex flex-col md:max-h-screen md:overflow-y-auto gap-4 px-4 md:p-8">
        {schedule.length > 0 && (
          <>
            <div className="flex flex-row flex-wrap gap-4 text-xs md:text-sm">
              <div className="p-4 bg-white rounded shadow">
                {"Total invertido: $ "}
                {formatterToCOP.format(summary.Invested.toFixed(2))}
              </div>
              <div className="p-4 bg-white rounded shadow">
                {"Saldo final: $ "}
                {formatterToCOP.format(summary.Balance.toFixed(2))}
              </div>
              <div className="p-4 bg-white rounded shadow">
                {"Intereses: $ "}
                {formatterToCOP.format(summary.Interest.toFixed(2))}
              </div>
              <div className="p-4 bg-white rounded shadow">
                Tasa: {formData.rateValue}% {formData.rateType}
              </div>
            </div>
            <BalanceChart data={schedule} />
            <ScheduleTable
              data={schedule}
              className="flex text-xs md:text-sm"
            />
          </>
        )}
      </section>
    </main>
  );
}
