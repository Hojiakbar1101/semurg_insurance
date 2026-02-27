import type { Metadata } from "next";
import "./globals.css";
import { I18nProvider } from "@/i18n/context";

export const metadata: Metadata = {
  title: "SEMUR Insurance — Regress Dashboard",
  description: "Regress case management dashboard for SEMUR Insurance",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body>
        <I18nProvider>
          {children}
        </I18nProvider>
      </body>
    </html>
  );
}
