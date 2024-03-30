import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./ThemeRegistry";
import { ToasterPopUp } from "@absensi/components/UI";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Absensi",
  description: "Absensi Siswa",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeRegistry options={{ key: 'mui', prepend: true }}>{children}</ThemeRegistry>
        <ToasterPopUp />
      </body>
    </html>
  );
}
