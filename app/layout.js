import { useState } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginModal from "@/components/LoginModal";  // Import Login Modal

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />

        {/* Conditionally render the login modal and apply blur */}
        {!isLoggedIn && <LoginModal onLogin={handleLogin} />}
        <div className={`transition-all duration-300 ${!isLoggedIn ? "blur-sm" : ""}`}>
          {children}
        </div>

        <ToastContainer draggable theme="dark" />
      </body>
    </html>
  );
}
