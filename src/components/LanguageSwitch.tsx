"use client";

import { useI18n } from "@/lib/i18n";
import type { Lang } from "@/lib/messages";

export function LanguageSwitch({ light = false }: { light?: boolean }) {
  const { lang, setLang, t } = useI18n();

  const options: { id: Lang; label: string }[] = [
    { id: "en", label: t("langEn") },
    { id: "hn", label: t("langHn") },
  ];

  return (
    <div
      role="group"
      aria-label={t("chooseLanguage")}
      className={`inline-flex shrink-0 rounded-full border p-0.5 text-[11px] font-bold tracking-[0.08em] sm:text-[12px] ${
        light ? "border-white/30 bg-white/10 text-white" : "border-line bg-mist text-sage"
      }`}
    >
      {options.map((opt) => (
        <button
          key={opt.id}
          type="button"
          onClick={() => setLang(opt.id)}
            className={`rounded-full px-2.5 py-1.5 sm:px-3 ${
            lang === opt.id
              ? light
                ? "bg-white text-forest"
                : "bg-canopy text-white"
              : ""
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
