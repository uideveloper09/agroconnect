"use client";

import type { MouseEvent } from "react";
import Link from "next/link";
import { useI18n } from "@/lib/i18n";

export function BrandMark({
  light = false,
  href = "/",
  journal = false,
  onClick,
}: {
  light?: boolean;
  href?: string;
  journal?: boolean;
  onClick?: (event: MouseEvent<HTMLAnchorElement>) => void;
}) {
  const { t } = useI18n();
  const title = light ? "text-white" : "text-forest";
  const sub = light ? "text-white/70" : "text-sage";

  if (journal) {
    return (
      <Link href={href} onClick={onClick} className="group no-underline">
        <span className={`font-serif block text-[22px] leading-none tracking-[-0.03em] md:text-[26px] ${title}`}>
          Agro Connect
        </span>
        <span className={`mt-1 block text-[10px] font-semibold tracking-[0.28em] uppercase ${sub}`}>
          {t("brandTag")}
        </span>
      </Link>
    );
  }

  return (
    <Link
      href={href}
      onClick={onClick}
      className="flex min-w-0 items-center gap-2 no-underline sm:gap-3"
    >
      <span
        className="grid h-9 w-9 shrink-0 place-items-center rounded-[11px] text-white shadow-[0_10px_20px_-10px_rgba(27,94,63,0.7)] sm:h-11 sm:w-11 sm:rounded-[13px]"
        style={{
          background: "linear-gradient(155deg, #4caf6d, #1b5e3f)",
        }}
      >
        <svg className="h-[18px] w-[18px] sm:h-[22px] sm:w-[22px]" viewBox="0 0 24 24" fill="none" aria-hidden>
          <path
            d="M12 21c0-6 7-7.5 7-13a7 7 0 1 0-14 0c0 5.5 7 7 7 13Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path d="M12 21V9" stroke="#E8C96A" strokeWidth="1.6" strokeLinecap="round" />
        </svg>
      </span>
      <span className="min-w-0 leading-tight">
        <span className={`block truncate font-display text-[16px] font-extrabold tracking-tight sm:text-[19px] ${title}`}>
          Agro Connect
        </span>
        <span className={`hidden text-[12px] font-medium min-[400px]:block ${sub}`}>{t("brandTag")}</span>
      </span>
    </Link>
  );
}
