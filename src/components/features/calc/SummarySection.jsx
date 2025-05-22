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

export default function SummarySection({ summary, formData }) {
  return (
    <Card className="w-full">
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Saldo Final</TableHead>
              <TableHead>Total invertido</TableHead>
              <TableHead>Ganancia</TableHead>
              <TableHead>Tasa</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow>
              <TableCell>
                {"$"}
                {formatterToCOP.format(summary.Balance.toFixed(2))}
              </TableCell>
              <TableCell>
                {"$"}
                {formatterToCOP.format(summary.Invested.toFixed(2))}
              </TableCell>
              <TableCell>
                {"$"}
                {formatterToCOP.format(
                  summary.Balance.toFixed(2) - summary.Invested.toFixed(2)
                )}
              </TableCell>
              <TableCell>
                {formData.rateValue}% {formData.rateType}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
