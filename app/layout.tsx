import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Origin",
  description: "Origin is a banking platform for everyone.",
  icons: {
    icon: "/icons/logo.svg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
            {children}
      </body>
    </html>
  );
}