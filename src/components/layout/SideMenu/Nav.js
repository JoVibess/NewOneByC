"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { perspective, slideIn } from "./anim";
import styles from "./Nav.module.css";

export default function Nav({ links, footerLinks, onNavigate }) {
  return (
    <div className={styles.nav}>
      <div className={styles.body}>
        {links.map((link, i) => (
          <div key={link.href} className={styles.linkContainer}>
            <motion.div
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

      <motion.div className={styles.footer}>
        {footerLinks.map((link, i) => (
          <motion.div
            variants={slideIn}
            custom={i}
            initial="initial"
            animate="enter"
            exit="exit"
            key={link.href}
          >
            <Link href={link.href} onClick={onNavigate}>
              {link.title}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
