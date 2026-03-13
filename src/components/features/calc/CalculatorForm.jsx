"use client";
import { useEffect, useState } from "react";
import { calculatorSchema } from "@/components/schemas/calculatorForm";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useCalculator } from "@/context/CalculatorContext";

export function CalculatorForm({ className }) {
  const { formData, updateField } = useCalculator();

  const inputClass =
    "text-foreground bg-background/60 backdrop-blur-sm border-border/50 rounded-[var(--radius)] shadow-sm font-medium text-sm py-2 h-10 transition-all focus:bg-background focus:ring-0 w-full flex items-center";
  const labelClass =
    "text-foreground/80 dark:text-muted-foreground font-semibold ml-1 truncate h-5 flex items-center";
  const errorClass =
    "text-[10px] font-medium text-destructive ml-1 leading-tight truncate h-4";

  const [errors, setErrors] = useState({});

  useEffect(() => {
    const result = calculatorSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors = {};
      result.error.errors.forEach((err) => {
        const field = err.path[0];
        fieldErrors[field] = err.message;
      });
      setErrors(fieldErrors);
    } else {
      setErrors({});
    }
  }, [formData]);

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        {/* Capital inicial */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className={labelClass}>Capital inicial</label>
          <div className="h-10 flex items-center">
            <Input
              type="number"
              className={inputClass}
              value={formData.initialCapital}
              onChange={(e) => updateField("initialCapital", e.target.value)}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          {errors.initialCapital && (
            <p className={errorClass}>{errors.initialCapital}</p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Tasa */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Tasa</label>
            <div className="h-10 flex items-center">
              <Input
                type="number"
                className={inputClass}
                value={formData.rateValue}
                onChange={(e) => updateField("rateValue", e.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            {errors.rateValue && (
              <p className={errorClass}>{errors.rateValue}</p>
            )}
          </div>

          {/* Tipo de tasa */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Tipo de tasa</label>
            <div className="h-10 flex items-center">
              <Select
                onValueChange={(val) => updateField("rateType", val)}
                defaultValue={formData.rateType}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="EA">Efectivo Anual</SelectItem>
                  <SelectItem value="NA">Nominal Anual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.rateType && <p className={errorClass}>{errors.rateType}</p>}
          </div>
        </div>

        {/* Frecuencia nominal */}
        {formData.rateType === "NA" && (
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Frecuencia nominal</label>
            <div className="h-10 flex items-center">
              <Select
                onValueChange={(val) => updateField("nominalFreq", val)}
                defaultValue={formData.nominalFreq}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="12">Mensual</SelectItem>
                  <SelectItem value="360">Diaria</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.nominalFreq && (
              <p className={errorClass}>{errors.nominalFreq}</p>
            )}
          </div>
        )}

        {/* Recargo extra */}
        <div className="flex flex-col gap-1.5 min-w-0">
          <label className={labelClass}>Recargo extra</label>
          <div className="h-10 flex items-center">
            <Input
              type="number"
              className={inputClass}
              placeholder="0"
              value={formData.extraContribution}
              onChange={(e) => updateField("extraContribution", e.target.value)}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </div>
          {errors.extraContribution && (
            <p className={errorClass}>{errors.extraContribution}</p>
          )}
        </div>

        {/* Momento de recargo */}
        {formData.extraContribution && formData.extraContribution !== "0" && (
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Momento de recargo</label>
            <div className="h-10 flex items-center">
              <Select
                onValueChange={(val) => updateField("contributionTiming", val)}
                defaultValue={formData.contributionTiming}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="start">Inicio</SelectItem>
                  <SelectItem value="end">Fin</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.contributionTiming && (
              <p className={errorClass}>{errors.contributionTiming}</p>
            )}
          </div>
        )}

        <div className="grid grid-cols-2 gap-3">
          {/* Períodos */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Períodos</label>
            <div className="h-10 flex items-center">
              <Input
                type="number"
                className={inputClass}
                value={formData.periods}
                onChange={(e) => updateField("periods", e.target.value)}
                onWheel={(event) => event.currentTarget.blur()}
              />
            </div>
            {errors.periods && <p className={errorClass}>{errors.periods}</p>}
          </div>

          {/* Granularidad */}
          <div className="flex flex-col gap-1.5 min-w-0">
            <label className={labelClass}>Granularidad</label>
            <div className="h-10 flex items-center">
              <Select
                onValueChange={(val) => updateField("granularity", val)}
                defaultValue={formData.granularity}
              >
                <SelectTrigger className={inputClass}>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="daily">Diaria</SelectItem>
                  <SelectItem value="monthly">Mensual</SelectItem>
                </SelectContent>
              </Select>
            </div>
            {errors.granularity && (
              <p className={errorClass}>{errors.granularity}</p>
            )}
          </div>
        </div>
      </form>
    </section>
  );
}
