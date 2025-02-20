import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SmartEd Innovations",
  description: "SmartEd is a banking platform for everyone.",
  icons: {
    icon: "/icons/logo.jpeg",
  },
};
//junk files
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