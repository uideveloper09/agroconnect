import type { Lang } from "@/lib/messages";

export type DeckSlide = {
  kicker: string;
  title: string;
  body?: string;
  points?: string[];
  stats?: { value: string; label: string }[];
  kind: "title" | "bullets" | "stats" | "close";
};

const en: DeckSlide[] = [
  {
    kind: "title",
    kicker: "Agro Connect",
    title: "Kisan se Bazaar tak",
    body: "A simple path from the field to the mandi — better price, farm pickup, live track.",
  },
  {
    kind: "bullets",
    kicker: "The problem",
    title: "Selling crop is still hard work.",
    points: [
      "Too many middle steps between the farm and the market.",
      "Slot, pickup, and payment are not clear in one place.",
      "Farmers cannot see where the crop is after it leaves the field.",
    ],
  },
  {
    kind: "stats",
    kicker: "The promise",
    title: "One desk. Full selling journey.",
    stats: [
      { value: "50K+", label: "Happy farmers" },
      { value: "100+", label: "Market partners" },
      { value: "₹500", label: "Token to reserve a slot" },
    ],
  },
  {
    kind: "bullets",
    kicker: "Login",
    title: "Start with a dummy farmer account.",
    points: [
      "Password or 6-digit OTP — paste fills every box.",
      "Demo users live in users.json. Remember me keeps the desk open.",
      "English and Hindi stay on the language you pick.",
    ],
  },
  {
    kind: "bullets",
    kicker: "Four steps",
    title: "Select · Token · Slot · Track",
    points: [
      "Choose crop and quantity on the farmer desk.",
      "Pay a ₹500 token — dummy, no real charge.",
      "Book a pickup date and time in October 2026.",
      "Confirm, then watch the crop move farm → transport → mandi.",
    ],
  },
  {
    kind: "bullets",
    kicker: "Live track",
    title: "The crop pass stays with the farmer.",
    points: [
      "Status walks: confirmed, picked up, at market, sold.",
      "Boarding-pass view with farm, transport, and mandi photos.",
      "Helpline 1800-202-KISAN, 6 AM to 10 PM every day.",
    ],
  },
  {
    kind: "close",
    kicker: "Thank you",
    title: "From farmer to market.",
    body: "Open the desk, start selling, and present this deck anytime from Present PPT.",
  },
];

const hn: DeckSlide[] = [
  {
    kind: "title",
    kicker: "एग्रो कनेक्ट",
    title: "किसान से बाज़ार तक",
    body: "खेत से मंडी तक एक सीधा रास्ता — बेहतर दाम, खेत से पिकअप, लाइव ट्रैक।",
  },
  {
    kind: "bullets",
    kicker: "समस्या",
    title: "फसल बेचना अभी भी मुश्किल है।",
    points: [
      "खेत और बाज़ार के बीच बहुत से बिचौलिए।",
      "स्लॉट, पिकअप और भुगतान एक जगह साफ़ नहीं।",
      "फसल खेत छोड़ने के बाद किसान को रास्ता नहीं दिखता।",
    ],
  },
  {
    kind: "stats",
    kicker: "वादा",
    title: "एक डेस्क। पूरी बेचने की यात्रा।",
    stats: [
      { value: "50 हज़ार+", label: "खुश किसान" },
      { value: "100+", label: "मंडी साझेदार" },
      { value: "₹500", label: "स्लॉट का टोकन" },
    ],
  },
  {
    kind: "bullets",
    kicker: "लॉगिन",
    title: "डमी किसान खाते से शुरू करें।",
    points: [
      "पासवर्ड या 6 अंकों का ओटीपी — पेस्ट से सारे बॉक्स भर जाते हैं।",
      "डेमो यूज़र users.json में हैं। Remember me डेस्क खुला रखता है।",
      "अंग्रेज़ी और हिंदी उसी भाषा में खुलती है जो आप चुनें।",
    ],
  },
  {
    kind: "bullets",
    kicker: "चार कदम",
    title: "चुनें · टोकन · स्लॉट · ट्रैक",
    points: [
      "किसान डेस्क पर फसल और मात्रा चुनें।",
      "₹500 टोकन दें — डमी, कोई असली चार्ज नहीं।",
      "अक्टूबर 2026 में पिकअप की तारीख और समय बुक करें।",
      "पक्की करें, फिर खेत → परिवहन → मंडी लाइव देखें।",
    ],
  },
  {
    kind: "bullets",
    kicker: "लाइव ट्रैक",
    title: "फसल पास किसान के साथ रहता है।",
    points: [
      "स्थिति चलती है: पक्की, उठी, मंडी में, बिक गई।",
      "बोर्डिंग पास पर खेत, ट्रक और मंडी की तस्वीरें।",
      "हेल्पलाइन 1800-202-KISAN, सुबह 6 से रात 10।",
    ],
  },
  {
    kind: "close",
    kicker: "धन्यवाद",
    title: "किसान से बाज़ार तक।",
    body: "डेस्क खोलें, बेचना शुरू करें, और Present PPT से यह डेक कभी भी दिखाएँ।",
  },
];

export const decks: Record<Lang, DeckSlide[]> = { en, hn };
