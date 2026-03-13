// src/components/features/calc/ScheduleTable.jsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatterToCOP } from "@/util/number";
import { useCalculator } from "@/context/CalculatorContext";

export function ScheduleTable({ data, scenarios, className }) {
  const { globalParams } = useCalculator();
  const isSingleScenario = scenarios.length === 1;
  const initialCapital = parseFloat(globalParams.initialCapital) || 0;

  return (
    <Card
      className={
        "max-h-[450px] overflow-hidden flex flex-col " + (className || "")
      }
    >
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground">
          Balances por Período
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 overflow-auto flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <TableRow className="hover:bg-transparent border-b border-border/50">
              <TableHead className="w-12 text-center text-[11px] uppercase font-bold tracking-tighter">
                #
              </TableHead>
              {isSingleScenario ? (
                <>
                  <TableHead className="text-[11px] uppercase font-bold tracking-tighter text-right pr-4">
                    Monto
                  </TableHead>
                  <TableHead className="text-[11px] uppercase font-bold tracking-tighter text-right pr-4">
                    Ganancia
                  </TableHead>
                </>
              ) : (
                scenarios.map((s) => (
                  <TableHead
                    key={s.id}
                    className="text-[11px] uppercase font-bold tracking-tighter text-right pr-4"
                  >
                    <div className="flex items-center justify-end gap-1.5">
                      <div
                        className="size-1.5 rounded-full"
                        style={{ backgroundColor: s.color }}
                      />
                      {s.name}
                    </div>
                  </TableHead>
                ))
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {/* Período 0: Monto Inicial */}
            <TableRow className="border-b border-border/20 bg-muted/5">
              <TableCell className="text-center font-medium text-xs uppercase">
                0
              </TableCell>
              {isSingleScenario ? (
                <>
                  <TableCell className="text-xs uppercase text-right pr-4 font-bold">
                    ${formatterToCOP.format(initialCapital.toFixed(2))}
                  </TableCell>
                  <TableCell className="text-xs uppercase text-right pr-4 font-medium text-muted-foreground">
                    -
                  </TableCell>
                </>
              ) : (
                scenarios.map((s) => (
                  <TableCell
                    key={s.id}
                    className="text-xs uppercase text-right pr-4 font-bold"
                  >
                    ${formatterToCOP.format(initialCapital.toFixed(2))}
                  </TableCell>
                ))
              )}
            </TableRow>

            {data.map((row, index) => {
              const currentBalance = isSingleScenario
                ? row[`balance_${scenarios[0].id}`]
                : 0;

              const prevBalance =
                index === 0
                  ? initialCapital
                  : data[index - 1][`balance_${scenarios[0].id}`];

              const diff = currentBalance - prevBalance;

              return (
                <TableRow
                  key={row.Period}
                  className="border-b border-border/20 last:border-0"
                >
                  <TableCell className="text-center font-medium text-xs uppercase">
                    {row.Period}
                  </TableCell>
                  {isSingleScenario ? (
                    <>
                      <TableCell className="text-xs uppercase text-right pr-4 font-bold">
                        $
                        {formatterToCOP.format(
                          (currentBalance || 0).toFixed(2),
                        )}
                      </TableCell>
                      <TableCell className="text-xs uppercase text-right pr-4 font-medium text-primary">
                        +${formatterToCOP.format((diff || 0).toFixed(2))}
                      </TableCell>
                    </>
                  ) : (
                    scenarios.map((s) => (
                      <TableCell
                        key={s.id}
                        className="text-xs uppercase text-right pr-4 font-bold"
                      >
                        $
                        {formatterToCOP.format(
                          (row[`balance_${s.id}`] || 0).toFixed(2),
                        )}
                      </TableCell>
                    ))
                  )}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
