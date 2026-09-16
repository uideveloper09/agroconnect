"use client";

import { BrandMark } from "@/components/BrandMark";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import { SiteFooter } from "@/components/SiteFooter";
import { ButtonLink } from "@/components/ui";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

export default function NotFound() {
  const { user } = useAuth();
  const { t } = useI18n();
  const href = user ? "/home" : "/";
  const label = user ? t("farmerDesk") : t("backToLogin");

  return (
    <div className="flex min-h-dvh flex-col bg-paper">
      <header className="w-full border-b border-line bg-[#fffcf7] pt-[env(safe-area-inset-top)]">
        <div className="flex h-16 w-full min-w-0 items-center justify-between gap-2 px-4 sm:px-5 md:h-[76px] md:px-10">
          <BrandMark href={href} />
          <LanguageSwitch />
        </div>
      </header>
      <main className="flex flex-1 flex-col items-start justify-center px-4 py-12 sm:px-5 sm:py-16 md:px-10">
        <p className="text-[12px] font-bold tracking-[0.18em] text-gold uppercase">404</p>
        <h1 className="font-serif mt-3 max-w-[16ch] text-[28px] text-forest sm:text-[36px] md:text-[48px]">
          {t("notFoundTitle")}
        </h1>
        <p className="mt-3 max-w-[46ch] text-[15px] text-sage sm:text-[16px]">{t("notFoundSub")}</p>
        <ButtonLink className="mt-8 w-full sm:w-auto" href={href}>
          {label}
        </ButtonLink>
      </main>
      <SiteFooter />
    </div>
  );
}
