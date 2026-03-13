import { UI_CONFIG } from "@/lib/ui-config";

export function BlurredBackground() {
  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${UI_CONFIG.background.opacity}`}
    >
      <div
        className={`absolute top-[-10%] left-[-10%] w-[80%] h-[80%] rounded-full bg-primary/50 blur-[120px]`}
      />
      <div
        className={`absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] rounded-full bg-blue-500/50 blur-[120px]`}
      />
      <div
        className={`absolute top-[20%] right-[10%] w-[80%] h-[80%] rounded-full bg-purple-500/50 blur-[120px]`}
      />
    </div>
  );
}
