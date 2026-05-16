"use client";

import { motion } from "framer-motion";

import styles from "./Button.module.css";

export default function Button({ isActive, toggleMenu }) {
  return (
    <button
      className={styles.button}
      type="button"
      onClick={toggleMenu}
      aria-expanded={isActive}
      aria-label={isActive ? "Fermer le menu" : "Ouvrir le menu"}
    >
      <motion.span
        className={styles.slider}
        animate={{ top: isActive ? "-100%" : "0%" }}
        transition={{ duration: 0.5, type: "tween", ease: [0.76, 0, 0.24, 1] }}
      >
        <span className={styles.el}>
          <PerspectiveText label="Menu" />
        </span>
        <span className={styles.el}>
          <PerspectiveText label="Fermer" />
        </span>
      </motion.span>
    </button>
  );
}

function PerspectiveText({ label }) {
  return (
    <span className={styles.perspectiveText}>
      <span>{label}</span>
      <span>{label}</span>
    </span>
  );
}
