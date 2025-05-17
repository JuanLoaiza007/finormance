// src/components/features/calc/ScheduleTable.jsx
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
    <div className={"max-h-80 overflow-auto " + (className || "")}>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="font-bold">#</TableHead>
            <TableHead className="font-bold">Balance</TableHead>
            <TableHead className="font-bold">Invertido</TableHead>
            <TableHead className="font-bold">Interés Periodo</TableHead>
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
    </div>
  );
}
