import type { Metadata } from "next";
import { Asap } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import Providers from "./Providers";

const asap = Asap({ subsets: ["latin"], weight: ["400", "500", "600"] });

export const metadata: Metadata = {
  title: {
    default: "U Blog",
    template: `%s | U Blog`,
  },
  icons: [
    {
      url: "logo.svg",
      href: "logo.svg",
    },
  ],
  description: "Create your dream blog with U Blog",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={asap.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
