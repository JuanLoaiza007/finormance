import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
import { formatterToCOP } from "@/util/number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BalanceChart({ data, className }) {
  if (!data || data.length === 0) return null;

  const balances = data.map((d) => d.Balance);
  const min = Math.min(...balances);
  const max = Math.max(...balances);

  const yMin = min * 0.98;
  const yMax = max * 1.02;

  return (
    <Card className={className}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-[10px] uppercase tracking-widest font-bold text-muted-foreground">
          Evolución del Saldo
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-4 h-[300px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              opacity={0.1}
            />
            <XAxis
              dataKey="Period"
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 10, fill: "currentColor", opacity: 0.6 }}
              tickFormatter={(value) => formatterToCOP.format(value)}
            />
            <Tooltip
              formatter={(value) => formatterToCOP.format(value)}
              labelFormatter={(label) => `PERÍODO ${label}`}
              contentStyle={{
                fontSize: 10,
                backgroundColor: "var(--popover)",
                borderColor: "var(--border)",
                borderRadius: "var(--radius)",
                color: "var(--popover-foreground)",
                backdropFilter: "blur(8px)",
                textTransform: "uppercase",
                fontWeight: "bold",
              }}
            />
            <Line
              type="monotone"
              dataKey="Balance"
              stroke="var(--primary)"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
