import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import MobileNav from "@/components/ui/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Sidebar from "@/components/ui/Sidebar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});
const ibmPlexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-ibm-plex-serif",
});

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
  // Fetch user data in a separate function
  const userPromise = getLoggedInUser();

  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-full font-inter">
          <Sidebar user={await userPromise} />
          <div className="flex size-full flex-col">
            <div className="root-layout">
              <Image src="/icons/logo.svg" width={30} height={30} alt="logo" />
              <div>
                <MobileNav user={await userPromise} />
              </div>
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}