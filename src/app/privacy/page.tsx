import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Privacy — Agro Connect",
  description: "How Agro Connect stores farmer login and booking details in this demo.",
};

export default function PrivacyPage() {
  return <LegalDoc kind="privacy" />;
}
