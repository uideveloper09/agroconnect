import type { Metadata } from "next";
import { AuthGate } from "@/components/AuthGate";
import { FarmerApp } from "@/components/farmer/FarmerApp";

export const metadata: Metadata = {
  title: "Farmer desk — Agro Connect",
  description: "Select your crop and sell from field to mandi on Agro Connect.",
};

export default function HomePage() {
  return (
    <AuthGate>
      <FarmerApp />
    </AuthGate>
  );
}
