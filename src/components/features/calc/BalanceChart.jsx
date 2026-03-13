import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { formatterToCOP } from "@/util/number";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function BalanceChart({ data, scenarios, className }) {
  if (!data || data.length === 0) return null;

  // Calcular min/max para el dominio del eje Y
  const allBalances = data.flatMap((d) =>
    scenarios.map((s) => d[`balance_${s.id}`]),
  );
  const min = Math.min(...allBalances);
  const max = Math.max(...allBalances);

  const yMin = min * 0.98;
  const yMax = max * 1.02;

  return (
    <Card className={className}>
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-[11px] uppercase tracking-widest font-bold text-muted-foreground">
          Evolución Comparativa
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-4 h-[350px] w-full">
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
            <Legend
              verticalAlign="top"
              height={36}
              formatter={(value) => {
                const scenario = scenarios.find(
                  (s) => `balance_${s.id}` === value,
                );
                return (
                  <span className="text-[10px] uppercase font-bold text-muted-foreground">
                    {scenario?.name || value}
                  </span>
                );
              }}
            />
            {scenarios.map((s) => (
              <Line
                key={s.id}
                type="monotone"
                dataKey={`balance_${s.id}`}
                stroke={s.color}
                strokeWidth={2}
                dot={false}
                animationDuration={500}
              />
            ))}
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
