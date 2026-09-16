"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { BrandMark } from "./BrandMark";
import { Button } from "./ui";
import { LanguageSwitch } from "./LanguageSwitch";
import { Reveal } from "./Reveal";
import { useAuth } from "@/lib/auth";
import { useSell } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";

export function Header() {
  const { user, logout } = useAuth();
  const { setStep, booking, startSelling, goHome } = useSell();
  const { t } = useI18n();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  function handleLogout() {
    logout();
    router.replace("/");
  }

  const nav = [
    { label: t("navHome"), onClick: () => setStep("home") },
    { label: t("navSell"), onClick: startSelling },
    { label: t("navTrack"), onClick: () => setStep(booking ? "track" : "select") },
  ];

  return (
    <header className="fixed top-0 z-50 w-full border-b border-line bg-white/95 pt-[env(safe-area-inset-top)] backdrop-blur-md">
      <Reveal variant="down" className="flex h-16 w-full min-w-0 items-center justify-between gap-2 px-4 sm:gap-4 md:h-[76px] md:px-8 lg:px-10">
        <BrandMark
          href="/home"
          onClick={(event) => {
            event.preventDefault();
            goHome();
            setOpen(false);
          }}
        />

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) => (
            <button
              key={item.label}
              type="button"
              onClick={item.onClick}
              className="rounded-xl px-3.5 py-2 text-[14px] font-semibold text-sage hover:bg-mist hover:text-canopy"
            >
              {item.label}
            </button>
          ))}
          <Link
            href="/present"
            className="rounded-xl px-3.5 py-2 text-[14px] font-semibold text-sage hover:bg-mist hover:text-canopy"
          >
            {t("navPresent")}
          </Link>
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <LanguageSwitch />
          {user && (
            <>
              <div className="flex max-w-[220px] items-center gap-2 rounded-2xl border border-line py-1 pr-3 pl-1">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gradient-to-br from-fresh to-canopy text-[12px] font-bold text-white">
                  {user.name
                    .split(" ")
                    .map((part) => part[0])
                    .slice(0, 2)
                    .join("")}
                </span>
                <span className="min-w-0 text-left leading-tight">
                  <span className="block truncate text-[13px] font-bold text-ink">{user.name}</span>
                  <span className="block text-[11px] text-sage">{t("roleFarmer")}</span>
                </span>
              </div>
              <Button $variant="outline" type="button" onClick={handleLogout}>
                {t("logout")}
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl border border-line bg-white text-canopy lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? t("closeMenu") : t("openMenu")}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </Reveal>

      {open && (
        <div className="max-h-[calc(100dvh-4rem)] overflow-y-auto border-t border-line bg-white px-4 py-4 lg:hidden md:px-8">
          <div className="mb-3">
            <LanguageSwitch />
          </div>
          {user && (
            <p className="mb-3 truncate text-[13px] font-semibold text-ink">
              {user.name} · {t("roleFarmer")}
            </p>
          )}
          <div className="flex flex-col gap-1">
            {nav.map((item) => (
              <button
                key={item.label}
                type="button"
                onClick={() => {
                  item.onClick();
                  setOpen(false);
                }}
                className="rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-ink hover:bg-mist"
              >
                {item.label}
              </button>
            ))}
            <Link
              href="/present"
              onClick={() => setOpen(false)}
              className="rounded-xl px-3 py-3 text-left text-[15px] font-semibold text-ink hover:bg-mist"
            >
              {t("navPresent")}
            </Link>
          </div>
          {user && (
            <Button $block $variant="outline" className="mt-3" type="button" onClick={handleLogout}>
              {t("logout")} · {user.name}
            </Button>
          )}
        </div>
      )}
    </header>
  );
}
