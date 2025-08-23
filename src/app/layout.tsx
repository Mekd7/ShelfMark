import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { fontKalnia } from "./libs/fonts";
import { Inter } from 'next/font/google'; 


const fontInter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>

    <html lang="en" className={`${fontInter.variable} ${fontKalnia.variable}`}>
      <body>
        
        {children}
        
      </body>
    </html>

    </ClerkProvider>
  );
}
