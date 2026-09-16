"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Maximize2,
  Minimize2,
  Presentation,
  X,
} from "lucide-react";
import { BrandMark } from "./BrandMark";
import { LanguageSwitch } from "./LanguageSwitch";
import { Button } from "./ui";
import { PPT_FILE, PPT_SLIDES } from "@/lib/ppt";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";

export function PresentView() {
  const { t } = useI18n();
  const { user } = useAuth();
  const router = useRouter();
  const slides = PPT_SLIDES;
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
        <div className="relative mx-auto flex w-full max-w-[1200px] flex-1 items-center">
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
            className="relative mx-auto aspect-video w-full max-h-[min(72dvh,760px)] overflow-hidden rounded-xl bg-white shadow-[0_30px_80px_-28px_rgba(0,0,0,0.65)] sm:rounded-2xl"
            onClick={(event) => {
              const rect = event.currentTarget.getBoundingClientRect();
              const x = event.clientX - rect.left;
              if (x < rect.width * 0.28) go(index - 1);
              else go(index + 1);
            }}
          >
            <Image
              src={current.src}
              alt={current.title}
              fill
              priority
              className="object-contain"
              sizes="(min-width: 1200px) 1200px, 100vw"
            />
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

        <div className="mx-auto mt-3 flex w-full max-w-[1200px] flex-col gap-3">
          <div className="flex items-center justify-between gap-3 text-[11px] font-bold tracking-[0.12em] text-gold-soft uppercase">
            <span className="inline-flex items-center gap-2">
              <Presentation size={14} /> agroconnect.pptx
            </span>
            <span className="text-white/70">
              {t("presentSlideOf", { n: index + 1, total })}
            </span>
          </div>
          <div className="h-1 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-gold transition-[width] duration-300"
              style={{ width: `${((index + 1) / total) * 100}%` }}
            />
          </div>

          <div className="-mx-1 flex gap-2 overflow-x-auto px-1 pb-1">
            {slides.map((slide, i) => (
              <button
                key={slide.src}
                type="button"
                onClick={() => go(i)}
                className={`relative h-16 w-[104px] shrink-0 overflow-hidden rounded-lg border ${
                  i === index ? "border-gold" : "border-white/10 hover:border-white/30"
                }`}
                aria-label={slide.title}
              >
                <Image src={slide.src} alt="" fill className="object-cover" sizes="104px" />
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
              <a
                href={PPT_FILE}
                download="agroconnect.pptx"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-[14px] border border-white/28 bg-white/10 px-4 py-2 text-[14px] font-bold text-white hover:bg-white/20 sm:px-[22px] sm:text-[15px]"
              >
                <Download size={16} /> {t("presentDownload")}
              </a>
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
