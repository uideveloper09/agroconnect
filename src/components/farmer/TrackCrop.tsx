"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { ArrowLeft, Clock3, MapPin, Radio, Truck, Warehouse, Wheat } from "lucide-react";
import { Button } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { formatInr, useSell, type BookingStatus } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

const STAGE_IDS: BookingStatus[] = ["confirmed", "picked", "market", "sold"];

const pulse = keyframes`
  0% { box-shadow: 0 0 0 0 rgba(232, 201, 106, 0.55); }
  70% { box-shadow: 0 0 0 12px rgba(232, 201, 106, 0); }
  100% { box-shadow: 0 0 0 0 rgba(232, 201, 106, 0); }
`;

const Page = styled.div`
  margin-top: -8px;
`;

const Dispatch = styled.section`
  position: relative;
  overflow: hidden;
  color: #fff;
  background:
    radial-gradient(1200px 400px at 80% -10%, rgba(201, 162, 39, 0.22), transparent 55%),
    linear-gradient(165deg, #0c2f24 0%, #1b5e3f 55%, #14432e 100%);
  border-radius: 0;
  padding: 24px 16px 64px;
  width: 100%;

  @media (min-width: 640px) {
    padding: 28px 20px 72px;
  }

  @media (min-width: 768px) {
    padding: 40px 40px 80px;
  }

  @media (min-width: 1024px) {
    padding: 48px 40px 88px;
  }
`;

const LiveDot = styled.span`
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #e8c96a;
  animation: ${pulse} 1.8s ease-out infinite;
`;

const Track = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 0;
  margin-top: 28px;
  position: relative;

  @media (min-width: 640px) {
    margin-top: 36px;
  }

  &::before {
    content: "";
    position: absolute;
    left: 6%;
    right: 6%;
    top: 16px;
    height: 3px;
    background: rgba(255, 255, 255, 0.18);
    border-radius: 99px;

    @media (min-width: 640px) {
      left: 8%;
      right: 8%;
      top: 18px;
    }
  }
`;

const Node = styled.button<{ $done?: boolean; $active?: boolean }>`
  position: relative;
  z-index: 1;
  background: none;
  border: 0;
  color: inherit;
  cursor: default;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 0 2px;
  min-width: 0;

  @media (min-width: 640px) {
    gap: 10px;
    padding: 0 6px;
  }

  .dot {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    border: 2px solid
      ${(p) =>
        p.$active ? "#e8c96a" : p.$done ? "#7fd19b" : "rgba(255,255,255,0.25)"};
    background: ${(p) =>
      p.$active ? "#e8c96a" : p.$done ? "#3d9b5c" : "rgba(15, 61, 46, 0.85)"};
    color: ${(p) => (p.$active ? "#0f3d2e" : "#fff")};

    @media (min-width: 640px) {
      width: 38px;
      height: 38px;
    }
  }
`;

const Ticket = styled.article`
  display: grid;
  grid-template-columns: 1fr;
  margin: -48px 16px 20px;
  position: relative;
  z-index: 2;
  background: #fff8ee;
  color: #1a1812;
  border-radius: 6px 6px 22px 22px;
  box-shadow: 0 24px 50px -24px rgba(15, 61, 46, 0.55);
  overflow: hidden;
  width: calc(100% - 32px);
  min-width: 0;

  @media (min-width: 640px) {
    margin: -48px 20px 24px;
    width: calc(100% - 40px);
  }

  @media (min-width: 768px) {
    margin: -48px 32px 32px;
    width: calc(100% - 64px);
  }

  @media (min-width: 900px) {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 0.9fr);
  }

  @media (min-width: 1024px) {
    margin: -48px 40px 32px;
    width: calc(100% - 80px);
  }
`;

const Stub = styled.div`
  padding: 20px 16px 20px;
  min-width: 0;
  background:
    repeating-linear-gradient(
      -12deg,
      transparent,
      transparent 10px,
      rgba(201, 162, 39, 0.07) 10px,
      rgba(201, 162, 39, 0.07) 11px
    );
  border-left: none;

  @media (min-width: 640px) {
    padding: 28px 28px 24px;
  }

  @media (min-width: 900px) {
    border-left: 2px dashed rgba(20, 67, 46, 0.22);
  }
`;

const Stamp = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 14px;

  @media (min-width: 420px) {
    grid-template-columns: 1fr 1fr;
    gap: 18px 16px;
  }
`;

export function TrackCrop() {
  const { booking, goHome, startSelling, crops } = useSell();
  const { t } = useI18n();

  const stages: { id: BookingStatus; title: MsgKey; copy: MsgKey }[] = [
    { id: "confirmed", title: "stConfirmed", copy: "stConfirmedCopy" },
    { id: "picked", title: "stPicked", copy: "stPickedCopy" },
    { id: "market", title: "stMarket", copy: "stMarketCopy" },
    { id: "sold", title: "stSold", copy: "stSoldCopy" },
  ];

  if (!booking) {
    return (
      <div className="w-full px-4 py-12 text-center sm:px-5 sm:py-16 md:px-8 lg:px-10">
        <Reveal>
        <h1 className="font-serif text-[32px] text-forest">{t("noBooking")}</h1>
        <p className="mt-2 text-[14px] text-sage">{t("noBookingSub")}</p>
        <Button className="mt-6" type="button" onClick={startSelling}>
          {t("startSelling")}
        </Button>
        </Reveal>
      </div>
    );
  }

  const current = Math.max(0, STAGE_IDS.indexOf(booking.status));
  const next = stages[current + 1];
  const active = stages[current];
  const unitText =
    booking.unit === "Kg"
      ? t("unitKg")
      : booking.unit === "Ton"
        ? t("unitTon")
        : t("unitQuintal");
  const cropName = t(`crop_${booking.cropId}` as MsgKey);
  const crop = crops.find((item) => item.id === booking.cropId);

  return (
    <Page>
      <Dispatch>
        <Reveal>
        <div className="w-full">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-extrabold tracking-[0.18em]">
              <LiveDot />
              {t("liveBadge")}
              <Radio size={12} />
            </span>
            <span className="font-mono text-[12px] tracking-[0.14em] text-white/70">
              {booking.bookingId}
            </span>
          </div>

          <p className="mt-6 text-[12px] font-bold tracking-[0.22em] text-gold-soft uppercase">
            {t("onTheMove")} · {cropName}
          </p>
          <h1 className="font-serif mt-2 max-w-[16ch] text-[30px] leading-[1.08] sm:text-[40px] md:text-[56px]">
            {t(active.title)}
          </h1>
          <p className="mt-3 max-w-[42ch] text-[15px] text-white/75 sm:text-[16px]">{t(active.copy)}</p>

          <p className="mt-8 text-[11px] font-bold tracking-[0.2em] text-white/45 uppercase">
            {t("journeyMap")}
          </p>
          <Track>
            {stages.map((stage, index) => {
              const done = index < current;
              const isActive = index === current;
              const Icon =
                index === 0 ? Wheat : index === 1 ? Truck : index === 2 ? Warehouse : MapPin;
              return (
                <Node key={stage.id} $done={done} $active={isActive} type="button">
                  <span className="dot">
                    <Icon size={16} />
                  </span>
                  <span className="max-w-full text-center text-[9px] font-bold leading-tight tracking-normal uppercase sm:text-[11px] sm:tracking-[0.08em]">
                    {t(stage.title)}
                  </span>
                </Node>
              );
            })}
          </Track>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              { label: t("nowAt"), value: t(active.title), icon: MapPin },
              {
                label: t("nextStop"),
                value: next ? t(next.title) : t("stSold"),
                icon: Truck,
              },
              { label: t("etaLabel"), value: etaFor(booking.status, booking.time, t), icon: Clock3 },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl border border-white/15 bg-white/10 px-4 py-4 backdrop-blur-sm"
              >
                <p className="flex items-center gap-2 text-[11px] tracking-[0.16em] text-white/55 uppercase">
                  <item.icon size={13} /> {item.label}
                </p>
                <p className="mt-1 text-[16px] font-semibold break-words sm:text-[18px]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
        </Reveal>
      </Dispatch>

      <Reveal>
      <Ticket>
        <div className="p-5 sm:p-7 md:p-9">
          <p className="text-[11px] font-extrabold tracking-[0.22em] text-gold uppercase">
            {t("boardingPass")}
          </p>
          <h2 className="font-serif mt-2 text-[26px] text-forest sm:text-[32px]">{cropName}</h2>
          <p className="text-[14px] text-sage sm:text-[15px]">
            {booking.qty} {unitText} · {booking.day} {t("monthOct")} · {booking.time}
          </p>

          <div className="mt-6 grid grid-cols-3 gap-1.5 sm:gap-2">
            {[
              {
                src:
                  crop?.image ??
                  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?auto=format&fit=crop&w=800&q=80",
                cap: t("farm"),
              },
              {
                src: "https://images.unsplash.com/photo-1595278062448-0ae2140e2063?auto=format&fit=crop&w=800&q=80",
                cap: t("transport"),
              },
              {
                src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80",
                cap: t("mandi"),
              },
            ].map((shot) => (
              <figure key={shot.cap} className="relative h-20 overflow-hidden rounded-lg sm:h-28 sm:rounded-xl md:h-36">
                <Image src={shot.src} alt={shot.cap} fill className="object-cover" sizes="(min-width: 900px) 22vw, 33vw" />
                <figcaption className="absolute inset-x-0 bottom-0 bg-black/45 px-1.5 py-1 text-[9px] font-bold tracking-[0.08em] text-white uppercase sm:px-2 sm:text-[10px] sm:tracking-[0.12em]">
                  {shot.cap}
                </figcaption>
              </figure>
            ))}
          </div>

          <Button $block className="mt-7 sm:w-auto" $variant="outline" type="button" onClick={goHome}>
            <ArrowLeft size={16} /> {t("backDesk")}
          </Button>
        </div>

        <Stub>
          <p className="text-[11px] font-extrabold tracking-[0.2em] text-sage uppercase">
            {t("bookingSummary")}
          </p>
          <Stamp className="mt-5">
            <div>
              <p className="text-[11px] text-sage">{t("labelId")}</p>
              <p className="font-mono text-[12px] font-bold break-all sm:text-[13px]">{booking.bookingId}</p>
            </div>
            <div>
              <p className="text-[11px] text-sage">{t("labelToken")}</p>
              <p className="text-[18px] font-extrabold text-forest">{formatInr(booking.token)}</p>
            </div>
            <div>
              <p className="text-[11px] text-sage">{t("labelPayout")}</p>
              <p className="text-[18px] font-extrabold text-forest">
                {formatInr(booking.estimate)}
              </p>
            </div>
            <div>
              <p className="text-[11px] text-sage">{t("labelSlot")}</p>
              <p className="text-[14px] font-bold">
                {booking.day} {t("monthOct")}
                <br />
                {booking.time}
              </p>
            </div>
          </Stamp>
        </Stub>
      </Ticket>
      </Reveal>
    </Page>
  );
}

function etaFor(status: BookingStatus, slot: string, t: (key: MsgKey) => string) {
  if (status === "confirmed") return slot;
  if (status === "picked") return t("etaTransit");
  if (status === "market") return t("etaYard");
  return t("etaDone");
}
