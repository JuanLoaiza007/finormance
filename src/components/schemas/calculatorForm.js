import { z } from "zod";

export const calculatorSchema = z.object({
  initialCapital: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ invalid_type_error: "Capital inicial debe ser numérico" })
      .positive("Capital inicial debe ser mayor a 0")
  ),
  rateValue: z.preprocess(
    (val) => (typeof val === "string" ? parseFloat(val) : val),
    z
      .number({ invalid_type_error: "Tasa debe ser numérica" })
      .positive("Tasa debe ser mayor a 0")
  ),
  rateType: z.enum(["EA", "NA"], {
    errorMap: () => ({ message: "Tipo de tasa inválido" }),
  }),
  nominalFreq: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z.number().int().positive().optional()
  ),
  extraContribution: z.preprocess((val) => {
    if (val === "" || val === undefined) return 0;
    return typeof val === "string" ? parseFloat(val) : val;
  }, z.number().nonnegative()),
  contributionTiming: z.enum(["start", "end"], {
    errorMap: () => ({ message: "Momento inválido" }),
  }),
  periods: z.preprocess(
    (val) => (typeof val === "string" ? parseInt(val) : val),
    z
      .number()
      .int()
      .nonnegative({ message: "Períodos debe ser entero no negativo" })
  ),
  granularity: z.enum(["daily", "monthly"], {
    errorMap: () => ({ message: "Granularidad inválida" }),
  }),
});

export const initialCalculatorData = {
  initialCapital: "2000000",
  rateValue: "8.25",
  rateType: "EA",
  nominalFreq: "12",
  extraContribution: "0",
  contributionTiming: "end",
  periods: "30",
  granularity: "daily",
};
