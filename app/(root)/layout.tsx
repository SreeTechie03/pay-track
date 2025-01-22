import Sidebar from "@/components/ui/Sidebar";
import { getLoggedInUser } from "@/lib/actions/user.actions";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const loggedIn =await getLoggedInUser;
  return (
   <main className="flex h-screen w-full font-inter">
   <Sidebar user={loggedIn}/>
    
    {children}
   </main>
  );
}
