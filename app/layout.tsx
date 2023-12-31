import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { StorageProvider } from "@/components/Context/Context";
import SignInButtion from "@/components/LayoutComponents/SIngInButton";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HostMan",
  description: "Rest Client - HostMan - Dhananjay Senday",
};

function Navbar() {
  return (
    <nav className="h-12 border-b-gray-800 border-b w-full flex justify-between items-center px-5">
      <h2 className="font-semibold hover:bg-gray-200/20 rounded-md transition-all hover:transition-all duration-300 hover:duration-300  hover:cursor-pointer px-2 py-1">
        HOSTMAN
      </h2>
      <div className="flex gap-4 items-center">
        {/* <button className="text-sm  border-green-300 border bg-emerald-950 text-emerald-300 px-4 rounded-sm hover:bg-emerald-950/20 hover:text-emerald-700 transition-all hover:transition-all">
          Save My Workspace
        </button> */}
     <SignInButtion/>
      </div>
    </nav>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={
          inter.className +
          " bg-neutral-950 overflow-hidden text-white min-h-screen flex flex-col"
        }
      >
          <StorageProvider >
        <Navbar />
          {children}
          </StorageProvider>
      </body>
    </html>
  );
}
