"use client";

import { useSell, type SellStep } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";

const ITEMS: { step: SellStep; n: string; label: MsgKey }[] = [
  { step: "select", n: "01", label: "stCrop" },
  { step: "payment", n: "02", label: "stToken" },
  { step: "slot", n: "03", label: "stSlot" },
  { step: "confirm", n: "04", label: "stConfirm" },
  { step: "track", n: "05", label: "stTrack" },
];

const ORDER: SellStep[] = ITEMS.map((item) => item.step);

export function SellStepper() {
  const { step, setStep, booking } = useSell();
  const { t } = useI18n();
  const current = ORDER.indexOf(step);

  return (
    <ol className="mb-6 flex w-full min-w-0 items-center gap-1 overflow-x-auto pb-1 sm:mb-8 sm:gap-2">
      {ITEMS.map((item, index) => {
        const done = current > index;
        const active = current === index;
        const last = index === ITEMS.length - 1;
        const canJump =
          done || (item.step === "confirm" && Boolean(booking)) || (item.step === "track" && Boolean(booking));
        return (
          <li key={item.step} className={`flex min-w-0 items-center gap-1 sm:gap-2 ${last ? "shrink-0" : "flex-1"}`}>
            <button
              type="button"
              disabled={!canJump}
              onClick={() => canJump && setStep(item.step)}
              className={`flex min-w-0 items-center gap-1.5 sm:gap-2 ${canJump ? "cursor-pointer" : "cursor-default"}`}
            >
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-[11px] font-extrabold ${
                  done
                    ? "bg-canopy text-white"
                    : active
                      ? "border-2 border-canopy text-canopy"
                      : "border border-line text-sage"
                }`}
              >
                {done ? "✓" : index + 1}
              </span>
              <span
                className={`hidden shrink-0 text-[12px] font-bold tracking-[0.12em] uppercase md:inline ${
                  done || active ? "text-forest" : "text-sage"
                }`}
              >
                {t(item.label)}
              </span>
            </button>
            {!last && (
              <span className={`mx-0.5 h-px min-w-3 flex-1 sm:mx-1 sm:min-w-6 ${done ? "bg-canopy" : "bg-line"}`} />
            )}
          </li>
        );
      })}
    </ol>
  );
}
