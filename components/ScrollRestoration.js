"use client";
import { useEffect } from "react";

const ScrollRestoration = ({ children }) => {
  useEffect(() => {
    const scrollPosition = sessionStorage.getItem("scrollPosition");
    if (scrollPosition) {
      window.scrollTo(0, parseInt(scrollPosition));
    }
  }, []);

  useEffect(() => {
    const saveScrollPosition = () => {
      sessionStorage.setItem("scrollPosition", window.scrollY);
    };

    window.addEventListener("beforeunload", saveScrollPosition);
    
    return () => {
      window.removeEventListener("beforeunload", saveScrollPosition);
    };
  }, []);

  return <>{children}</>;
};

export default ScrollRestoration;
