"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import catalog from "@/data/crops.json";
import { useAuth } from "@/lib/auth";

export type Unit = "Kg" | "Quintal" | "Ton";
export type PayMethod = "UPI" | "Card" | "NetBanking";
export type SellStep =
  | "home"
  | "select"
  | "payment"
  | "slot"
  | "confirm"
  | "track";
export type BookingStatus = "confirmed" | "picked" | "market" | "sold";

export type Crop = {
  id: string;
  name: string;
  hint: string;
  rate: number;
  image: string;
};

export type Booking = {
  bookingId: string;
  cropId: string;
  cropName: string;
  qty: number;
  unit: Unit;
  rate: number;
  estimate: number;
  token: number;
  payMethod: PayMethod;
  dateLabel: string;
  day: number;
  time: string;
  status: BookingStatus;
};

type SellContextValue = {
  step: SellStep;
  crops: Crop[];
  tokenAmount: number;
  cropId: string | null;
  qty: string;
  unit: Unit;
  payMethod: PayMethod;
  day: number | null;
  time: string | null;
  booking: Booking | null;
  error: string;
  setStep: (step: SellStep) => void;
  setCropId: (id: string) => void;
  setQty: (qty: string) => void;
  setUnit: (unit: Unit) => void;
  setPayMethod: (method: PayMethod) => void;
  setDay: (day: number) => void;
  setTime: (time: string) => void;
  goToPayment: () => boolean;
  completePayment: () => void;
  confirmBooking: () => boolean;
  startSelling: () => void;
  goHome: () => void;
};

const SellContext = createContext<SellContextValue | null>(null);
const CROPS = catalog.crops as Crop[];
const TOKEN = catalog.tokenAmount;

export const MONTH_LABEL = "October 2026";
export const BOOKED_DAYS = [4, 11, 18, 25];
export const TIME_SLOTS = [
  "09:00 AM",
  "10:00 AM",
  "11:00 AM",
  "01:00 PM",
  "02:00 PM",
  "03:00 PM",
];
export const DISABLED_SLOTS = ["11:00 AM", "02:00 PM"];

export function estimatePayout(rate: number, qty: number, unit: Unit) {
  const quintals = unit === "Kg" ? qty / 100 : unit === "Ton" ? qty * 10 : qty;
  return Math.round(rate * quintals);
}

export function formatInr(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value);
}

function storageKey(userId: string) {
  return `agro-connect-sale-${userId}`;
}

const SELL_STEPS: SellStep[] = ["home", "select", "payment", "slot", "confirm", "track"];
const STATUS_ORDER: BookingStatus[] = ["confirmed", "picked", "market", "sold"];

type SavedSale = {
  booking?: Booking | null;
  draft?: {
    step?: SellStep;
    cropId?: string | null;
    qty?: string;
    unit?: Unit;
    payMethod?: PayMethod;
    day?: number | null;
    time?: string | null;
  };
};

function isSellStep(value: unknown): value is SellStep {
  return typeof value === "string" && SELL_STEPS.includes(value as SellStep);
}

export function SellProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [step, setStep] = useState<SellStep>("home");
  const [cropId, setCropId] = useState<string | null>(null);
  const [qty, setQty] = useState("");
  const [unit, setUnit] = useState<Unit>("Quintal");
  const [payMethod, setPayMethod] = useState<PayMethod>("UPI");
  const [day, setDay] = useState<number | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [error, setError] = useState("");
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    if (!user) return;
    try {
      const raw = localStorage.getItem(storageKey(user.id));
      if (raw) {
        const saved = JSON.parse(raw) as SavedSale;
        if (saved.booking) setBooking(saved.booking);
        const draft = saved.draft;
        if (draft) {
          if (draft.cropId) setCropId(draft.cropId);
          if (typeof draft.qty === "string") setQty(draft.qty);
          if (draft.unit === "Kg" || draft.unit === "Quintal" || draft.unit === "Ton") {
            setUnit(draft.unit);
          }
          if (draft.payMethod === "UPI" || draft.payMethod === "Card" || draft.payMethod === "NetBanking") {
            setPayMethod(draft.payMethod);
          }
          if (typeof draft.day === "number") setDay(draft.day);
          if (typeof draft.time === "string") setTime(draft.time);
          if (isSellStep(draft.step)) {
            if ((draft.step === "payment" || draft.step === "slot") && !draft.cropId) {
              setStep("select");
            } else if (draft.step === "track" && !saved.booking) {
              setStep("select");
            } else if (draft.step === "confirm" && !saved.booking) {
              setStep(draft.cropId ? "slot" : "select");
            } else {
              setStep(draft.step);
            }
          }
        }
      }
    } catch {
      localStorage.removeItem(storageKey(user.id));
    }
    setHydrated(true);
  }, [user]);

  useEffect(() => {
    if (!user || !hydrated) return;
    localStorage.setItem(
      storageKey(user.id),
      JSON.stringify({
        booking,
        draft: { step, cropId, qty, unit, payMethod, day, time },
      }),
    );
  }, [booking, step, cropId, qty, unit, payMethod, day, time, user, hydrated]);

  useEffect(() => {
    if (!hydrated || !booking || booking.status === "sold") return;
    const timer = window.setInterval(() => {
      setBooking((prev) => {
        if (!prev) return prev;
        const index = STATUS_ORDER.indexOf(prev.status);
        if (index < 0 || index >= STATUS_ORDER.length - 1) return prev;
        return { ...prev, status: STATUS_ORDER[index + 1] };
      });
    }, 5000);
    return () => window.clearInterval(timer);
  }, [hydrated, booking?.bookingId, booking?.status]);

  const startSelling = useCallback(() => {
    setError("");
    setCropId(null);
    setQty("");
    setUnit("Quintal");
    setPayMethod("UPI");
    setDay(null);
    setTime(null);
    setStep("select");
  }, []);

  const goHome = useCallback(() => setStep("home"), []);

  const goToPayment = useCallback(() => {
    const amount = Number(qty);
    if (!cropId || !amount || amount <= 0) {
      setError("errCropQty");
      return false;
    }
    setError("");
    setStep("payment");
    return true;
  }, [cropId, qty]);

  const completePayment = useCallback(() => {
    setError("");
    setStep("slot");
  }, []);

  const confirmBooking = useCallback(() => {
    const crop = CROPS.find((item) => item.id === cropId);
    const amount = Number(qty);
    if (!crop || !amount || !day || !time) {
      setError("errDateTime");
      return false;
    }
    const next: Booking = {
      bookingId: `AC-2026-${String(Math.floor(10000 + Math.random() * 90000))}`,
      cropId: crop.id,
      cropName: crop.name,
      qty: amount,
      unit,
      rate: crop.rate,
      estimate: estimatePayout(crop.rate, amount, unit),
      token: TOKEN,
      payMethod,
      dateLabel: `${day} ${MONTH_LABEL}`,
      day,
      time,
      status: "confirmed",
    };
    setBooking(next);
    setError("");
    setStep("confirm");
    return true;
  }, [cropId, qty, unit, payMethod, day, time]);

  const value = useMemo(
    () => ({
      step,
      crops: CROPS,
      tokenAmount: TOKEN,
      cropId,
      qty,
      unit,
      payMethod,
      day,
      time,
      booking,
      error,
      setStep,
      setCropId: (id: string) => {
        setError("");
        setCropId(id);
      },
      setQty: (next: string) => {
        setError("");
        setQty(next);
      },
      setUnit,
      setPayMethod,
      setDay: (next: number) => {
        setError("");
        setDay(next);
      },
      setTime: (next: string) => {
        setError("");
        setTime(next);
      },
      goToPayment,
      completePayment,
      confirmBooking,
      startSelling,
      goHome,
    }),
    [
      step,
      cropId,
      qty,
      unit,
      payMethod,
      day,
      time,
      booking,
      error,
      goToPayment,
      completePayment,
      confirmBooking,
      startSelling,
      goHome,
    ],
  );

  return <SellContext.Provider value={value}>{children}</SellContext.Provider>;
}

export function useSell() {
  const ctx = useContext(SellContext);
  if (!ctx) throw new Error("useSell must be used within SellProvider");
  return ctx;
}
