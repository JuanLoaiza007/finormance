"use client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { initialCalculatorData } from "@/components/schemas/calculatorForm";

const CalculatorContext = createContext();

export const SCENARIO_COLORS = [
  "oklch(0.6 0.2 290)", // Morado
  "oklch(0.6 0.15 220)", // Azul
  "oklch(0.7 0.15 150)", // Esmeralda
  "oklch(0.8 0.15 80)", // Ámbar
  "oklch(0.6 0.2 20)", // Rojo/Rosa
  "oklch(0.5 0.1 180)", // Teal
  "oklch(0.7 0.2 330)", // Magenta
  "oklch(0.4 0.1 250)", // Indigo
];

export function CalculatorProvider({ children }) {
  const [globalParams, setGlobalParams] = useState({
    initialCapital: initialCalculatorData.initialCapital,
    periods: initialCalculatorData.periods,
    granularity: initialCalculatorData.granularity,
    extraContribution: initialCalculatorData.extraContribution,
    contributionTiming: initialCalculatorData.contributionTiming,
  });

  const [scenarios, setScenarios] = useState([
    {
      id: Math.random().toString(36).substr(2, 9),
      name: "Escenario 1",
      rateValue: initialCalculatorData.rateValue,
      rateType: initialCalculatorData.rateType,
      nominalFreq: initialCalculatorData.nominalFreq,
      payoutFreq: "monthly",
      color: SCENARIO_COLORS[0],
    },
  ]);

  const [comparisonData, setComparisonData] = useState({
    schedules: [],
    summaries: [],
    combinedSchedule: [],
  });

  const [loading, setLoading] = useState(true);

  // Cargar datos guardados
  useEffect(() => {
    const savedGlobal = localStorage.getItem("finormance-global-params");
    const savedScenarios = localStorage.getItem("finormance-scenarios");

    if (savedGlobal) {
      try {
        setGlobalParams(JSON.parse(savedGlobal));
      } catch (e) {}
    }
    if (savedScenarios) {
      try {
        setScenarios(JSON.parse(savedScenarios));
      } catch (e) {}
    }
    setLoading(false);
  }, []);

  const parseNumber = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  const computeEffectiveAnnual = (value, type, freq) => {
    const r = value / 100;
    return type === "EA" ? r : Math.pow(1 + r / freq, freq) - 1;
  };

  const calculateScenario = useCallback((scenario, globals) => {
    const {
      initialCapital,
      extraContribution,
      periods,
      granularity,
      contributionTiming,
    } = globals;
    const { rateValue, rateType, nominalFreq } = scenario;

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
        balance += extra;
        invested += extra;
      }
      interestPeriod = balance * r;
      balance += interestPeriod;
      if (contributionTiming === "end") {
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
  }, []);

  const updateGlobalParam = (field, value) => {
    setGlobalParams((prev) => {
      const newData = { ...prev, [field]: value };
      localStorage.setItem("finormance-global-params", JSON.stringify(newData));
      return newData;
    });
  };

  const updateScenario = (id, field, value) => {
    setScenarios((prev) => {
      const newData = prev.map((s) =>
        s.id === id ? { ...s, [field]: value } : s,
      );
      localStorage.setItem("finormance-scenarios", JSON.stringify(newData));
      return newData;
    });
  };

  const addScenario = () => {
    if (scenarios.length >= 4) return;

    // Encontrar un color que no esté en uso si es posible
    const usedColors = scenarios.map((s) => s.color);
    const availableColor =
      SCENARIO_COLORS.find((c) => !usedColors.includes(c)) ||
      SCENARIO_COLORS[scenarios.length % SCENARIO_COLORS.length];

    const newScenario = {
      id: Math.random().toString(36).substr(2, 9),
      name: "Escenario",
      rateValue: "5",
      rateType: "EA",
      nominalFreq: "12",
      payoutFreq: "monthly",
      color: availableColor,
    };
    setScenarios((prev) => {
      const newData = [...prev, newScenario];
      localStorage.setItem("finormance-scenarios", JSON.stringify(newData));
      return newData;
    });
  };

  const removeScenario = (id) => {
    if (scenarios.length <= 1) return;
    setScenarios((prev) => {
      const newData = prev.filter((s) => s.id !== id);
      localStorage.setItem("finormance-scenarios", JSON.stringify(newData));
      return newData;
    });
  };

  // Recalcular todo cuando cambien los datos
  useEffect(() => {
    if (loading) return;

    const results = scenarios.map((s, index) => ({
      id: s.id,
      name: s.name || "Escenario",
      color: s.color,
      configLabel: `${s.rateValue}% ${s.rateType} | ${s.payoutFreq === "daily" ? "D" : "M"}`,
      schedule: calculateScenario(s, globalParams),
    }));

    const summaries = results.map((r) => {
      const lastEntry = r.schedule[r.schedule.length - 1] || {
        Balance: 0,
        Invested: 0,
      };
      return {
        id: r.id,
        name: r.name,
        color: r.color,
        configLabel: r.configLabel,
        finalBalance: lastEntry.Balance,
        totalInvested: lastEntry.Invested,
        totalGain: lastEntry.Balance - lastEntry.Invested,
      };
    });

    const maxPeriods = parseInt(globalParams.periods) || 0;
    const combined = [];
    for (let i = 1; i <= maxPeriods; i++) {
      const entry = { Period: i };
      results.forEach((r) => {
        entry[`balance_${r.id}`] = r.schedule[i - 1]?.Balance || 0;
      });
      combined.push(entry);
    }

    setComparisonData({
      schedules: results,
      summaries,
      combinedSchedule: combined,
    });
  }, [globalParams, scenarios, loading, calculateScenario]);

  return (
    <CalculatorContext.Provider
      value={{
        globalParams,
        scenarios,
        comparisonData,
        loading,
        updateGlobalParam,
        updateScenario,
        addScenario,
        removeScenario,
      }}
    >
      {children}
    </CalculatorContext.Provider>
  );
}

export function useCalculator() {
  const context = useContext(CalculatorContext);
  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider");
  }
  return context;
}
