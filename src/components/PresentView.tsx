"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Maximize2,
  Minimize2,
  Presentation,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { Button } from "./ui";
import { decks } from "@/lib/deck";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

export function PresentView() {
  const { t, lang } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const slides = decks[lang];
  const [index, setIndex] = useState(0);
  const [fullscreen, setFullscreen] = useState(false);
  const current = slides[index] ?? slides[0];
  const total = slides.length;
  const homeHref = user ? "/home" : "/";

  const go = useCallback(
    (next: number) => {
      setIndex(Math.min(total - 1, Math.max(0, next)));
    },
    [total],
  );

  const toggleFullscreen = useCallback(async () => {
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    } catch {
      /* browser blocked fullscreen */
    }
  }, []);

  useEffect(() => {
    function onFull() {
      setFullscreen(Boolean(document.fullscreenElement));
    }
    document.addEventListener("fullscreenchange", onFull);
    return () => document.removeEventListener("fullscreenchange", onFull);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault();
        go(index + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(index - 1);
      }
      if (event.key === "Home") go(0);
      if (event.key === "End") go(total - 1);
      if (event.key === "f" || event.key === "F") {
        event.preventDefault();
        void toggleFullscreen();
      }
      if (event.key === "Escape" && !document.fullscreenElement) {
        router.push(homeHref);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [go, homeHref, index, router, toggleFullscreen, total]);

  useEffect(() => {
    setIndex((i) => Math.min(i, slides.length - 1));
  }, [slides.length]);

  return (
    <div className="flex min-h-dvh flex-col bg-[#081910] text-white">
      <header className="flex h-14 shrink-0 items-center justify-between gap-2 px-3 pt-[env(safe-area-inset-top)] sm:h-16 sm:px-5">
        <BrandMark light href={homeHref} />
        <div className="flex items-center gap-2">
          <LanguageSwitch light />
          <button
            type="button"
            onClick={() => router.push(homeHref)}
            className="grid h-10 w-10 place-items-center rounded-xl border border-white/15 text-white/80 hover:bg-white/10"
            aria-label={t("presentExit")}
          >
            <X size={18} />
          </button>
        </div>
      </header>

      <main className="flex min-h-0 flex-1 flex-col px-3 pb-3 sm:px-5 sm:pb-5">
        <div className="relative mx-auto flex w-full max-w-[1100px] flex-1 items-center">
          <button
            type="button"
            className="absolute top-1/2 left-0 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-white md:grid"
            onClick={() => go(index - 1)}
            disabled={index === 0}
            aria-label={t("presentPrev")}
          >
            <ChevronLeft size={22} />
          </button>

          <article
            className="mx-auto flex aspect-video w-full max-h-[min(70dvh,720px)] flex-col overflow-hidden rounded-2xl bg-[#fffcf7] text-ink shadow-[0_30px_80px_-28px_rgba(0,0,0,0.65)] sm:rounded-3xl"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - rect.left;
              if (x < rect.width * 0.28) go(index - 1);
              else go(index + 1);
            }}
          >
            <div className="flex h-10 items-center justify-between border-b border-line px-4 sm:h-12 sm:px-8">
              <span className="inline-flex items-center gap-2 text-[11px] font-extrabold tracking-[0.16em] text-gold uppercase">
                <Presentation size={14} /> {t("navPresent")}
              </span>
              <span className="text-[11px] font-bold text-sage">
                {t("presentSlideOf", { n: index + 1, total })}
              </span>
            </div>

            <div className="flex min-h-0 flex-1 flex-col justify-center px-5 py-5 sm:px-10 sm:py-8 md:px-14">
              <p className="text-[11px] font-extrabold tracking-[0.2em] text-gold uppercase sm:text-[12px]">
                {current.kicker}
              </p>
              <h1
                className={`font-serif mt-2 leading-[1.12] text-forest ${
                  current.kind === "title" || current.kind === "close"
                    ? "text-[28px] sm:text-[44px] md:text-[56px]"
                    : "text-[22px] sm:text-[32px] md:text-[40px]"
                }`}
              >
                {current.title}
              </h1>
              {current.body && (
                <p className="mt-4 max-w-[46ch] text-[15px] leading-7 text-sage sm:text-[18px] sm:leading-8">
                  {current.body}
                </p>
              )}
              {current.points && (
                <ul className="mt-5 max-w-[58ch] space-y-2.5 sm:mt-6 sm:space-y-3">
                  {current.points.map((point) => (
                    <li key={point} className="flex gap-3 text-[14px] leading-6 text-ink sm:text-[17px] sm:leading-7">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-canopy" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              )}
              {current.stats && (
                <div className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4">
                  {current.stats.map((stat) => (
                    <div key={stat.label} className="rounded-2xl border border-line bg-mist px-4 py-4">
                      <p className="font-serif text-[28px] text-forest sm:text-[34px]">{stat.value}</p>
                      <p className="mt-1 text-[12px] font-semibold text-sage sm:text-[13px]">{stat.label}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </article>

          <button
            type="button"
            className="absolute top-1/2 right-0 z-10 hidden h-12 w-12 -translate-y-1/2 place-items-center rounded-full border border-white/15 bg-black/30 text-white md:grid"
            onClick={() => go(index + 1)}
            disabled={index === total - 1}
            aria-label={t("presentNext")}
          >
            <ChevronRight size={22} />
          </button>
        </div>

        <div className="mx-auto mt-3 flex w-full max-w-[1100px] flex-col gap-3">
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {slides.map((slide, i) => (
              <button
                key={`${slide.title}-${i}`}
                type="button"
                onClick={() => go(i)}
                className={`h-14 w-[92px] shrink-0 rounded-lg border px-2 py-1.5 text-left ${
                  i === index ? "border-gold bg-white/15" : "border-white/10 bg-white/5 hover:bg-white/10"
                }`}
              >
                <span className="block text-[9px] font-bold tracking-[0.12em] text-gold-soft uppercase">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="mt-0.5 line-clamp-2 text-[10px] leading-tight text-white/80">{slide.title}</span>
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="hidden text-[12px] text-white/45 md:block">{t("presentHint")}</p>
            <div className="flex w-full flex-wrap items-center justify-end gap-2 md:w-auto">
              <Button $variant="ghost" type="button" onClick={() => go(index - 1)} disabled={index === 0}>
                <ChevronLeft size={16} /> {t("presentPrev")}
              </Button>
              <Button $variant="ghost" type="button" onClick={() => go(index + 1)} disabled={index === total - 1}>
                {t("presentNext")} <ChevronRight size={16} />
              </Button>
              <Button $variant="gold" type="button" onClick={() => void toggleFullscreen()}>
                {fullscreen ? <Minimize2 size={16} /> : <Maximize2 size={16} />}
                {fullscreen ? t("presentExitFs") : t("presentFullscreen")}
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
