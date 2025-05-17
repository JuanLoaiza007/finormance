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
import { Button } from "@/components/ui/button";

export function CalculatorForm({
  formData,
  onChangeField,
  onSubmit,
  onExport,
  hasSchedule,
  className,
}) {
  const inputClass = "bg-white rounded shadow font-light text-xs py-0";
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

  return (
    <section className={"flex flex-col " + (className || "")}>
      <article className="flex flex-col">
        <div>Capital inicial</div>
        <Input
          type="number"
          className={inputClass}
          value={formData.initialCapital}
          onChange={(e) => onChangeField("initialCapital", e.target.value)}
        />
        {errors.initialCapital && (
          <p className="text-xs text-red-600">{errors.initialCapital}</p>
        )}
      </article>

      <article className="flex flex-wrap gap-2">
        <div className="flex-1 flex flex-col">
          <div>Tasa</div>
          <Input
            type="number"
            className={inputClass}
            value={formData.rateValue}
            onChange={(e) => onChangeField("rateValue", e.target.value)}
          />
          {errors.rateValue && (
            <p className="text-xs text-red-600">{errors.rateValue}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div>Tipo de tasa</div>
          <Select
            onValueChange={(val) => onChangeField("rateType", val)}
            defaultValue={formData.rateType}
          >
            <SelectTrigger className={inputClass + " w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EA">Efectivo Anual</SelectItem>
              <SelectItem value="NA">Nominal Anual</SelectItem>
            </SelectContent>
          </Select>
          {errors.rateType && (
            <p className="text-xs text-red-600">{errors.rateType}</p>
          )}
        </div>
      </article>

      {formData.rateType === "NA" && (
        <article className="flex flex-col">
          <div>Frecuencia nominal</div>
          <Select
            onValueChange={(val) => onChangeField("nominalFreq", val)}
            defaultValue={formData.nominalFreq}
          >
            <SelectTrigger className={inputClass + " w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="12">Mensual</SelectItem>
              <SelectItem value="360">Diaria</SelectItem>
            </SelectContent>
          </Select>
          {errors.nominalFreq && (
            <p className="text-xs text-red-600">{errors.nominalFreq}</p>
          )}
        </article>
      )}

      <article className="flex flex-col">
        <div>Recargo extra</div>
        <Input
          type="number"
          className={inputClass}
          value={formData.extraContribution}
          onChange={(e) => onChangeField("extraContribution", e.target.value)}
        />
        {errors.extraContribution && (
          <p className="text-xs text-red-600">{errors.extraContribution}</p>
        )}
      </article>

      <article className="flex flex-col">
        <div>Momento de recargo</div>
        <Select
          onValueChange={(val) => onChangeField("contributionTiming", val)}
          defaultValue={formData.contributionTiming}
        >
          <SelectTrigger className={inputClass + " w-full"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="start">Inicio</SelectItem>
            <SelectItem value="end">Fin</SelectItem>
          </SelectContent>
        </Select>
        {errors.contributionTiming && (
          <p className="text-xs text-red-600">{errors.contributionTiming}</p>
        )}
      </article>

      <article className="flex flex-wrap gap-2">
        <div className="flex-1 flex flex-col">
          <div>Períodos</div>
          <Input
            type="number"
            className={inputClass}
            value={formData.periods}
            onChange={(e) => onChangeField("periods", e.target.value)}
          />
          {errors.periods && (
            <p className="text-xs text-red-600">{errors.periods}</p>
          )}
        </div>

        <div className="flex flex-col">
          <div>Granularidad</div>
          <Select
            onValueChange={(val) => onChangeField("granularity", val)}
            defaultValue={formData.granularity}
          >
            <SelectTrigger className={inputClass + " w-full"}>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Diaria</SelectItem>
              <SelectItem value="monthly">Mensual</SelectItem>
            </SelectContent>
          </Select>
          {errors.granularity && (
            <p className="text-xs text-red-600">{errors.granularity}</p>
          )}
        </div>
      </article>

      <article className="flex flex-col">
        <div>Base anual</div>
        <Select
          onValueChange={(val) => onChangeField("baseAnnual", val)}
          defaultValue={formData.baseAnnual}
        >
          <SelectTrigger className={inputClass + " w-full"}>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="360">360 días</SelectItem>
            <SelectItem value="365">365 días</SelectItem>
          </SelectContent>
        </Select>
        {errors.baseAnnual && (
          <p className="text-xs text-red-600">{errors.baseAnnual}</p>
        )}
      </article>

      <div className="flex justify-center">
        {hasSchedule && <Button onClick={onExport}>Exportar Excel</Button>}
      </div>
    </section>
  );
}
