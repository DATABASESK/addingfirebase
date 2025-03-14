"use client";
import { useEffect } from "react";

const ScrollRestoration = ({ children }) => {
  useEffect(() => {
    // Restore scroll position after page load
    const savedPosition = sessionStorage.getItem("scrollPosition");
    if (savedPosition) {
      setTimeout(() => {
        window.scrollTo(0, parseInt(savedPosition, 10));
      }, 100); // Delay ensures content is loaded before scrolling
    }
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    // Save scroll position on scroll event
    window.addEventListener("scroll", saveScrollPosition);
    window.addEventListener("beforeunload", saveScrollPosition);

    return () => {
      window.removeEventListener("scroll", saveScrollPosition);
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollRestoration;
