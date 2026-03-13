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

export function CalculatorForm({
  formData,
  onChangeField,
  onSubmit,
  className,
}) {
  const inputClass =
    "text-foreground bg-background/50 dark:bg-background/20 backdrop-blur-sm border-border/50 rounded-[var(--radius)] shadow-sm font-medium text-sm py-2 h-10 transition-all focus:bg-background focus:ring-0 w-full flex items-center";
  const [errors, setErrors] = useState({});

  useEffect(() => {
    handleCalculate();
    setErrors({});
  }, [formData]);

  const handleCalculate = () => {
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
      onSubmit(result.data);
    }
  };

  const FormField = ({ label, error, children, className }) => (
    <article className={cn("flex flex-col gap-1.5 min-w-0", className)}>
      <div className="text-foreground/80 dark:text-muted-foreground font-semibold ml-1 truncate h-5 flex items-center">
        {label}
      </div>
      <div className="h-10 flex items-center">{children}</div>
      {error && (
        <p className="text-[10px] font-medium text-destructive ml-1 leading-tight truncate h-4">
          {error}
        </p>
      )}
    </article>
  );

  return (
    <section className={cn("flex flex-col gap-4", className)}>
      <FormField label="Capital inicial" error={errors.initialCapital}>
        <Input
          type="number"
          className={inputClass}
          value={formData.initialCapital}
          onChange={(e) => onChangeField("initialCapital", e.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
        />
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Tasa" error={errors.rateValue}>
          <Input
            type="number"
            className={inputClass}
            value={formData.rateValue}
            onChange={(e) => onChangeField("rateValue", e.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
          />
        </FormField>

        <FormField label="Tipo de tasa" error={errors.rateType}>
          <Select
            onValueChange={(val) => onChangeField("rateType", val)}
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
        </FormField>
      </div>

      {formData.rateType === "NA" && (
        <FormField label="Frecuencia nominal" error={errors.nominalFreq}>
          <Select
            onValueChange={(val) => onChangeField("nominalFreq", val)}
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
        </FormField>
      )}

      <FormField label="Recargo extra" error={errors.extraContribution}>
        <Input
          type="number"
          className={inputClass}
          value={formData.extraContribution}
          onChange={(e) => onChangeField("extraContribution", e.target.value)}
          onWheel={(event) => event.currentTarget.blur()}
        />
      </FormField>

      <FormField label="Momento de recargo" error={errors.contributionTiming}>
        <Select
          onValueChange={(val) => onChangeField("contributionTiming", val)}
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
      </FormField>

      <div className="grid grid-cols-2 gap-3">
        <FormField label="Períodos" error={errors.periods}>
          <Input
            type="number"
            className={inputClass}
            value={formData.periods}
            onChange={(e) => onChangeField("periods", e.target.value)}
            onWheel={(event) => event.currentTarget.blur()}
          />
        </FormField>

        <FormField label="Granularidad" error={errors.granularity}>
          <Select
            onValueChange={(val) => onChangeField("granularity", val)}
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
        </FormField>
      </div>
    </section>
  );
}
