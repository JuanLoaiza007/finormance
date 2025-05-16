import "./globals.css";

export const metadata = {
  title: "Finormance Simulator",
  description: "Simulate your financial performance",
};

export default function RootLayout({ children }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
