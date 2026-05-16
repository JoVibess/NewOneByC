"use client";

import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function HomeProcess({ dictionary }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const spacerRef = useRef(null);

  useLayoutEffect(() => {
    const context = gsap.context(() => {
      const wrap = wrapRef.current;
      const track = trackRef.current;
      const spacer = spacerRef.current;

      if (!wrap || !track || !spacer) {
        return;
      }

      const panels = gsap.utils.toArray(".steps-track .steps-panel", track);

      if (panels.length <= 1) {
        return;
      }

      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const syncSpacerHeight = () => {
        spacer.style.height = `${distance()}px`;
      };

      syncSpacerHeight();

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: wrap,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 1,
          invalidateOnRefresh: true,
          snap: {
            snapTo: 1 / (panels.length - 1),
            duration: { min: 0.2, max: 0.45 },
            delay: 0.05,
            directional: true,
            ease: "power2.out"
          }
        }
      });

      const handleResize = () => {
        syncSpacerHeight();
        ScrollTrigger.refresh();
      };

      ScrollTrigger.addEventListener("refreshInit", syncSpacerHeight);
      window.addEventListener("resize", handleResize);
      ScrollTrigger.refresh();

      return () => {
        ScrollTrigger.removeEventListener("refreshInit", syncSpacerHeight);
        window.removeEventListener("resize", handleResize);
      };
    }, wrapRef);

    return () => {
      context.revert();
    };
  }, []);

  return (
    <section className="steps-section">
      <div ref={wrapRef} className="steps-horizontal-wrap">
        <div className="steps-horizontal-sticky">
          <div ref={trackRef} className="steps-track">
            {dictionary.home.process.steps.map((step) => (
              <section key={step.index} className="steps-panel">
                <div className="steps-panel__inner">
                  <div className="steps-panel__content">
                    <p className="steps-panel__eyebrow">
                      {dictionary.home.process.title}
                    </p>
                    <span className="steps-panel__index">{step.index}</span>
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>
                  </div>

                  <div className="steps-panel__visual">
                    <div className="steps-panel__image-placeholder">
                      <span>{`Image ${step.title}`}</span>
                    </div>
                  </div>
                </div>
              </section>
            ))}
          </div>
        </div>
        <div ref={spacerRef} className="steps-horizontal-after-spacer" />
      </div>
    </section>
  );
}
