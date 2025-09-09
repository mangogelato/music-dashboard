import type { Metadata } from "next";
import { Fira_Code, Fira_Mono, Fira_Sans} from "next/font/google";
import "./globals.css";
import { Suspense } from "react";

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"]
}) 

const firaSans = Fira_Sans({
  variable: "--font-fira-sans",
  subsets: ["latin"],
  weight: "300"
}) 

const firaMono = Fira_Mono({
  variable: "--font-fira-mono",
  subsets: ["latin"],
  weight: "500"
}) 

export const metadata: Metadata = {
  title: "Music Dashboard",
  description: "See your top Spotify artists and tracks",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${firaCode.variable} ${firaMono.variable} ${firaSans.variable} font-mono`} 
      >
        <Suspense>
          {children}
        </Suspense>
      </body>
    </html>
  );
}
