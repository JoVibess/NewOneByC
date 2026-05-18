"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function StretchReveal({ children, className = "" }) {
  const rootRef = useRef(null);
  const panelRef = useRef(null);
  const contentRef = useRef(null);

  useLayoutEffect(() => {
    const root = rootRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;

    if (!root || !panel || !content) {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (mediaQuery.matches) {
      gsap.set(panel, { clipPath: "inset(0% 0% 0% 0%)" });
      gsap.set(content, { opacity: 1, x: 0 });
      return;
    }

    const context = gsap.context(() => {
      gsap.set(panel, {
        clipPath: "inset(0% 100% 0% 0%)"
      });

      gsap.set(content, {
        opacity: 0,
        x: -24
      });

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: "top 78%",
          once: true
        }
      });

      timeline
        .to(panel, {
          clipPath: "inset(0% 0% 0% 0%)",
          duration: 1.05,
          ease: "power3.out"
        })
        .to(
          content,
          {
            opacity: 1,
            x: 0,
            duration: 0.75,
            ease: "power3.out"
          },
          0.18
        );
    }, root);

    return () => context.revert();
  }, []);

  return (
    <div ref={rootRef} className={`stretch-reveal ${className}`.trim()}>
      <div ref={panelRef} className="stretch-reveal__panel">
        <div ref={contentRef} className="stretch-reveal__content">
          {children}
        </div>
      </div>
    </div>
  );
}
