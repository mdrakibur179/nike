import { useState, useEffect, useRef } from "react";
import { headerLogo } from "../assets/images/";
import { navLinks } from "../constants";
import { hamburger } from "../assets/icons/";

const Nav = () => {
  const [isMobileNavVisible, setIsMobileNavVisible] = useState(false);
  const mobileNavRef = useRef(null);

  const toggleMobileNav = () => {
    setIsMobileNavVisible(!isMobileNavVisible);
  };

  // Effect to add/remove overflow:hidden to body
  useEffect(() => {
    if (isMobileNavVisible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileNavVisible]);

  // Effect to handle clicks outside the mobile nav
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
        setIsMobileNavVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="padding-x py-8 absolute z10 w-full">
      <nav className="flex justify-between items-center max-container">
        <a href="#">
          <img src={headerLogo} alt="headerLogo" width={130} height={29} />
        </a>

        <ul className="flex flex-1 justify-center items-center gap-16 max-lg:hidden">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <button className="max-lg:hidden">Login</button>

        <div className="hidden max-lg:block cursor-pointer" onClick={toggleMobileNav}>
          <img src={hamburger} alt="hamburger" width={25} height={25} />
        </div>
      </nav>

      <div
        ref={mobileNavRef}
        className={`fixed top-0 ring-1 right-0 h-full w-64 bg-white transition-transform transform ${
          isMobileNavVisible ? "translate-x-0" : "translate-x-full"
        } lg:hidden`}
      >
        <div className="flex justify-end p-4">
          <button className="text-4xl mr-6" onClick={toggleMobileNav}>&times;</button>
        </div>
        <ul className="flex flex-col items-center gap-12 mt-4">
          {navLinks.map((item) => (
            <li key={item.label}>
              <a
                href={item.href}
                className="font-montserrat leading-normal text-lg text-slate-gray"
                onClick={toggleMobileNav}
              >
                {item.label}
              </a>
            </li>
          ))}
          <button className="bg-blue-400 py-2 px-12 rounded-sm text-white hover:text-gray-500" onClick={toggleMobileNav}>Login</button>
        </ul>
      </div>
    </header>
  );
};

export default Nav;
