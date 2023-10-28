import type { Metadata } from "next";
import "./globals.css";
import { GeistSans } from "geist/font";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <Toaster />

      <body className="flex min-h-screen flex-col items-center p-4 gap-8">
        <div>
          <h1 className="text-4xl font-medium">
            John & Kathy's Homestyle Kitchen
          </h1>
          <p className="mt-1 text-sm leading-6 text-gray-400 text-left">
            Order some food!
          </p>
        </div>
        <main className="w-full">{children}</main>
      </body>
    </html>
  );
}
