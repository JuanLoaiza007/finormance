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
import { Card, CardContent } from "@/components/ui/card";
import { ChartNoAxesColumn } from "lucide-react";
import { ModeToggle } from "@/components/features/ModeToggle";

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
    <main className="flex flex-col w-full h-full lg:h-screen md:flex-row bg-white">
      <section className="flex flex-col w-full md:max-w-1/3 lg:max-w-3/12 pb-8 rounded-bl-4xl rounded-br-4xl md:rounded-bl-none md:rounded-br-none px-8 gap-1 bg-primary">
        <div className="w-full py-6 flex flex-row gap-2 select-none justify-center md:justify-start text-white">
          <ChartNoAxesColumn className="[&_svg]:size-1 size-8"></ChartNoAxesColumn>
          <h1 className="text-2xl font-bold ">{APP_NAME}</h1>
        </div>
        <CalculatorForm
          className="md:pt-4 flex font-bold text-xs gap-2 md:gap-4 text-white"
          formData={formData}
          onChangeField={onChangeField}
          onSubmit={handleCalculate}
          onExport={handleExport}
          hasSchedule={schedule.length > 0}
        />
      </section>

      <section className="w-full flex flex-col bg-accent">
        {schedule.length > 0 && (
          <>
            <div className="w-full flex  flex-row bg-white p-6 justify-between">
              <h2 className="text-lg font-bold">Resumen</h2>
              {/* <ModeToggle /> */}
            </div>
            <div className="w-full flex flex-col md:overflow-y-auto gap-2 md:gap-4 pt-2 pb-4 p-2 md:p-4">
              {/* Resumen */}
              <Card className="w-full">
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Saldo Final</TableHead>
                        <TableHead>Total invertido</TableHead>
                        <TableHead>Ganancia</TableHead>
                        <TableHead>Tasa</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
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
                            summary.Balance.toFixed(2) -
                              summary.Invested.toFixed(2)
                          )}
                        </TableCell>
                        <TableCell>
                          {formData.rateValue}% {formData.rateType}
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <div className="w-full flex flex-col lg:flex-row gap-2 md:gap-4 max-h-[80%] overflow-hidden">
                {/* Gráfico */}
                <BalanceChart className="w-full" height={300} data={schedule} />

                {/* Tabla detalle */}
                <ScheduleTable
                  data={schedule}
                  className="w-full flex text-xs md:text-sm"
                />
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  );
}
