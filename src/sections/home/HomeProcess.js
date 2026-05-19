"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const stepImages = {
  "01": "/images/rencontre.webp",
  "02": "/images/bilan.webp",
  "03": "/images/traitement.webp"
};

export default function HomeProcess({ dictionary }) {
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const spacerRef = useRef(null);

  useLayoutEffect(() => {
    let media = null;

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

      media = gsap.matchMedia();
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const syncSpacerHeight = () => {
        spacer.style.height = `${distance()}px`;
      };

      media.add("(min-width: 981px)", () => {
        syncSpacerHeight();

        const tween = gsap.to(track, {
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
          tween.kill();
          spacer.style.height = "0px";
          ScrollTrigger.removeEventListener("refreshInit", syncSpacerHeight);
          window.removeEventListener("resize", handleResize);
        };
      });

      media.add("(max-width: 980px)", () => {
        gsap.set(track, { clearProps: "transform" });
        spacer.style.height = "0px";
      });

    }, wrapRef);

    return () => {
      media?.revert();
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
                    <span className="steps-panel__ghost-index" aria-hidden="true">
                      {step.index}
                    </span>
                    <p className="steps-panel__eyebrow">
                      {dictionary.home.process.title}
                    </p>
                    <h2>{step.title}</h2>
                    <p>{step.description}</p>
                  </div>

                  <div className="steps-panel__visual">
                    <div className="steps-panel__image-placeholder">
                      <Image
                        src={stepImages[step.index]}
                        alt={step.title}
                        fill
                        sizes="(max-width: 980px) 78vw, 46vw"
                        className="steps-panel__image"
                      />
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
