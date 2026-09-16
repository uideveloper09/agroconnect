import type { Metadata } from "next";
import { PresentView } from "@/components/PresentView";

export const metadata: Metadata = {
  title: "Present PPT — Agro Connect",
  description: "Present the Agro Connect pitch deck in fullscreen.",
};

export default function PresentPage() {
  return <PresentView />;
}
