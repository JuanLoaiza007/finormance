import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { Onest } from "next/font/google";

const OnestFont = Onest({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  fallback: ["Inter", "sans-serif"],
});

export const metadata = {
  title: "Finormance Simulator",
  description: "Simulate your financial performance",
  manifest: "/manifest.json",
  themeColor: "#000000",
  viewport: "width=device-width, initial-scale=1",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Finormance",
  },
  icons: {
    apple: "/finormance.svg",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={OnestFont.className}>
      <body>
        {/* <ThemeProvider> */}
        {children}
        {/* </ThemeProvider> */}
      </body>
    </html>
  );
}
