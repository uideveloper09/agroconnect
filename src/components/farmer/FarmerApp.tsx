"use client";

import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SellProvider, useSell } from "@/lib/sell";
import { Dashboard } from "./Dashboard";
import { SelectCrop } from "./SelectCrop";
import { TokenPayment } from "./TokenPayment";
import { BookSlot } from "./BookSlot";
import { ConfirmBooking } from "./ConfirmBooking";
import { TrackCrop } from "./TrackCrop";

function SellStage() {
  const { step } = useSell();
  if (step === "select") return <SelectCrop />;
  if (step === "payment") return <TokenPayment />;
  if (step === "slot") return <BookSlot />;
  if (step === "confirm") return <ConfirmBooking />;
  if (step === "track") return <TrackCrop />;
  return <Dashboard />;
}

export function FarmerApp() {
  return (
    <SellProvider>
      <div className="min-h-dvh w-full bg-mist">
        <Header />
        <main className="w-full pt-[calc(4rem+env(safe-area-inset-top))] pb-0 md:pt-[calc(76px+env(safe-area-inset-top))]">
          <SellStage />
        </main>
        <Footer />
      </div>
    </SellProvider>
  );
}
