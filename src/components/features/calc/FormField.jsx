import { cn } from "@/lib/utils";

export function FormField({ label, error, children, className }) {
  const labelClass =
    "text-foreground/80 dark:text-muted-foreground font-semibold ml-1 truncate h-5 flex items-center uppercase text-[11px] tracking-wider";
  const errorClass =
    "text-[10px] font-medium text-destructive ml-1 leading-tight truncate h-4 uppercase";

  return (
    <div className={cn("flex flex-col gap-1.5 min-w-0", className)}>
      {label && <label className={labelClass}>{label}</label>}
      <div className="h-10 flex items-center">{children}</div>
      {error && <p className={errorClass}>{error}</p>}
    </div>
  );
}
