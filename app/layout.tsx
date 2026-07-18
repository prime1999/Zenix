import type { Metadata } from "next";
import { Geist, Roboto, Viga } from "next/font/google";
import { ThemeProvider } from "next-themes";
import localFont from "next/font/local";
import "./globals.css";
// React-query imports
import Providers from "./ReactQueryProvider.tsx/Provider";
// Shadcn imports
import { Toaster } from "@/components/ui/sonner";

export const metadata: Metadata = {
  title: "Zenix",
  description: "The AI that turns your future self to your peronalized mentor",
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  display: "swap",
  subsets: ["latin"],
});

const roboto = Roboto({
  variable: "--font-zenix-roboto",
  display: "swap",
  subsets: ["latin"],
});

const viga = Viga({
  variable: "--font-zenix-viga",
  display: "swap",
  subsets: ["latin"],
  weight: ["400"],
});

// Configure custom local font
const nevera = localFont({
  src: [
    {
      path: "./fonts/Nevera-Regular.otf",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-nevera",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${roboto.variable} ${viga.variable} ${nevera.variable} antialiased`}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
