"use client";

import { useLayoutEffect, useRef } from "react";
import clsx from "clsx";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Reveal({
  children,
  delay = 0,
  className,
  parallax = false,
  parallaxIntensity = "soft"
}) {
  const rootRef = useRef(null);

  useLayoutEffect(() => {
    const node = rootRef.current;

    if (!node) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      gsap.set(node, { opacity: 1, y: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(node, {
        opacity: 0,
        y: 24
      });

      gsap.to(node, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        delay,
        ease: "power3.out",
        scrollTrigger: {
          trigger: node,
          start: "top 86%"
        }
      });
    }, rootRef);

    return () => context.revert();
  }, [delay]);

  return (
    <div ref={rootRef} className={className}>
      <div
        className={clsx(
          parallax && "parallax-float",
          parallax && `parallax-float--${parallaxIntensity}`
        )}
      >
        {children}
      </div>
    </div>
  );
}
