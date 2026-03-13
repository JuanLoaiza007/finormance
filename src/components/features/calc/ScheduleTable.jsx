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

export function ScheduleTable({ data, scenarios, className }) {
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
              {scenarios.map((s) => (
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
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow
                key={row.Period}
                className="border-b border-border/20 last:border-0"
              >
                <TableCell className="text-center font-medium text-xs uppercase">
                  {row.Period}
                </TableCell>
                {scenarios.map((s) => (
                  <TableCell
                    key={s.id}
                    className="text-[11px] uppercase text-right pr-4"
                  >
                    $
                    {formatterToCOP.format(
                      (row[`balance_${s.id}`] || 0).toFixed(2),
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
