import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/shared/components/providers";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "chan9yu dev blog",
    template: "%s | chan9yu",
  },
  description: "프론트엔드 엔지니어의 기술 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={`${inter.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
