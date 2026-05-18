"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "./Button";
import Nav from "./Nav";
import styles from "./SideMenu.module.css";

const menu = {
  open: {
    width: "620px",
    height: "650px",
    top: "-25px",
    right: "-25px",
    transition: { duration: 0.75, type: "tween", ease: [0.76, 0, 0.24, 1] }
  },
  closed: {
    width: "100px",
    height: "40px",
    top: "0px",
    right: "0px",
    transition: { duration: 0.75, delay: 0.35, type: "tween", ease: [0.76, 0, 0.24, 1] }
  }
};

export default function SideMenu({
  links,
  contactDetails,
  locale,
  alternateLocale,
  alternatePath,
  glassActive = false
}) {
  const [isActive, setIsActive] = useState(false);
  const rootRef = useRef(null);

  useEffect(() => {
    if (!isActive) {
      return;
    }

    const handlePointerDown = (event) => {
      if (rootRef.current && !rootRef.current.contains(event.target)) {
        setIsActive(false);
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => {
      document.removeEventListener("pointerdown", handlePointerDown);
    };
  }, [isActive]);

  return (
    <header
      ref={rootRef}
      className={`${styles.header} ${glassActive ? styles.headerGlass : styles.headerSolid}`}
    >
      <Link className={styles.languageSwitch} href={alternatePath}>
        <span>{locale.toUpperCase()}</span>
        <span>/</span>
        <span>{alternateLocale.toUpperCase()}</span>
      </Link>
      <motion.div
        className={styles.menu}
        variants={menu}
        animate={isActive ? "open" : "closed"}
        initial="closed"
      >
        <AnimatePresence>
          {isActive ? (
            <Nav
              links={links}
              contactDetails={contactDetails}
              onNavigate={() => setIsActive(false)}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
      <Button
        isActive={isActive}
        toggleMenu={() => setIsActive(!isActive)}
        glassActive={glassActive}
      />
    </header>
  );
}
