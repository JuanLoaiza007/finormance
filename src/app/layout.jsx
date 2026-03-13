import "./globals.css";
import { Onest } from "next/font/google";
import { ThemeProvider } from "@/context/ThemeContext";
import { UI_CONFIG } from "@/lib/ui-config";
import { BlurredBackground } from "@/components/features/common/BlurredBackground";

const OnestFont = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

export const metadata = {
  title: "Finormance Simulator",
  description:
    "Simulate your financial performance, with a focus on your financial goals",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finormance",
  },
  icons: {
    apple: "/favicon.svg",
  },
};

export const viewport = {
  themeColor: "#000000",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={OnestFont.className} suppressHydrationWarning>
      <body className="relative min-h-screen">
        <ThemeProvider>
          <BlurredBackground />
          {children}
          <footer
            className={`fixed bottom-0 left-0 w-full border-t border-border/50 py-2 px-4 z-50 ${UI_CONFIG.blur.footer}`}
          >
            <p className="text-[10px] md:text-xs text-muted-foreground text-center font-medium">
              Los resultados no garantizan rendimientos reales ni sustituyen la
              asesoría financiera profesional.
            </p>
          </footer>
        </ThemeProvider>
      </body>
    </html>
  );
}
