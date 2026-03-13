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

export function CalculatorProvider({ children }) {
  const [formData, setFormData] = useState(initialCalculatorData);
  const [schedule, setSchedule] = useState([]);
  const [loading, setLoading] = useState(true);

  // Cargar datos guardados
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

  const parseNumber = (v) => {
    const n = parseFloat(v);
    return isNaN(n) ? 0 : n;
  };

  const computeEffectiveAnnual = (value, type, freq) => {
    const r = value / 100;
    return type === "EA" ? r : Math.pow(1 + r / freq, freq) - 1;
  };

  const generateSchedule = useCallback((parsed) => {
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
        balance += extra;
        invested += extra;
        interestPeriod = balance * r;
        balance += interestPeriod;
      } else {
        interestPeriod = balance * r;
        balance += interestPeriod;
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

  const updateField = (field, value) => {
    setFormData((prev) => {
      const newData = { ...prev, [field]: value };
      localStorage.setItem("finormance-form-data", JSON.stringify(newData));
      return newData;
    });
  };

  // Actualizar schedule cuando cambie formData
  useEffect(() => {
    if (!loading) {
      setSchedule(generateSchedule(formData));
    }
  }, [formData, loading, generateSchedule]);

  const summary = schedule.length ? schedule[schedule.length - 1] : {};

  return (
    <CalculatorContext.Provider
      value={{
        formData,
        schedule,
        loading,
        updateField,
        summary,
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
