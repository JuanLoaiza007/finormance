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
import { FormField } from "./FormField";

export function CalculatorForm({ className }) {
  const { formData, updateField } = useCalculator();
  const [errors, setErrors] = useState({});

  const inputClass =
    "text-foreground bg-background/60 backdrop-blur-sm border-border/50 rounded-[var(--radius)] shadow-sm font-medium text-sm py-2 h-10 transition-all focus:bg-background focus:ring-0 w-full flex items-center";

  useEffect(() => {
    const result = calculatorSchema.safeParse(formData);
    setErrors(result.success ? {} : result.error.flatten().fieldErrors);
  }, [formData]);

  const renderInput = (
    name,
    label,
    type = "number",
    placeholder = "",
    className = "",
  ) => (
    <FormField label={label} error={errors[name]?.[0]} className={className}>
      <Input
        type={type}
        className={inputClass}
        placeholder={placeholder}
        value={formData[name]}
        onChange={(e) => updateField(name, e.target.value)}
        onWheel={(event) => event.currentTarget.blur()}
      />
    </FormField>
  );

  const renderSelect = (name, label, options, className = "") => (
    <FormField label={label} error={errors[name]?.[0]} className={className}>
      <Select
        onValueChange={(val) => updateField(name, val)}
        defaultValue={formData[name]}
      >
        <SelectTrigger className={inputClass}>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </FormField>
  );

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="grid grid-cols-2 gap-3">
          {renderInput(
            "initialCapital",
            "Capital inicial",
            "number",
            "",
            "col-span-2",
          )}

          {renderInput("rateValue", "Tasa")}
          {renderSelect("rateType", "Tipo de tasa", [
            { value: "EA", label: "Efectivo Anual" },
            { value: "NA", label: "Nominal Anual" },
          ])}

          {formData.rateType === "NA" &&
            renderSelect(
              "nominalFreq",
              "Frecuencia nominal",
              [
                { value: "12", label: "Mensual" },
                { value: "360", label: "Diaria" },
              ],
              "col-span-2",
            )}

          {renderInput(
            "extraContribution",
            "Recargo extra",
            "number",
            "0",
            "col-span-2",
          )}

          {formData.extraContribution &&
            formData.extraContribution !== "0" &&
            renderSelect(
              "contributionTiming",
              "Momento de recargo",
              [
                { value: "start", label: "Inicio" },
                { value: "end", label: "Fin" },
              ],
              "col-span-2",
            )}

          {renderInput("periods", "Períodos")}
          {renderSelect("granularity", "Granularidad", [
            { value: "daily", label: "Diaria" },
            { value: "monthly", label: "Mensual" },
          ])}
        </div>
      </form>
    </section>
  );
}
