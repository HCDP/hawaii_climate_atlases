import React from "react";
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import NavBar from "@/components/NavBar";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Rainfall Atlas of Hawaii",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  // var map = L.map("rainfall-interactive-map").setView([51.505, -0.09], 13);
  // L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  // }).addTo(map);
  return (
    <html lang="en">
      <head>
        <title>Rainfall Atlas of Hawaii</title>
        {/* Required for Leaflet */}
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
              integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
              crossOrigin=""/>
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
                integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
                crossOrigin=""></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div>
          <div className="bg-[#708090]">
            {/*<div className="h-[140px] bg-[url('/rainfall_banner.png')] bg-top bg-no-repeat overflow-visible" />*/}
            <div className="h-[140px] overflow-visible">
              <img className="mx-auto max-h-none max-w-none" src="/rainfall_banner.png" alt="rainfall banner" />
            </div>
            <div className="h-[45px] w-full min-w-[972px] bg-[url('/navi_bg.gif')]">
              <NavBar navLinks={[
                { text: 'Home', path: '/'},
                { text: 'Interactive Map', path: '/interactive-map' },
                { text: 'Downloads', path: '/downloads'},
                { text: 'How to cite', path: '/how-to-cite' },
                { text: 'History', path: '/history'},
                { text: 'Methods', path: '/methods' },
                { text: 'Rainfall', path: '/rainfall' },
                { text: 'Acknowledgements', path: '/acknowledgements' },
                { text: 'People', path: '/people' },
              ]} />
            </div>
          </div>
          <main className="min-h-screen max-w-screen font-serif">
            {children}
          </main>
          <footer className="flex row-start-3 justify-center">
            Footer
          </footer>
        </div>
      </body>
    </html>
  );
}
