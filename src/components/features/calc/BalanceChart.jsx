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
import { Card, CardContent } from "@/components/ui/card";

export function BalanceChart({ data, className, width, height }) {
  if (!data || data.length === 0) return null;

  const balances = data.map((d) => d.Balance);
  const min = Math.min(...balances);
  const max = Math.max(...balances);

  const yMin = min * 0.98;
  const yMax = max * 1.02;

  return (
    <Card className={className}>
      <CardContent className={"flex justify-center items-center my-auto"}>
        <ResponsiveContainer width={width} height={height}>
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="Period"
              tick={{ fontSize: 10 }}
              label={{
                value: "Período",
                position: "insideBottom",
                fontSize: 12,
              }}
            />
            <YAxis
              domain={[yMin, yMax]}
              tick={{ fontSize: 10 }}
              tickFormatter={(value) => formatterToCOP.format(value)}
            />
            <Tooltip
              formatter={(value) => formatterToCOP.format(value)}
              labelFormatter={(label) => `Período ${label}`}
              contentStyle={{ fontSize: 12 }}
              itemStyle={{ fontSize: 12 }}
            />
            <Line
              type="monotone"
              dataKey="Balance"
              stroke="#8884d8"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}
