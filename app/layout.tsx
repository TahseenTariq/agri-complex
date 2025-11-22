import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Header from "@/main-page/Header";
import Footer from "@/main-page/Footer";
import ConditionalLayout from "@/main-page/ConditionalLayout";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "South Punjab DAMS",
  description: "Digital Asset Management System for South Punjab – Multan Region",
  icons: {
    icon: "/logo.png.png",
    apple: "/logo.png.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <Header />
        <ConditionalLayout>
          {children}
        </ConditionalLayout>
        <Footer />
      </body>
    </html>
  );
}
