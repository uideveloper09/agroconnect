import type { Metadata } from "next";
import { LegalDoc } from "@/components/LegalDoc";

export const metadata: Metadata = {
  title: "Terms — Agro Connect",
  description: "Demo terms for the Agro Connect crop-selling journey.",
};

export default function TermsPage() {
  return <LegalDoc kind="terms" />;
}
