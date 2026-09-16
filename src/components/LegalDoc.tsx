"use client";

import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { SiteFooter } from "./SiteFooter";
import { Reveal } from "./Reveal";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

export function LegalDoc({ kind }: { kind: "privacy" | "terms" }) {
  const { t } = useI18n();
  const title: MsgKey = kind === "privacy" ? "privacyTitle" : "termsTitle";
  const lead: MsgKey = kind === "privacy" ? "privacyLead" : "termsLead";
  const p1: MsgKey = kind === "privacy" ? "privacyP1" : "termsP1";
  const p2: MsgKey = kind === "privacy" ? "privacyP2" : "termsP2";

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <header className="w-full border-b border-line bg-[#fffcf7] pt-[env(safe-area-inset-top)]">
        <div className="flex h-16 w-full min-w-0 items-center justify-between gap-2 px-4 sm:px-5 md:h-[76px] md:px-10">
          <BrandMark href="/" />
          <LanguageSwitch />
        </div>
      </header>
      <article className="w-full min-w-0 flex-1 px-4 py-10 sm:px-5 sm:py-12 md:px-10 md:py-16">
        <Reveal>
          <p className="text-[12px] font-bold tracking-[0.18em] text-gold uppercase">
            {t("legalUpdated")}
          </p>
          <h1 className="font-serif mt-3 text-[28px] text-forest sm:text-[36px] md:text-[48px]">{t(title)}</h1>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-ink sm:text-[18px] sm:leading-8">{t(lead)}</p>
          <p className="mt-6 max-w-[62ch] text-[16px] leading-7 text-sage">{t(p1)}</p>
          <p className="mt-4 max-w-[62ch] text-[16px] leading-7 text-sage">{t(p2)}</p>
        </Reveal>
      </article>
      <SiteFooter />
    </div>
  );
}
