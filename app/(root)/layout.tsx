import type { Metadata } from "next";
import { IBM_Plex_Serif } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Image from "next/image";
import MobileNav from "@/components/ui/MobileNav";
import { getLoggedInUser } from "@/lib/actions/user.actions";
import Sidebar from "@/components/ui/Sidebar";
import { redirect } from "next/navigation";

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
  title: "SmartEd Innovations",
  description: "SmartEd is a banking platform for everyone.",
  icons: {
    icon: "/icons/logo.jpeg",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Fetch user data in a separate function
  const loggedIn = getLoggedInUser();


  if (!loggedIn) redirect('/sign-in');
  return (
    <html lang="en">
      <body>
        <main className="flex h-screen w-full font-inter">
          <Sidebar user={await loggedIn} />
          <div className="flex size-full flex-col">
            <div className="root-layout">
              <Image src="/icons/logo.jpeg" width={40} height={40} alt="logo" />
              <div>
                <MobileNav user={await loggedIn} />
              </div>
            </div>
            {children}
          </div>
        </main>
      </body>
    </html>
  );
}