"use client";  // <-- Add this line to mark this as a Client Component

import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from "@/components/LoginModal";  // Import Login Modal

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Manage login state

  const handleLogin = () => {
    setIsLoggedIn(true); // Update state to indicate the user is logged in
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        {/* Conditionally render the login modal and apply blur */}
        {!isLoggedIn && <LoginModal onLogin={handleLogin} />}  {/* Show login modal if not logged in */}
        
        {/* Conditionally blur the content */}
        <div className={`transition-all duration-300 ${!isLoggedIn ? "blur-sm" : ""}`}>
          {children} {/* Main content of the page */}
        </div>

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
