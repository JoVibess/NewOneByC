"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

import SideMenu from "@/components/layout/SideMenu";

export default function SiteHeader({ dictionary, locale, currentPath }) {
  const alternateLocale = locale === "fr" ? "en" : "fr";
  const alternatePath = currentPath.replace(`/${locale}`, `/${alternateLocale}`);
  const isHome = currentPath === `/${locale}`;
  const [isHeroHeader, setIsHeroHeader] = useState(isHome);
  const isHeroHeaderRef = useRef(isHome);
  const headerIsHero = isHome && isHeroHeader;
  const links = dictionary.nav.map((item) => ({
    href: item.href,
    title: item.label
  }));

  useEffect(() => {
    if (!isHome) {
      isHeroHeaderRef.current = false;
      return;
    }

    let animationFrame = null;
    let heroSwitchPoint = window.innerHeight;

    const measureHero = () => {
      const hero = document.querySelector(".hero-section");

      heroSwitchPoint = hero
        ? hero.offsetTop + hero.offsetHeight - 80
        : window.innerHeight;
    };

    const updateHeader = () => {
      const shouldUseHeroHeader = window.scrollY < heroSwitchPoint;

      if (shouldUseHeroHeader !== isHeroHeaderRef.current) {
        isHeroHeaderRef.current = shouldUseHeroHeader;
        setIsHeroHeader(shouldUseHeroHeader);
      }
    };

    const scheduleUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(updateHeader);
    };

    const handleResize = () => {
      measureHero();
      scheduleUpdate();
    };

    measureHero();
    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", handleResize);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", handleResize);
    };
  }, [isHome]);

  return (
    <>
      <div
        className={`site-header-bar ${headerIsHero ? "site-header-bar--glass" : "site-header-bar--solid"}`}
        aria-hidden="true"
      />
      <Link
        className={`site-logo-link ${headerIsHero ? "site-logo-link--glass" : "site-logo-link--solid"}`}
        href={`/${locale}`}
        aria-label={dictionary.site.name}
      >
        <Image
          className="site-logo-image site-logo-image--dark"
          src="/images/logo-newonebyc.png"
          width={178}
          height={44}
          alt={dictionary.site.name}
          priority
        />
        <Image
          className="site-logo-image site-logo-image--light"
          src="/images/logo-newonebyc-light.png"
          width={178}
          height={44}
          alt=""
          aria-hidden="true"
          priority
        />
      </Link>
      <SideMenu
        links={links}
        contactDetails={dictionary.contactDetails}
        locale={locale}
        alternateLocale={alternateLocale}
        alternatePath={alternatePath}
        glassActive={headerIsHero}
      />
    </>
  );
}
