import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatterToCOP } from "@/util/number";

export default function SummarySection({ summary, formData }) {
  const items = [
    {
      title: "Total invertido",
      value: `$${formatterToCOP.format(summary.Invested.toFixed(2))}`,
    },
    {
      title: "Saldo Final",
      value: `$${formatterToCOP.format(summary.Balance.toFixed(2))}`,
    },
    {
      title: "Ganancia",
      value: `$${formatterToCOP.format(
        summary.Balance.toFixed(2) - summary.Invested.toFixed(2),
      )}`,
    },
    {
      title: "Tasa",
      value: `${formData.rateValue}% ${formData.rateType}`,
    },
  ];

  return (
    <div className="grid grid-cols-4 md:grid-cols-4 gap-3 w-full">
      {items.map((item) => (
        <Card
          key={item.title}
          className="flex flex-col p-0 overflow-hidden min-w-0"
        >
          <CardHeader className="p-2 px-3 pb-0">
            <CardTitle className="text-[9px] uppercase tracking-widest text-muted-foreground font-bold truncate">
              {item.title}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-2 px-3 pt-0.5">
            <p className="text-xs md:text-sm font-bold text-foreground truncate uppercase">
              {item.value}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
