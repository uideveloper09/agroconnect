import type { Metadata } from "next";
import { PresentView } from "@/components/PresentView";

export const metadata: Metadata = {
  title: "Present PPT — Agro Connect",
  description: "Present the agroconnect.pptx Smart India Hackathon deck.",
};

export default function PresentPage() {
  return <PresentView />;
}
