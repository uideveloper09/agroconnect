"use client";

import { Phone, ShieldCheck, Truck, Radio } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";

type FooterLink = { label: string; onClick?: () => void; href?: string };

export function SiteFooter({
  brandHref = "/",
  links,
  linksTitle,
}: {
  brandHref?: string;
  links?: FooterLink[];
  linksTitle?: string;
}) {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  const start = links ?? [
    { label: t("login"), href: "/" },
    { label: t("loginOtp"), href: "/?mode=otp" },
    { label: t("registerNow"), href: "/?mode=register" },
    { label: t("navPresent"), href: "/present" },
  ];

  const support: FooterLink[] = [
    { label: t("footerPrivacy"), href: "/privacy" },
    { label: t("footerTerms"), href: "/terms" },
    { label: t("helplineLabel"), href: "tel:18002025472" },
  ];

  const points = [
    { icon: ShieldCheck, text: t("statSecure") },
    { icon: Truck, text: t("footerPickup") },
    { icon: Radio, text: t("footerLive") },
  ];

  return (
    <footer className="w-full">
      <div className="bg-[#efe6d2]">
        <Reveal>
          <div className="flex w-full flex-col gap-6 px-4 py-6 sm:px-5 md:flex-row md:items-end md:justify-between md:px-8 lg:px-10 lg:py-8">
            <div className="min-w-0">
              <p className="text-[11px] font-extrabold tracking-[0.22em] text-gold uppercase">
                {t("helplineLabel")}
              </p>
              <a
                href="tel:18002025472"
                className="font-serif mt-2 block text-[26px] leading-tight break-all text-forest sm:text-[34px] sm:leading-none sm:break-normal md:text-[44px]"
              >
                1800-202-KISAN
              </a>
              <p className="mt-2 text-[13px] text-sage">{t("helplineHours")}</p>
            </div>
            <div className="flex w-full flex-col gap-4 sm:flex-row sm:items-center md:w-auto">
              <div className="flex flex-wrap gap-2">
                {points.map((item) => (
                  <span
                    key={item.text}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[rgba(15,61,46,0.12)] bg-white/70 px-3 py-1.5 text-[12px] font-semibold text-forest"
                  >
                    <item.icon size={14} />
                    {item.text}
                  </span>
                ))}
              </div>
              <a
                href="tel:18002025472"
                className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-forest px-5 py-3 text-[13px] font-bold tracking-[0.12em] text-white uppercase sm:w-auto"
              >
                <Phone size={16} /> {t("callNow")}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="bg-[#0c2f24] text-white">
        <div className="grid w-full gap-8 px-4 py-10 sm:grid-cols-2 sm:gap-10 sm:px-5 md:px-8 lg:grid-cols-[minmax(0,1.5fr)_1fr_1fr_auto] lg:px-10 lg:py-12">
          <Reveal>
            <BrandMark light href={brandHref} />
            <p className="mt-5 max-w-[36ch] text-[16px] leading-7 text-white/80">
              {t("brandTag")}.
            </p>
            <p className="mt-4 text-[12px] tracking-[0.08em] text-gold-soft">{t("footerSecure")}</p>
          </Reveal>

          <Reveal delay={80}>
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-gold uppercase">
              {linksTitle ?? t("footerStart")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {start.map((item) => (
                <li key={item.label}>
                  <FooterItem item={item} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={140}>
            <p className="text-[11px] font-extrabold tracking-[0.2em] text-gold uppercase">
              {t("footerSupport")}
            </p>
            <ul className="mt-4 space-y-2.5">
              {support.map((item) => (
                <li key={item.label}>
                  <FooterItem item={item} />
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={200}>
            <p className="mb-3 text-[11px] font-extrabold tracking-[0.2em] text-gold uppercase">
              {t("chooseLanguage")}
            </p>
            <LanguageSwitch light />
            <a
              href="tel:18002025472"
              className="mt-5 block text-[13px] text-white/70 hover:text-gold-soft"
            >
              1800-202-KISAN
            </a>
          </Reveal>
        </div>

        <div className="border-t border-white/10">
          <Reveal>
            <div className="flex w-full flex-col gap-2 px-4 py-5 text-[12px] leading-5 text-white/45 sm:px-5 md:flex-row md:items-center md:justify-between md:px-8 lg:px-10">
              <p>
                © {year} Agro Connect · {t("footerMade")}
              </p>
              <p>{t("footerTag")}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </footer>
  );
}

function FooterItem({ item }: { item: FooterLink }) {
  const className = "text-[14px] text-white/75 transition-colors hover:text-gold-soft";
  if (item.onClick) {
    return (
      <button type="button" onClick={item.onClick} className={className}>
        {item.label}
      </button>
    );
  }
  if (item.href) {
    return (
      <a href={item.href} className={className}>
        {item.label}
      </a>
    );
  }
  return <span className="text-[14px] text-white/75">{item.label}</span>;
}
