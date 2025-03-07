'use client'

import { Poppins } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/global/Sidebar";
import Header from "@/components/global/Header";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { getUser } from "@/components/lib/Cookie";
import NextTopLoader from "nextjs-toploader";

const font = Poppins({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500', '600', '700', '800'],
  display: 'swap', // Mengatur tampilan swap agar tidak ada flash saat font dimuat
});
export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

  const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME;
  const [isOpen, setIsOpen] = useState<boolean | null>(null);
  const [user, setUser] = useState<any>(null);
  const [isZoomed, setIsZoomed] = useState<boolean | null>(null);
  const pathname = usePathname();
  const loginPage = pathname === "/login"

  const checkZoomLevel = () => {
    const zoomLevel = window.devicePixelRatio;
    if (zoomLevel >= 1.5) {
      setIsZoomed(true);
      setIsOpen(false); // Hide sidebar by default when zoom is 150%
    } else {
      setIsZoomed(false);
      setIsOpen(true); // Show sidebar when zoom level is below 150%
    }
  };

  useEffect(() => {
    const data = getUser();
    if (data) {
      setUser(data.user)
    }
    // Mengambil path dari URL tanpa domain dan protokol
    const path = window.location.pathname;
    // Mengganti judul (title) halaman dengan path (nama halaman)
    document.title = path.substring(1);
  }, [pathname]);

  const toggleSidebar = () => {
    setIsOpen(!isOpen)
  }

  useEffect(() => {
    checkZoomLevel();
    window.addEventListener('resize', checkZoomLevel);
    return () => window.removeEventListener('resize', checkZoomLevel);
  }, []);

  if (loginPage) {
    return (
      <html lang="en" className={font.className}>
        <head>
          <title>{APP_NAME}</title>
          <meta name="description" content={APP_NAME} />
          <link rel="icon" href="/logo-1.png" />
        </head>
        <body>
          <div className="flex min-h-screen">
            {/* LEFT SIDE */}
            <div className="relative hidden md:flex w-3/4 items-center justify-center bg-cover bg-center"
              style={{
                backgroundImage: "url('/backgrounds/login-bg.png')",
                backgroundSize: "contain",  // Fit the image inside the box
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
            >
              {/* OVERLAY */}
              <div className="absolute inset-0 bg-black/40"></div>

              {/* JUDUL */}
              <div className="relative z-10 bg-white/20 backdrop-blur-lg p-10 rounded-xl max-w-lg text-center text-white">
                <h1 className="text-5xl font-bold">{APP_NAME}</h1>
                <p className="mt-3 text-lg">Rapi, Efisien, Paperless</p>
              </div>
            </div>
            {/* LOGIN FORM */}
            <div className="w-1/4 flex items-center justify-center p-10">
              <div className={`${font.className} w-full max-w-md space-y-6`}>{children}</div>
            </div>
          </div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en" className={font.className}>
      <head>
        <title>{APP_NAME}</title>
        <meta name="description" content={APP_NAME} />
        <link rel="icon" href="/logo-1.png" />
      </head>
      <body className="flex">
        <NextTopLoader
          color="linear-gradient(to right, rgb(134, 239, 172), rgb(59, 130, 246), rgb(147, 51, 234))"
        />
        {!loginPage && <Sidebar isOpen={isOpen} toggleSidebar={() => toggleSidebar()} isZoomed={isZoomed} />}
        <div className={`w-full ${isOpen ? 'pl-[16rem]' : ''}`}>
          {!loginPage && <Header />}
          <div className={`${font.className} ${loginPage ? "" : "px-4 py-2"}`}>{children}</div>
        </div>
      </body>
    </html>
  );
}
