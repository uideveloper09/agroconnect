"use client";

import Image from "next/image";
import styled from "styled-components";
import { ArrowRight, CalendarClock, CreditCard, MapPin, Presentation, Truck, Wheat } from "lucide-react";
import { Button, ButtonLink, Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { formatInr, useSell } from "@/lib/sell";
import { useAuth } from "@/lib/auth";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(720px 380px at 92% 8%, rgba(232, 201, 106, 0.2), transparent 58%),
    radial-gradient(520px 280px at 8% 88%, rgba(76, 175, 109, 0.18), transparent 62%),
    linear-gradient(118deg, #081912 0%, #0f3d2e 46%, #123628 100%);
`;

const Grain = styled.div`
  pointer-events: none;
  position: absolute;
  inset: 0;
  z-index: 1;
  opacity: 0.22;
  mix-blend-mode: overlay;
`;

const GoldRule = styled.span`
  display: block;
  width: 36px;
  height: 1.5px;
  flex-shrink: 0;
  background: linear-gradient(90deg, #e8c96a, rgba(232, 201, 106, 0.15));
`;

export function Dashboard() {
  const { user } = useAuth();
  const { startSelling, booking, setStep, cropId, qty } = useSell();
  const { t } = useI18n();
  const hasCrop = Boolean(cropId && Number(qty) > 0);

  const steps = [
    { n: "01", title: t("step1Title"), copy: t("step1Copy"), icon: Wheat, go: () => setStep("select") },
    {
      n: "02",
      title: t("step2Title"),
      copy: t("step2Copy"),
      icon: CreditCard,
      go: () => setStep(hasCrop ? "payment" : "select"),
    },
    {
      n: "03",
      title: t("step3Title"),
      copy: t("step3Copy"),
      icon: CalendarClock,
      go: () => setStep(hasCrop ? "slot" : "select"),
    },
    {
      n: "04",
      title: t("step4Title"),
      copy: t("step4Copy"),
      icon: Truck,
      go: () => setStep(booking ? "track" : "select"),
    },
  ];

  const cropName = booking
    ? t(`crop_${booking.cropId}` as MsgKey)
    : "";
  const greeting = t("namaste", { name: user?.name ?? "" });
  const comma = greeting.indexOf(",");
  const hello = comma >= 0 ? greeting.slice(0, comma) : greeting;
  const who = comma >= 0 ? greeting.slice(comma + 1).trim() : "";

  return (
    <div className="w-full">
      <Hero className="w-full">
        <Grain className="grain" />
        <div className="relative z-[2] grid w-full items-stretch lg:min-h-[560px] lg:grid-cols-[minmax(0,1.08fr)_minmax(0,0.92fr)]">
          <Reveal className="relative flex flex-col justify-center px-5 py-10 sm:px-8 sm:py-14 md:px-12 md:py-16 lg:px-14 lg:py-[80px]">
            <p className="flex items-center gap-3 text-[11px] font-bold tracking-[0.2em] text-gold-soft uppercase sm:text-[12px]">
              <GoldRule />
              {t("farmerDesk")}
            </p>
            <p className="mt-3 inline-flex max-w-full items-center gap-1.5 text-[13px] font-medium text-white/70">
              <MapPin size={14} className="shrink-0 text-gold-soft" />
              <span className="truncate">{user?.place}</span>
            </p>
            <h1 className="font-serif mt-5 text-[34px] leading-[1.08] tracking-[-0.02em] sm:text-[48px] md:text-[58px] lg:text-[64px]">
              <span className="italic text-gold-soft">{hello},</span>
              {who ? (
                <>
                  <br />
                  <span>{who}</span>
                </>
              ) : null}
            </h1>
            <p className="mt-5 max-w-[44ch] text-[15px] leading-8 text-white/78 sm:text-[17px] sm:leading-8">
              {t("deskIntro")}
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {[t("footerPickup"), t("footerLive"), t("statSecure")].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/15 bg-white/10 px-3 py-1.5 text-[11px] font-semibold tracking-[0.04em] text-white/80 backdrop-blur-sm sm:text-[12px]"
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button $variant="gold" className="w-full sm:w-auto" type="button" onClick={startSelling}>
                {t("startSelling")} <ArrowRight size={16} />
              </Button>
              <ButtonLink $variant="ghost" href="/present" className="w-full sm:w-auto">
                <Presentation size={16} /> {t("navPresent")}
              </ButtonLink>
            </div>
          </Reveal>
          <Reveal
            variant="right"
            delay={80}
            className="relative order-first min-h-[240px] overflow-hidden sm:min-h-[340px] lg:order-none lg:min-h-full"
          >
            <Image
              src="/images/kisan-hero.png"
              alt="Kisan in a wheat field at sunrise"
              fill
              priority
              className="hero-photo object-cover object-[center_18%]"
              sizes="(min-width: 1024px) 46vw, 100vw"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#081912]/80 via-transparent to-black/15 lg:bg-gradient-to-l lg:from-transparent lg:via-[#0f3d2e]/15 lg:to-[#081912]/75" />
            <div className="pointer-events-none absolute inset-3 rounded-[18px] border border-[#e8c96a]/28 sm:inset-4 sm:rounded-[22px]" />
            <div className="absolute right-6 bottom-6 left-6 z-[1] sm:right-8 sm:bottom-8 sm:left-auto">
              <p className="inline-flex max-w-full items-center rounded-full border border-white/20 bg-[#081912]/55 px-3.5 py-2 text-[11px] font-semibold tracking-[0.12em] text-gold-soft uppercase backdrop-blur-md sm:text-[12px]">
                {t("heroFromField")}
              </p>
            </div>
          </Reveal>
        </div>
      </Hero>

      <div className="w-full px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">
        {booking && (
          <Reveal>
            <Card className="anim-lift flex flex-col gap-4 p-4 sm:p-6 md:flex-row md:items-center md:justify-between">
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-[0.16em] text-gold uppercase">
                  {t("activeBooking")} · {booking.bookingId}
                </p>
                <p className="mt-1 text-[17px] font-bold break-words text-forest sm:text-[18px]">
                  {cropName} · {booking.qty} {unitLabel(booking.unit, t)}
                </p>
                <p className="text-[14px] text-sage">
                  {booking.day} {t("monthOct")} · {booking.time} · {t("est")}. {formatInr(booking.estimate)}
                </p>
              </div>
              <Button className="w-full shrink-0 md:w-auto" type="button" onClick={() => setStep("track")}>
                {t("trackMyCrop")}
              </Button>
            </Card>
          </Reveal>
        )}

        <Reveal>
          <h2 className="font-serif mt-8 text-[24px] text-forest sm:mt-10 sm:text-[28px] md:text-[34px]">{t("fourSteps")}</h2>
          <p className="mt-1 text-[14px] text-sage">{t("fourStepsSub")}</p>
        </Reveal>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((item, index) => (
            <Reveal key={item.n} delay={index * 90}>
              <button type="button" className="w-full text-left" onClick={item.go}>
                <Card className="anim-lift p-5 md:p-6">
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-mist text-canopy">
                    <item.icon size={20} />
                  </span>
                  <p className="mt-4 text-[12px] font-bold tracking-[0.14em] text-gold uppercase">
                    {t("step")} {item.n}
                  </p>
                  <h3 className="mt-1 text-[17px] font-bold text-ink">{item.title}</h3>
                  <p className="mt-1 text-[13px] text-sage">{item.copy}</p>
                </Card>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  );
}

function unitLabel(unit: string, t: (key: MsgKey) => string) {
  if (unit === "Kg") return t("unitKg");
  if (unit === "Ton") return t("unitTon");
  return t("unitQuintal");
}
