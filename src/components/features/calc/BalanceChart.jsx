import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";
export function BalanceChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid />
        <XAxis dataKey="Period" />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey="Balance" />
      </LineChart>
    </ResponsiveContainer>
  );
}
