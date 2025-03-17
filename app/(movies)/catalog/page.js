"use client";

import { useState, useEffect } from "react";
import { auth } from "@/lib/firebaseConfig"; // Import Firebase auth
import { onAuthStateChanged } from "firebase/auth";
import Movies from "@/content/catalog/Movies";
import { Fragment } from "react";
import { useRouter } from "next/navigation";

const Page = () => {
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        router.push("/"); // Redirect to home page if not logged in
      } else {
        setUser(user);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, [router]);

  if (!user) {
    return (
      <div className="text-white text-center mt-20">
        Redirecting to login...
      </div>
    );
  }

  return (
    <Fragment>
      <div className="w-full flex flex-col items-center z-10 relative main-responsive top-[86px]">
        <div className="w-full max-w-[96rem] relative">
          {/* Small line separator */}
          <div className="w-full h-[1px] absolute bg-[#212029] top-[1px]"></div>

          <div className="mt-[15px] flex justify-between items-center">
            <h1 className="text-[#ffffffea] font-medium text-[23px] font-['poppins']">
              Catalog
            </h1>
          </div>

          <div className="flex gap-4 mt-4 mb-32 max-[780px]:flex-col">
            <Movies />
          </div>
        </div>
      </div>

      {/* Background effects */}
      <div className="fixed w-[138.33px] h-[82.25px] left-[1%] top-[2%] bg-[#92b7fc8f] blur-[200px]"></div>
      <div className="fixed w-[500px] h-[370.13px] right-[50%] bottom-[20%] bg-[#576683b4] blur-[215.03px] translate-x-[70%] z-0 rounded-b-[30%]"></div>
    </Fragment>
  );
};

export default Page;
