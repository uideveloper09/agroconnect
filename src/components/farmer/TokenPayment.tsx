"use client";

import { useState } from "react";
import { Button, Card } from "@/components/ui";
import { RoundLoader } from "@/components/RoundLoader";
import { formatInr, useSell, type PayMethod } from "@/lib/sell";
import { useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";
import { SellStepper } from "./SellStepper";
import { Reveal } from "@/components/Reveal";

export function TokenPayment() {
  const { tokenAmount, payMethod, setPayMethod, setStep, completePayment, crops, cropId, qty, unit } =
    useSell();
  const { t } = useI18n();
  const [loading, setLoading] = useState(false);
  const crop = crops.find((item) => item.id === cropId);
  const cropName = crop ? t(`crop_${crop.id}` as MsgKey) : "";
  const unitText =
    unit === "Kg" ? t("unitKg") : unit === "Ton" ? t("unitTon") : t("unitQuintal");

  const methods: { id: PayMethod; label: MsgKey }[] = [
    { id: "UPI", label: "payUpi" },
    { id: "Card", label: "payCard" },
    { id: "NetBanking", label: "payNet" },
  ];

  async function pay() {
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1100));
    setLoading(false);
    completePayment();
  }

  return (
    <div className="w-full px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">
      <Reveal>
        <SellStepper />
      </Reveal>
      <Reveal>
      <button
        type="button"
        className="mb-4 text-[13px] font-semibold text-sage hover:text-canopy"
        onClick={() => setStep("select")}
      >
        {t("backCrop")}
      </button>
      <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:items-start">
          <div className="min-w-0">
            <h1 className="font-serif text-[26px] text-forest sm:text-[32px]">{t("tokenPayment")}</h1>
            <p className="mt-1 text-[14px] text-sage">
              {t("tokenFor", { crop: cropName, qty, unit: unitText })}
            </p>

            <div className="mt-6 rounded-2xl bg-mist px-4 py-8 text-center sm:px-6 sm:py-10">
              <p className="font-serif text-[36px] text-forest sm:text-[42px] md:text-[52px]">{formatInr(tokenAmount)}</p>
              <p className="mt-2 text-[13px] text-sage">{t("tokenNote")}</p>
            </div>
          </div>
          <div>
            <p className="mb-3 text-[13px] font-semibold text-sage">{t("paymentMethod")}</p>
            <div className="space-y-2">
          {methods.map((method) => (
            <label
              key={method.id}
              className={`flex cursor-pointer items-center gap-3 rounded-xl border-[1.5px] px-4 py-3.5 ${
                payMethod === method.id ? "border-fresh bg-mist" : "border-line bg-white"
              }`}
            >
              <input
                type="radio"
                name="pay"
                checked={payMethod === method.id}
                onChange={() => setPayMethod(method.id)}
                className="accent-canopy"
              />
              <span className="min-w-0 text-[13px] font-semibold break-words text-ink sm:text-[14px]">{t(method.label)}</span>
            </label>
          ))}
            </div>

            <Button $block className="mt-6" type="button" disabled={loading} onClick={pay}>
              {loading && <RoundLoader size={22} onDark />}
              {loading ? t("processing") : t("payNow", { amount: formatInr(tokenAmount) })}
            </Button>
            <p className="mt-3 text-center text-[12px] text-sage">{t("dummyPayNote")}</p>
          </div>
        </div>
      </Card>
      </Reveal>
      {loading && <RoundLoader overlay size={104} label={t("processing")} />}
    </div>
  );
}
