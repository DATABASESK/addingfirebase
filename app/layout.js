"use client";  // <-- Keep this line for client-side components

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AnalyticsWrapper from "@/components/AnalyticsWrapper";  // Import new wrapper

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        
        {/* Main content of the page */}
        <div>
          {children}
        </div>

        <ToastContainer draggable theme="dark" />
        
        {/* Add the AnalyticsWrapper component */}
        <AnalyticsWrapper />
      </body>
    </html>
  );
}
