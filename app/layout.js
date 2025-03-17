"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // ✅ Import router for navigation
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/partials/header/Header";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AnalyticsWrapper from "@/components/AnalyticsWrapper";
import { auth } from "@/lib/firebaseConfig";
import { onAuthStateChanged } from "firebase/auth";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [user, setUser] = useState(null);
  const router = useRouter(); // ✅ Initialize router

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        toast.success(`Welcome to MovieVerse, ${currentUser.displayName || "User"}!`, {
          position: "top-center",
        });
      } else {
        setUser(null);
        toast.warn("Login to see movies!", { position: "top-center" });

        // ✅ Redirect to home when logged out
        router.push("/");
      }
    });

    return () => unsubscribe();
  }, [router]); // ✅ Added router as a dependency

  return (
    <html lang="en">
      <head>
        <title>MovieVerse</title>
        <meta name="description" content="Best movies collection online" />
        <link rel="icon" href="https://raw.githubusercontent.com/DATABASESK/testingphase2-only-site-/refs/heads/main/public/images/logo.png?token=GHSAT0AAAAAADAI35Y3II2W3RFRY4Y4QHPUZ6SRXSQ" type="image/png" />
        <link rel="apple-touch-icon" href="https://raw.githubusercontent.com/DATABASESK/testingphase2-only-site-/refs/heads/main/public/images/logo.png?token=GHSAT0AAAAAADAI35Y3II2W3RFRY4Y4QHPUZ6SRXSQ" />
      </head>
      <body className={inter.className}>
        <Header />

        {/* ✅ Content is blurred if user is not logged in */}
        <div className={`content-container ${!user ? "blur-content" : ""}`}>
          {children}
        </div>

        {/* Toast Notifications for Login Messages */}
        <ToastContainer draggable theme="dark" />

        <AnalyticsWrapper />
      </body>

      {/* ✅ Styles for Blur Effect */}
      <style jsx>{`
        .content-container {
          transition: filter 0.3s ease-in-out;
        }
        .blur-content {
          filter: blur(5px);
          pointer-events: none;
        }
      `}</style>
    </html>
  );
}
