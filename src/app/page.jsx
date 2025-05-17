"use client";
import { useState } from "react";
import * as XLSX from "xlsx";
import { CalculatorForm } from "@/components/features/calc/CalculatorForm";
import { BalanceChart } from "@/components/features/calc/BalanceChart";
import { ScheduleTable } from "@/components/features/calc/ScheduleTable";
import { initialCalculatorData } from "@/components/schemas/calculatorForm";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatterToCOP } from "@/util/number";
import { APP_NAME } from "@/constants/appConstants";

export default function InvestmentCalculatorPage() {
  const [formData, setFormData] = useState(initialCalculatorData);
  const [schedule, setSchedule] = useState([]);

  const onChangeField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

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
      baseAnnual,
      granulari,
      granularity,
      contributionTiming,
    } = parsed;

    const cap = parseNumber(initialCapital);
    const rate = parseNumber(rateValue);
    const extra = parseNumber(extraContribution);
    const per = parseInt(periods) || 0;
    const freq = parseInt(nominalFreq) || 1;
    const base = parseInt(baseAnnual) || 360;

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
    <main className="flex flex-col w-full h-full lg:h-screen md:flex-row gap-4">
      <section className="flex flex-col w-full md:max-w-1/3 pt-4 pb-8 rounded-bl-4xl rounded-br-4xl md:rounded-bl-none md:rounded-br-none px-8 md:p-8 gap-1 bg-purple-200">
        <h2 className="text-xl font-bold text-center text-purple-700 md:pt-10">
          {APP_NAME}
        </h2>
        <CalculatorForm
          className="flex font-bold text-xs gap-2 py-0 my-0"
          formData={formData}
          onChangeField={onChangeField}
          onSubmit={handleCalculate}
          onExport={handleExport}
          hasSchedule={schedule.length > 0}
        />
      </section>

      <section className="w-full flex flex-col md:overflow-y-auto gap-4 px-4 pt-2 pb-4 md:p-8">
        {schedule.length > 0 && (
          <>
            {/* Resumen */}
            <Table className="w-full">
              <TableHeader className="bg-purple-200">
                <TableRow className="text-xs">
                  <TableHead>Saldo Final</TableHead>
                  <TableHead>Total invertido</TableHead>
                  <TableHead>Ganancia</TableHead>
                  <TableHead>Tasa</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow className="bg-purple-10 text-xs">
                  <TableCell>
                    {"$"}
                    {formatterToCOP.format(summary.Balance.toFixed(2))}
                  </TableCell>
                  <TableCell>
                    {"$"}
                    {formatterToCOP.format(summary.Invested.toFixed(2))}
                  </TableCell>
                  <TableCell>
                    {"$"}
                    {formatterToCOP.format(
                      summary.Balance.toFixed(2) - summary.Invested.toFixed(2)
                    )}
                  </TableCell>
                  <TableCell>
                    {formData.rateValue}% {formData.rateType}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>

            {/* Gráfico */}
            <BalanceChart data={schedule} />

            {/* Tabla detalle */}
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
