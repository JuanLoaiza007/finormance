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
import { cn } from "@/lib/utils";
import { useCalculator, SCENARIO_COLORS } from "@/context/CalculatorContext";
import { FormField } from "./FormField";
import { Plus, Trash2, Palette } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export function CalculatorForm({ className }) {
  const {
    globalParams,
    scenarios,
    updateGlobalParam,
    updateScenario,
    addScenario,
    removeScenario,
  } = useCalculator();

  const inputClass =
    "text-foreground bg-background/60 backdrop-blur-sm border-border/50 rounded-[var(--radius)] shadow-sm font-medium text-sm py-2 h-10 transition-all focus:bg-background focus:ring-0 w-full flex items-center dark:text-white dark:bg-white/10 dark:border-white/20 dark:focus:bg-white/20";

  return (
    <section className={cn("flex flex-col gap-6", className)}>
      <div className="space-y-4">
        <h3 className="text-[10px] uppercase font-bold tracking-widest text-foreground/50 dark:text-white/50 ml-1">
          Parámetros Globales
        </h3>
        <div className="grid grid-cols-2 gap-3">
          <FormField label="Capital inicial" className="col-span-2">
            <Input
              type="number"
              className={inputClass}
              value={globalParams.initialCapital}
              onChange={(e) =>
                updateGlobalParam("initialCapital", e.target.value)
              }
              onWheel={(event) => event.currentTarget.blur()}
            />
          </FormField>

          <FormField label="Períodos">
            <Input
              type="number"
              className={inputClass}
              value={globalParams.periods}
              onChange={(e) => updateGlobalParam("periods", e.target.value)}
              onWheel={(event) => event.currentTarget.blur()}
            />
          </FormField>

          <FormField label="Granularidad">
            <Select
              onValueChange={(val) => updateGlobalParam("granularity", val)}
              defaultValue={globalParams.granularity}
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

          {scenarios.length === 1 && (
            <>
              <FormField label="Recargo extra" className="col-span-2">
                <Input
                  type="number"
                  className={inputClass}
                  placeholder="0"
                  value={globalParams.extraContribution}
                  onChange={(e) =>
                    updateGlobalParam("extraContribution", e.target.value)
                  }
                  onWheel={(event) => event.currentTarget.blur()}
                />
              </FormField>

              {globalParams.extraContribution &&
                globalParams.extraContribution !== "0" && (
                  <FormField label="Momento de recargo" className="col-span-2">
                    <Select
                      onValueChange={(val) =>
                        updateGlobalParam("contributionTiming", val)
                      }
                      defaultValue={globalParams.contributionTiming}
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
                )}
            </>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between ml-1">
          <h3 className="text-[10px] uppercase font-bold tracking-widest text-foreground/50 dark:text-white/50">
            Escenarios de Tasa
          </h3>
          {scenarios.length < 4 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={addScenario}
              className="h-6 px-2 text-[10px] uppercase font-bold dark:text-white/70 hover:dark:bg-white/10"
            >
              <Plus className="size-3 mr-1" /> Añadir
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {scenarios.map((s, index) => (
            <div
              key={s.id}
              className="relative p-4 rounded-xl border border-border/50 dark:border-white/10 bg-background/40 dark:bg-white/5 backdrop-blur-sm space-y-3 group/scenario"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <Dialog>
                    <DialogTrigger asChild>
                      <button
                        className="size-4 rounded-full shrink-0 transition-transform hover:scale-110 shadow-sm border border-white/20"
                        style={{ backgroundColor: s.color }}
                        title="Cambiar color"
                      />
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[300px]">
                      <DialogHeader>
                        <DialogTitle className="text-xs uppercase font-bold tracking-widest">
                          Seleccionar Color
                        </DialogTitle>
                      </DialogHeader>
                      <div className="grid grid-cols-4 gap-3 p-2">
                        {SCENARIO_COLORS.map((color) => (
                          <button
                            key={color}
                            className={cn(
                              "size-10 rounded-full border-2 transition-all hover:scale-110",
                              s.color === color
                                ? "border-primary scale-110 shadow-md"
                                : "border-transparent",
                            )}
                            style={{ backgroundColor: color }}
                            onClick={() => updateScenario(s.id, "color", color)}
                          />
                        ))}
                      </div>
                    </DialogContent>
                  </Dialog>

                  <Input
                    className="h-6 bg-transparent border-none p-0 text-[10px] uppercase font-bold text-foreground/70 dark:text-white/70 focus-visible:ring-0 focus-visible:ring-offset-0"
                    value={s.name}
                    placeholder={`Escenario ${index + 1}`}
                    onChange={(e) =>
                      updateScenario(s.id, "name", e.target.value)
                    }
                  />
                </div>
                {scenarios.length > 1 && (
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => removeScenario(s.id)}
                    className="size-6 text-destructive/50 hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="size-3" />
                  </Button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <FormField label="Tasa">
                  <Input
                    type="number"
                    className={inputClass}
                    value={s.rateValue}
                    onChange={(e) =>
                      updateScenario(s.id, "rateValue", e.target.value)
                    }
                    onWheel={(event) => event.currentTarget.blur()}
                  />
                </FormField>
                <FormField label="Tipo">
                  <Select
                    onValueChange={(val) =>
                      updateScenario(s.id, "rateType", val)
                    }
                    defaultValue={s.rateType}
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EA">E.A.</SelectItem>
                      <SelectItem value="NA">N.A.</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>

                {s.rateType === "NA" && (
                  <FormField label="Frecuencia" className="col-span-2">
                    <Select
                      onValueChange={(val) =>
                        updateScenario(s.id, "nominalFreq", val)
                      }
                      defaultValue={s.nominalFreq}
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

                <FormField label="Pago Interés" className="col-span-2">
                  <Select
                    onValueChange={(val) =>
                      updateScenario(s.id, "payoutFreq", val)
                    }
                    defaultValue={s.payoutFreq}
                  >
                    <SelectTrigger className={inputClass}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Diario</SelectItem>
                      <SelectItem value="monthly">Mensual</SelectItem>
                    </SelectContent>
                  </Select>
                </FormField>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
