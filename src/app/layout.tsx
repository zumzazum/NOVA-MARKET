import "./globals.css";
import { Inter } from "next/font/google";
import Header from "../components/Header";
import Footer from "../components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "NOVA Market",
  description: "Маркетплейс Кыргызстана",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body className={`${inter.className} bg-white text-gray-900`}>
        <Header />
        <main className="min-h-screen container mx-auto px-4 py-6">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
