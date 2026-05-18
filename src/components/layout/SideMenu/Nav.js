"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

import { perspective, slideIn } from "./anim";
import styles from "./Nav.module.css";

export default function Nav({ links, contactDetails, onNavigate }) {
  const [isHoverReady, setIsHoverReady] = useState(false);

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      setIsHoverReady(true);
    }, 1500);

    return () => window.clearTimeout(timeout);
  }, []);

  return (
    <div className={`${styles.nav} ${isHoverReady ? styles.navHoverReady : ""}`}>
      <div className={styles.body}>
        {links.map((link, i) => (
          <div key={link.href} className={styles.linkContainer}>
            <motion.div
              className={styles.linkMotion}
              custom={i}
              variants={perspective}
              initial="initial"
              animate="enter"
              exit="exit"
            >
              <Link href={link.href} onClick={onNavigate}>
                {link.title}
              </Link>
            </motion.div>
          </div>
        ))}
      </div>

      {contactDetails ? (
        <motion.div
          className={styles.contact}
          variants={slideIn}
          custom={0}
          initial="initial"
          animate="enter"
          exit="exit"
        >
          <a href={`tel:${contactDetails.phone.replaceAll(" ", "")}`}>
            {contactDetails.phone}
          </a>
          <a href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
          </a>
        </motion.div>
      ) : null}
    </div>
  );
}
