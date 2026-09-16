"use client";

import Image from "next/image";
import { Button, Card, ErrorText, Field, InputShell } from "@/components/ui";
import { formatInr, useSell, type Unit } from "@/lib/sell";
import { isMsgKey, useI18n } from "@/lib/i18n";
import type { MsgKey } from "@/lib/messages";
import { SellStepper } from "./SellStepper";
import { Reveal } from "@/components/Reveal";

export function SelectCrop() {
  const { crops, cropId, qty, unit, error, setCropId, setQty, setUnit, goToPayment, goHome } =
    useSell();
  const { t } = useI18n();
  const selected = crops.find((crop) => crop.id === cropId);
  const amount = Number(qty);
  const estimate =
    selected && amount > 0
      ? formatInr(
          selected.rate *
            (unit === "Kg" ? amount / 100 : unit === "Ton" ? amount * 10 : amount),
        )
      : null;

  return (
    <div className="w-full px-4 py-6 sm:px-5 sm:py-8 md:px-8 lg:px-10">
      <Reveal>
        <SellStepper />
      </Reveal>
      <Reveal>
      <button
        type="button"
        className="mb-4 text-[13px] font-semibold text-sage hover:text-canopy"
        onClick={goHome}
      >
        {t("backDeskShort")}
      </button>
      <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
        <h1 className="font-serif text-[26px] text-forest sm:text-[32px]">{t("selectCrop")}</h1>
        <p className="mt-1 text-[14px] text-sage">{t("selectCropSub")}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {crops.map((crop) => {
            const active = crop.id === cropId;
            return (
              <button
                key={crop.id}
                type="button"
                onClick={() => setCropId(crop.id)}
                className={`anim-lift overflow-hidden rounded-2xl border-2 text-left transition ${
                  active
                    ? "border-fresh shadow-[0_10px_24px_-12px_rgba(76,175,109,0.55)]"
                    : "border-line hover:border-fresh/50"
                }`}
              >
                <span className="relative block h-20 sm:h-24">
                  <Image
                    src={crop.image}
                    alt={t(`crop_${crop.id}` as MsgKey)}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1280px) 20vw, (min-width: 1024px) 25vw, 40vw"
                  />
                </span>
                <span className="block px-2.5 py-2.5 sm:px-3 sm:py-3">
                  <span className="block text-[14px] font-bold text-ink sm:text-[15px]">
                    {t(`crop_${crop.id}` as MsgKey)}
                  </span>
                  <span className="mt-0.5 block text-[11px] leading-4 text-sage sm:text-[12px]">
                    {t(`hint_${crop.id}` as MsgKey)} · {formatInr(crop.rate)}
                    {t("perQtl")}
                  </span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Field>
            <span>{t("quantity")}</span>
            <InputShell $error={Boolean(error) && !amount}>
              <input
                type="number"
                min={1}
                value={qty}
                onChange={(e) => setQty(e.target.value)}
                placeholder="50"
              />
            </InputShell>
          </Field>
          <Field>
            <span>{t("unit")}</span>
            <InputShell>
              <select value={unit} onChange={(e) => setUnit(e.target.value as Unit)}>
                <option value="Kg">{t("unitKg")}</option>
                <option value="Quintal">{t("unitQuintal")}</option>
                <option value="Ton">{t("unitTon")}</option>
              </select>
            </InputShell>
          </Field>
        </div>

        {estimate && (
          <p className="mt-2 text-[14px] font-semibold text-canopy">
            {t("estimatedValue")} · {estimate}
          </p>
        )}
        {error && <ErrorText>{isMsgKey(error) ? t(error) : error}</ErrorText>}

        <Button $block className="mt-7 md:w-auto" type="button" onClick={goToPayment}>
          {t("continuePayment")}
        </Button>
      </Card>
      </Reveal>
    </div>
  );
}
