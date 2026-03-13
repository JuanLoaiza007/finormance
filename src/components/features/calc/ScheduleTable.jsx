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

export function ScheduleTable({ data, className, formData }) {
  const showInvestedColumn =
    formData.extraContribution && formData.extraContribution !== "0";

  return (
    <Card
      className={
        "max-h-[400px] overflow-hidden flex flex-col " + (className || "")
      }
    >
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          Detalle de Períodos
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 overflow-y-auto flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-background/80 backdrop-blur-md z-10">
            <TableRow className="hover:bg-transparent border-b border-border/50">
              <TableHead className="w-12 text-center text-[9px] uppercase font-bold tracking-tighter">
                #
              </TableHead>
              <TableHead className="text-[9px] uppercase font-bold tracking-tighter">
                Balance
              </TableHead>
              {showInvestedColumn && (
                <TableHead className="text-[9px] uppercase font-bold tracking-tighter">
                  Invertido
                </TableHead>
              )}
              <TableHead className="text-right text-[9px] uppercase font-bold tracking-tighter">
                Interés
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.Period}
                className="border-b border-border/20 last:border-0"
              >
                <TableCell className="text-center font-medium text-[10px] uppercase">
                  {row.Period}
                </TableCell>
                <TableCell className="text-[10px] uppercase">
                  {"$"}
                  {formatterToCOP.format(row.Balance.toFixed(2))}
                </TableCell>
                {showInvestedColumn && (
                  <TableCell className="text-[10px] uppercase">
                    {"$"}
                    {formatterToCOP.format(row.Invested.toFixed(2))}
                  </TableCell>
                )}
                <TableCell className="text-right font-medium text-[10px] uppercase">
                  {"$"}
                  {formatterToCOP.format(row.InterestPeriod.toFixed(2))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
