"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import Button from "./Button";
import Nav from "./Nav";
import styles from "./SideMenu.module.css";

const menu = {
  open: {
    width: "480px",
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

export default function SideMenu({ links, footerLinks }) {
  const [isActive, setIsActive] = useState(false);

  return (
    <header className={styles.header}>
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
              footerLinks={footerLinks}
              onNavigate={() => setIsActive(false)}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
      <Button isActive={isActive} toggleMenu={() => setIsActive(!isActive)} />
    </header>
  );
}
