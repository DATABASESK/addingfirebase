import { auth } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged, signOut } from "firebase/auth";
import { useState, useEffect } from "react";
import { nightTokyo } from "@/utils/fonts";
import styles from "./header.module.css";
import Link from "next/link";
import Image from "next/image";
import Links from "./Links";
import Search from "./Search";
import Responsive from "./Responsive";

const Header = () => {
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
    } catch (error) {
      console.error("Login Failed:", error);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setUser(null);
  };

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <div className={styles.left}>
          <Responsive />
          <Link href={"/"} className={`${nightTokyo.className} text-white flex items-center gap-2`}>
            <Image src="/images/logo.png" alt="SK MOVIES" width={50} height={50} />
            <span className="text-3xl">SK MOVIES</span>
          </Link>
          <Links />
        </div>

        <div className={`${styles.right} min-[1390px]:w-[24%]`}>
          <Search />

          {/* ✅ Show Profile Image if Logged In */}
          {user ? (
            <div className="relative">
              <button onClick={() => setMenuOpen(!menuOpen)}>
                <Image
                  src={user.photoURL || "/images/default-avatar.png"}
                  alt="Profile"
                  width={40}
                  height={40}
                  className="rounded-full cursor-pointer"
                />
              </button>

              {/* ✅ Dropdown Menu for Logout */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-[#121212] text-white rounded-lg shadow-lg">
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-700"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            /* ✅ Show Login Button if Not Logged In */
            <button
              onClick={handleLogin}  // Use the fixed login function
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
