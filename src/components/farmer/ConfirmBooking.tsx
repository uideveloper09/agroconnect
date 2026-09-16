"use client";

import { Check } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { Reveal } from "@/components/Reveal";
import { formatInr, useSell } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

export function ConfirmBooking() {
  const { booking, setStep, goHome } = useSell();
  const { t } = useI18n();
  if (!booking) return null;

  const unitText =
    booking.unit === "Kg"
      ? t("unitKg")
      : booking.unit === "Ton"
        ? t("unitTon")
        : t("unitQuintal");

  const rows = [
    [t("labelCrop"), t(`crop_${booking.cropId}` as MsgKey)],
    [t("labelQty"), `${booking.qty} ${unitText}`],
    [t("labelDate"), `${booking.day} ${t("monthOct")}`],
    [t("labelTime"), booking.time],
    [t("labelToken"), formatInr(booking.token)],
    [t("labelPayout"), formatInr(booking.estimate)],
    [t("labelId"), booking.bookingId],
  ];

  return (
    <div className="w-full px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">
      <Reveal>
      <Card className="p-5 sm:p-8 md:p-10 lg:p-12">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.2fr] lg:items-start lg:gap-10">
          <div className="text-center lg:text-left">
            <div className="mx-auto grid h-[76px] w-[76px] place-items-center rounded-full border-2 border-fresh bg-mist text-canopy lg:mx-0">
              <Check size={34} />
            </div>
            <h1 className="font-serif mt-4 text-[26px] text-forest sm:text-[32px]">{t("bookingConfirmed")}</h1>
            <p className="mt-1 text-[14px] text-sage">{t("slotReserved")}</p>
          </div>
          <div className="min-w-0">
            <dl className="text-left">
              {rows.map(([label, value]) => (
                <div
                  key={label}
                  className="flex flex-col gap-1 border-b border-line py-3 text-[14px] sm:flex-row sm:items-baseline sm:justify-between sm:gap-4"
                >
                  <dt className="shrink-0 text-sage">{label}</dt>
                  <dd className="font-bold break-words text-ink sm:text-right">{value}</dd>
                </div>
              ))}
            </dl>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button className="w-full flex-1" type="button" onClick={() => setStep("track")}>
                {t("trackMyCrop")}
              </Button>
              <Button $variant="outline" className="w-full flex-1" type="button" onClick={goHome}>
                {t("farmerDesk")}
              </Button>
            </div>
          </div>
        </div>
      </Card>
      </Reveal>
    </div>
  );
}
