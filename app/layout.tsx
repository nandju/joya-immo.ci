import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--poppins",
  subsets: ["latin"],
  weight: ["100" , "200" , "300" , "400" , "500" , "600" , "700" , "800" , "900"],
  
});

export const metadata: Metadata = {
  title: "Joya Immobilier - Votre partenaire immobilier en Côte d'Ivoire",
  description: "Trouvez la maison de vos rêves avec Joya Immobilier. Location et vente de propriétés en Côte d'Ivoire.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${poppins.variable} antialiased`}
      >
        <div className="font-poppins max-w-screen-2xl mx-auto ">
             {children}
        </div>
      </body>
    </html>
  );
}
