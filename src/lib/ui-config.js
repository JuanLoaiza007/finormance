export const UI_CONFIG = {
  background: {
    opacity: "opacity-30",
  },
  form: {
    background: "bg-background",
    shadow: "shadow-md",
    container:
      "flex flex-col w-full md:max-w-1/3 lg:max-w-3/12 pb-2 md:pb-8  px-6 md:px-6 gap-1 h-full overflow-hidden",
  },
  results: {
    background: "bg-background",
    container: "w-full flex flex-col bg-background overflow-hidden relative",
  },
  blur: {
    summaryBar: "bg-background/15 backdrop-blur-xl shadow-sm",
    card: "bg-card/65 dark:bg-card/35 backdrop-blur-4xl shadow-md",
    footer: "bg-background/15 backdrop-blur-xl shadow-sm",
  },
  blurredBackground: {
    form: {
      opacity: "opacity-40 dark:opacity-40",
      circles: [
        "bg-primary/50 blur-[120px]",
        "bg-blue-500/40 blur-[100px]",
        "bg-purple-500/40 blur-[100px]",
      ],
      sizes: ["w-[100%] h-[100%]", "w-[70%] h-[70%]", "w-[100%] h-[100%]"],
      positions: [
        "top-[-10%] left-[-10%]",
        "bottom-[-10%] right-[-10%]",
        "top-[20%] right-[10%]",
      ],
    },
    results: {
      opacity: "opacity-40",
      circles: [
        "bg-primary/60 blur-[150px]",
        "bg-blue-500/50 blur-[130px]",
        "bg-purple-500/50 blur-[130px]",
      ],
      sizes: ["w-[90%] h-[90%]", "w-[80%] h-[80%]", "w-[70%] h-[70%]"],
      positions: [
        "top-[-15%] left-[-15%]",
        "bottom-[-15%] right-[-15%]",
        "top-[15%] right-[5%]",
      ],
    },
  },
};
