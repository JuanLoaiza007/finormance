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
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Total invertido</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {"$"}
                  {formatterToCOP.format(summary.Invested.toFixed(2))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Saldo Final</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {"$"}
                  {formatterToCOP.format(summary.Balance.toFixed(2))}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Ganancia</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {"$"}
                  {formatterToCOP.format(
                    summary.Balance.toFixed(2) - summary.Invested.toFixed(2)
                  )}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Tasa</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>
                  {formData.rateValue}% {formData.rateType}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
