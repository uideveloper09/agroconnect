"use client";

import { Button, Card, ErrorText } from "@/components/ui";
import {
  BOOKED_DAYS,
  DISABLED_SLOTS,
  TIME_SLOTS,
  useSell,
} from "@/lib/sell";
import { isMsgKey, useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";
import { SellStepper } from "./SellStepper";
import { Reveal } from "@/components/Reveal";

const DAYS_IN_MONTH = 31;
const START_OFFSET = 4;
const DOW: MsgKey[] = ["dow0", "dow1", "dow2", "dow3", "dow4", "dow5", "dow6"];

export function BookSlot() {
  const { day, time, setDay, setTime, error, confirmBooking, setStep } = useSell();
  const { t } = useI18n();

  const cells: Array<number | null> = [
    ...Array.from({ length: START_OFFSET }, () => null),
    ...Array.from({ length: DAYS_IN_MONTH }, (_, i) => i + 1),
  ];

  return (
    <div className="w-full px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">
      <Reveal>
        <SellStepper />
      </Reveal>
      <Reveal>
      <button
        type="button"
        className="mb-4 text-[13px] font-semibold text-sage hover:text-canopy"
        onClick={() => setStep("payment")}
      >
        {t("backPay")}
      </button>
      <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="font-serif text-[26px] text-forest sm:text-[32px]">{t("bookSlot")}</h1>
        <p className="mt-1 text-[14px] text-sage">{t("bookSlotSub")}</p>

        <div className="mt-6 grid gap-8 lg:grid-cols-2 lg:items-start">
          <div>
            <div className="flex items-center justify-between">
              <span className="text-[15px] font-extrabold text-forest">{t("monthOct")}</span>
            </div>
            <div className="mt-3 grid grid-cols-7 gap-1 sm:gap-1.5">
              {DOW.map((d, i) => (
                <span
                  key={`${d}-${i}`}
                  className="py-1 text-center text-[10px] font-bold text-sage sm:text-[11px]"
                >
                  {t(d)}
                </span>
              ))}
              {cells.map((value, i) => {
                if (value === null) return <span key={`e-${i}`} />;
                const booked = BOOKED_DAYS.includes(value);
                const selected = day === value;
                return (
                  <button
                    key={value}
                    type="button"
                    disabled={booked}
                    onClick={() => setDay(value)}
                    className={`min-h-10 rounded-lg text-[12px] font-semibold sm:aspect-square sm:rounded-xl sm:text-[13px] ${
                      selected
                        ? "bg-canopy text-white"
                        : booked
                          ? "cursor-not-allowed text-[#c9d6cd]"
                          : "hover:bg-mist"
                    }`}
                  >
                    {value}
                  </button>
                );
              })}
            </div>
          </div>

          <div>
            <p className="mb-3 text-[13px] font-semibold text-sage">{t("timeSlots")}</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {TIME_SLOTS.map((slot) => {
                const disabled = DISABLED_SLOTS.includes(slot);
                const selected = time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    disabled={disabled}
                    onClick={() => setTime(slot)}
                    className={`rounded-xl border-[1.5px] py-3 text-[13px] font-bold ${
                      selected
                        ? "border-canopy bg-canopy text-white"
                        : disabled
                          ? "cursor-not-allowed border-line bg-mist text-[#b9c7be] line-through"
                          : "border-line bg-white hover:border-fresh"
                    }`}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            {error && <ErrorText>{isMsgKey(error) ? t(error) : error}</ErrorText>}
            <Button $block className="mt-6 md:w-auto" type="button" onClick={confirmBooking}>
              {t("confirmBookingBtn")}
            </Button>
          </div>
        </div>
      </Card>
      </Reveal>
    </div>
  );
}
