import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterToCOP } from "@/util/number";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function SummarySection({ comparisonData }) {
  const { summaries } = comparisonData;

  return (
    <Card className="w-full overflow-hidden">
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          Comparativa de Escenarios
        </CardTitle>
      </CardHeader>
      <CardContent className="p-0 mt-4 overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent border-b border-border/50">
              <TableHead className="text-[10px] uppercase font-bold pl-4">
                Escenario
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-center">
                Configuración
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-right">
                Saldo Final
              </TableHead>
              <TableHead className="text-[10px] uppercase font-bold text-right pr-4">
                Ganancia
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {summaries.map((s) => (
              <TableRow
                key={s.id}
                className="border-b border-border/20 last:border-0"
              >
                <TableCell className="pl-4">
                  <div className="flex items-center gap-2">
                    <div
                      className="size-2 rounded-full shrink-0"
                      style={{ backgroundColor: s.color }}
                    />
                    <span className="text-[11px] font-bold uppercase truncate max-w-[100px]">
                      {s.name}
                    </span>
                  </div>
                </TableCell>
                <TableCell className="text-center text-[10px] font-medium uppercase text-muted-foreground">
                  {s.configLabel}
                </TableCell>
                <TableCell className="text-right text-[11px] font-bold uppercase">
                  ${formatterToCOP.format(s.finalBalance.toFixed(2))}
                </TableCell>
                <TableCell className="text-right text-[11px] font-bold uppercase pr-4 text-primary">
                  ${formatterToCOP.format(s.totalGain.toFixed(2))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
