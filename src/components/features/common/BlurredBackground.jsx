import { UI_CONFIG } from "@/lib/ui-config";

export function BlurredBackground({ location = "form" }) {
  const config = UI_CONFIG.blurredBackground[location];

  return (
    <div
      className={`absolute inset-0 z-0 overflow-hidden pointer-events-none ${config.opacity}`}
    >
      <div
        className={`absolute ${config.positions[0]} ${config.sizes[0]} rounded-full ${config.circles[0]}`}
      />
      <div
        className={`absolute ${config.positions[1]} ${config.sizes[1]} rounded-full ${config.circles[1]}`}
      />
      <div
        className={`absolute ${config.positions[2]} ${config.sizes[2]} rounded-full ${config.circles[2]}`}
      />
    </div>
  );
}
