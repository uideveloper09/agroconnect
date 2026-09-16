"use client";

import { SiteFooter } from "./SiteFooter";
import { useSell } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";

export function Footer() {
  const { t } = useI18n();
  const { goHome, startSelling, setStep, booking } = useSell();

  return (
    <SiteFooter
      brandHref="/home"
      linksTitle={t("footerJourney")}
      links={[
        { label: t("navHome"), onClick: goHome },
        { label: t("navSell"), onClick: startSelling },
        { label: t("navTrack"), onClick: () => setStep(booking ? "track" : "select") },
        { label: t("navPresent"), href: "/present" },
      ]}
    />
  );
}
