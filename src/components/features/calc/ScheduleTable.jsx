// src/components/features/calc/ScheduleTable.jsx
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatterToCOP } from "@/util/number";

export function ScheduleTable({ data, className }) {
  return (
    <Card className={"max-h-100 overflow-y-auto " + (className || "")}>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Balance</TableHead>
              <TableHead>Invertido</TableHead>
              <TableHead>Interés Periodo</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((row) => (
              <TableRow key={row.Period}>
                <TableCell>{row.Period}</TableCell>
                <TableCell>
                  {"$"}
                  {formatterToCOP.format(row.Balance.toFixed(2))}
                </TableCell>
                <TableCell>
                  {"$"}
                  {formatterToCOP.format(row.Invested.toFixed(2))}
                </TableCell>
                <TableCell>
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
