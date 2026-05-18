"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import SideMenu from "@/components/layout/SideMenu";

export default function SiteHeader({ dictionary, locale, currentPath }) {
  const [isHeroHeader, setIsHeroHeader] = useState(false);
  const alternateLocale = locale === "fr" ? "en" : "fr";
  const alternatePath = currentPath.replace(`/${locale}`, `/${alternateLocale}`);
  const isHome = currentPath === `/${locale}`;
  const links = dictionary.nav.map((item) => ({
    href: item.href,
    title: item.label
  }));

  useEffect(() => {
    if (!isHome) {
      return;
    }

    let animationFrame = null;

    const updateHeader = () => {
      const hero = document.querySelector(".hero-section");
      const heroBottom = hero
        ? hero.getBoundingClientRect().bottom + window.scrollY
        : window.innerHeight;

      setIsHeroHeader(window.scrollY < heroBottom - 30);
    };

    const scheduleUpdate = () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      animationFrame = window.requestAnimationFrame(updateHeader);
    };

    scheduleUpdate();
    window.addEventListener("scroll", scheduleUpdate, { passive: true });
    window.addEventListener("resize", scheduleUpdate);

    return () => {
      if (animationFrame) {
        window.cancelAnimationFrame(animationFrame);
      }

      window.removeEventListener("scroll", scheduleUpdate);
      window.removeEventListener("resize", scheduleUpdate);
    };
  }, [isHome]);

  return (
    <>
      <div
        className={`site-header-bar ${isHeroHeader ? "site-header-bar--glass" : "site-header-bar--solid"}`}
        aria-hidden="true"
      />
      <Link
        className={`site-logo-link ${isHeroHeader ? "site-logo-link--glass" : "site-logo-link--solid"}`}
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
        glassActive={isHeroHeader}
      />
    </>
  );
}
